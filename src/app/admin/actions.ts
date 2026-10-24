"use server";

import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { auth, getRole, signIn, signOut } from "@/auth";
import { hashPassword } from "@/lib/password";
import { AdminUser, GalleryItem, NavItem, Post, Testimonial } from "@/models/Content";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { DivisionContent, Settings } from "@/models/SiteContent";
import { DIVISIONS, NAV } from "@/lib/content";

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

async function requireOwner() {
  if ((await getRole()) !== "admin") throw new Error("Forbidden");
}

const num = (fd: FormData, k: string) => Math.trunc(Number(fd.get(k))) || 0;
const flag = (fd: FormData, k: string) => fd.get(k) === "on";
const id = (fd: FormData, k = "id") => text(fd, k, 40).replace(/[^a-f0-9]/gi, "");
const slugify = (v: string) =>
  v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
// Internal paths or absolute http(s) links only (blocks javascript: etc).
const link = (v: string) => (/^(\/|https?:\/\/|mailto:|tel:|#)/.test(v) ? v.slice(0, 300) : "");

/* ---------- Inquiries ---------- */

export async function saveInquiryNotes(fd: FormData) {
  await requireAdmin();
  await connectDB();
  await Inquiry.findByIdAndUpdate(id(fd), { notes: text(fd, "notes", 3000) });
  revalidatePath("/admin", "layout");
}

/* ---------- Testimonials ---------- */

export async function saveTestimonial(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const data = {
    quote: text(fd, "quote", 1200),
    author: text(fd, "author", 120),
    role: text(fd, "role", 120),
    company: text(fd, "company", 160),
    order: num(fd, "order"),
    published: flag(fd, "published"),
  };
  if (!data.quote || !data.author) return { error: "Quote and author are required." };
  await connectDB();
  const _id = id(fd);
  if (_id) await Testimonial.findByIdAndUpdate(_id, data);
  else await Testimonial.create(data);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteTestimonial(fd: FormData) {
  await requireAdmin();
  await connectDB();
  await Testimonial.findByIdAndDelete(id(fd));
  revalidatePath("/", "layout");
}

/* ---------- Gallery ---------- */

export async function saveGalleryItem(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const data = {
    image: imageUrl(fd, "image"),
    caption: text(fd, "caption", 200),
    category: text(fd, "category", 60),
    order: num(fd, "order"),
    published: flag(fd, "published"),
  };
  if (!data.image) return { error: "Please upload a photo." };
  await connectDB();
  const _id = id(fd);
  if (_id) await GalleryItem.findByIdAndUpdate(_id, data);
  else await GalleryItem.create(data);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteGalleryItem(fd: FormData) {
  await requireAdmin();
  await connectDB();
  await GalleryItem.findByIdAndDelete(id(fd));
  revalidatePath("/", "layout");
}

/* ---------- News / blog ---------- */

export async function savePost(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const title = text(fd, "title", 200);
  if (!title) return { error: "Title is required." };
  const slug = slugify(text(fd, "slug", 100) || title);
  if (!slug) return { error: "Could not make a URL from that title." };
  const published = flag(fd, "published");
  await connectDB();
  const _id = id(fd);
  const clash = await Post.findOne({ slug, ...(_id ? { _id: { $ne: _id } } : {}) }).lean();
  if (clash) return { error: "Another post already uses that URL." };
  const existing = _id ? await Post.findById(_id).lean() : null;
  const data = {
    slug,
    title,
    excerpt: text(fd, "excerpt", 400),
    body: text(fd, "body", 30000),
    image: imageUrl(fd, "image"),
    published,
    publishedAt: published ? existing?.publishedAt ?? new Date() : null,
  };
  if (_id) await Post.findByIdAndUpdate(_id, data);
  else await Post.create(data);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deletePost(fd: FormData) {
  await requireAdmin();
  await connectDB();
  await Post.findByIdAndDelete(id(fd));
  revalidatePath("/", "layout");
}

/* ---------- Navigation ---------- */

export async function saveNavItem(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const areaIn = text(fd, "area", 10);
  if (areaIn !== "header" && areaIn !== "footer") return { error: "Invalid menu." };
  const area: "header" | "footer" = areaIn;
  const label = text(fd, "label", 60);
  const href = link(text(fd, "href", 300));
  if (!label || !href) return { error: "Label and a valid link are required." };
  await connectDB();
  const parentId = id(fd, "parent");
  const data = {
    area,
    label,
    href,
    group: area === "footer" ? text(fd, "group", 60) || "Navigate" : "",
    parent: area === "header" && parentId ? parentId : null,
    order: num(fd, "order"),
  };
  const _id = id(fd);
  if (_id) await NavItem.findByIdAndUpdate(_id, data);
  else await NavItem.create(data);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteNavItem(fd: FormData) {
  await requireAdmin();
  await connectDB();
  const _id = id(fd);
  await NavItem.deleteMany({ $or: [{ _id }, { parent: _id }] });
  revalidatePath("/", "layout");
}

export async function resetNav(fd: FormData) {
  await requireAdmin();
  const area = text(fd, "area", 10) === "footer" ? "footer" : "header";
  await connectDB();
  await NavItem.deleteMany({ area });
  revalidatePath("/", "layout");
}

/* ---------- Admin users (owner only) ---------- */

export async function saveUser(_: FormState, fd: FormData): Promise<FormState> {
  await requireOwner();
  const email = text(fd, "email", 160).toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Enter a valid email." };
  const role = text(fd, "role", 10) === "admin" ? "admin" : "editor";
  const password = String(fd.get("password") ?? "");
  const _id = id(fd);
  if (!_id && password.length < 4) return { error: "Password must be at least 4 characters." };
  if (_id && password && password.length < 4) return { error: "Password must be at least 4 characters." };
  await connectDB();
  const data: Record<string, unknown> = {
    email,
    name: text(fd, "name", 120),
    role,
    active: flag(fd, "active"),
  };
  if (password) data.passwordHash = hashPassword(password);
  try {
    if (_id) await AdminUser.findByIdAndUpdate(_id, data);
    else await AdminUser.create(data);
  } catch {
    return { error: "That email is already in use." };
  }
  revalidatePath("/admin", "layout");
  return { ok: true };
}

export async function deleteUser(fd: FormData) {
  await requireOwner();
  await connectDB();
  await AdminUser.findByIdAndDelete(id(fd));
  revalidatePath("/admin", "layout");
}

/** Copies the built-in menu into the database so it can be edited item by item. */
export async function seedNav(fd: FormData) {
  await requireAdmin();
  const area = text(fd, "area", 10) === "footer" ? "footer" : "header";
  await connectDB();
  if (await NavItem.exists({ area })) return;
  if (area === "header") {
    await NavItem.insertMany(NAV.map((n, i) => ({ area, label: n.label, href: n.href, order: i })));
  } else {
    await NavItem.insertMany([
      ...NAV.map((n, i) => ({ area, group: "Navigate", label: n.label, href: n.href, order: i })),
      ...DIVISIONS.map((d, i) => ({
        area,
        group: "Divisions",
        label: d.title,
        href: `/divisions#${d.slug}`,
        order: 100 + i,
      })),
    ]);
  }
  revalidatePath("/", "layout");
}
