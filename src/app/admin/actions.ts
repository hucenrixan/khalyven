"use server";

import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { DivisionContent, Settings } from "@/models/SiteContent";
import { DIVISIONS } from "@/lib/content";

export type FormState = { ok?: boolean; error?: string } | undefined;

async function requireAdmin() {
  if (!(await auth())) throw new Error("Unauthorized");
}

const text = (fd: FormData, k: string, max = 4000) => String(fd.get(k) ?? "").trim().slice(0, max);

// An image must be one of our own /photos files or a Cloudinary URL.
const imageUrl = (fd: FormData, k: string) => {
  const v = text(fd, k, 600);
  return v.startsWith("/photos/") || v.startsWith("https://res.cloudinary.com/") ? v : "";
};

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  try {
    await signIn("credentials", {
      email: text(fd, "email", 200),
      password: String(fd.get("password") ?? ""),
      redirectTo: "/admin",
    });
  } catch (e) {
    if (e instanceof AuthError) return { error: "Incorrect email or password." };
    throw e; // the redirect on success is thrown by signIn
  }
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function saveDivision(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const slug = text(fd, "slug", 40);
  if (!DIVISIONS.some((d) => d.slug === slug)) return { error: "Unknown division." };

  const title = text(fd, "title", 160);
  if (!title) return { error: "Title is required." };
  const items = text(fd, "items")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 20);

  await connectDB();
  await DivisionContent.findOneAndUpdate(
    { slug },
    {
      slug,
      title,
      summary: text(fd, "summary", 500),
      detail: text(fd, "detail", 1500),
      items,
      image: imageUrl(fd, "image"),
    },
    { upsert: true }
  );
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function saveSettings(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  await connectDB();
  await Settings.findOneAndUpdate(
    { key: "site" },
    {
      key: "site",
      contact: {
        email: text(fd, "email", 160),
        phone: text(fd, "phone", 60),
        maldives: text(fd, "maldives", 200),
        malaysia: text(fd, "malaysia", 200),
      },
      photos: {
        hero: imageUrl(fd, "hero"),
        source: imageUrl(fd, "source"),
        malaysia: imageUrl(fd, "malaysia"),
      },
    },
    { upsert: true }
  );
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function setInquiryStatus(fd: FormData) {
  await requireAdmin();
  const status = text(fd, "status", 20);
  if (!["new", "contacted", "closed"].includes(status)) return;
  await connectDB();
  await Inquiry.findByIdAndUpdate(text(fd, "id", 40), { status });
  revalidatePath("/admin", "layout");
}

export async function deleteInquiry(fd: FormData) {
  await requireAdmin();
  await connectDB();
  await Inquiry.findByIdAndDelete(text(fd, "id", 40));
  revalidatePath("/admin", "layout");
}
