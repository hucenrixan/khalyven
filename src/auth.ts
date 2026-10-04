import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { timingSafeEqual } from "crypto";

const safeEqual = (a: string, b: string) => {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
};

// Single admin account, configured with ADMIN_EMAIL / ADMIN_PASSWORD.
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login" },
  trustHost: true,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (c) => {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        if (!email || !password) return null;
        const okEmail = safeEqual(String(c?.email ?? "").trim().toLowerCase(), email.toLowerCase());
        const okPass = safeEqual(String(c?.password ?? ""), password);
        return okEmail && okPass ? { id: "admin", email, name: "Admin" } : null;
      },
    }),
  ],
});
