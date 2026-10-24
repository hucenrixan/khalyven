import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { timingSafeEqual } from "crypto";
import { connectDB } from "@/lib/mongodb";
import { verifyPassword } from "@/lib/password";
import { allow } from "@/lib/rateLimit";
import { AdminUser } from "@/models/Content";

const safeEqual = (a: string, b: string) => {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
};

export type Role = "admin" | "editor";

// The ADMIN_EMAIL / ADMIN_PASSWORD account is the owner (always role "admin");
// extra users with roles are stored in the AdminUser collection.
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login" },
  trustHost: true,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (c) => {
        const email = String(c?.email ?? "").trim().toLowerCase();
        const password = String(c?.password ?? "");
        if (!email || !password) return null;
        // 8 attempts per 15 minutes per email.
        if (!(await allow(`login:${email}`, 8, 15 * 60))) return null;

        const envEmail = process.env.ADMIN_EMAIL;
        const envPass = process.env.ADMIN_PASSWORD;
        if (envEmail && envPass && safeEqual(email, envEmail.toLowerCase()) && safeEqual(password, envPass)) {
          return { id: "admin", email: envEmail, name: "Owner", role: "admin" as Role };
        }

        try {
          await connectDB();
          const u = await AdminUser.findOne({ email, active: true }).lean();
          if (u && verifyPassword(password, u.passwordHash)) {
            return { id: String(u._id), email: u.email, name: u.name || u.email, role: u.role as Role };
          }
        } catch {
          // database unavailable: only the env account can sign in
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: Role }).role ?? "editor";
      return token;
    },
    session({ session, token }) {
      (session.user as { role?: Role }).role = (token.role as Role) ?? "editor";
      return session;
    },
  },
});

export async function getRole(): Promise<Role | null> {
  const s = await auth();
  if (!s) return null;
  return ((s.user as { role?: Role }).role ?? "editor") as Role;
}
