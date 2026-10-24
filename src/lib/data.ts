import { connectDB } from "./mongodb";
import { CONTACT, DIVISIONS, NAV } from "./content";
import { DEFAULT_PHOTOS } from "./defaults";
import { DivisionContent, Settings } from "@/models/SiteContent";
import { GalleryItem, NavItem, Post, Testimonial } from "@/models/Content";


export type SiteSettings = {
  contact: typeof CONTACT;
  photos: typeof DEFAULT_PHOTOS;
};

type SettingsDoc = {
  contact?: Partial<Record<keyof typeof CONTACT, string | null>>;
  photos?: Partial<Record<keyof typeof DEFAULT_PHOTOS, string | null>>;
} | null;

type DivisionDoc = {
  slug: string;
  title?: string | null;
  summary?: string | null;
  detail?: string | null;
  items?: string[];
  image?: string | null;
};

export type DivisionData = (typeof DIVISIONS)[number] & { image: string };

const pick = (v: string | null | undefined, fallback: string) => (v && v.trim() ? v : fallback);

/** Site-wide settings from the database, falling back to the defaults in code. */
export async function getSettings(): Promise<SiteSettings> {
  let doc: SettingsDoc = null;
  try {
    await connectDB();
    doc = (await Settings.findOne({ key: "site" }).lean()) as SettingsDoc;
  } catch {
    // database unavailable: serve defaults
  }
  return {
    contact: {
      email: pick(doc?.contact?.email, CONTACT.email),
      phone: pick(doc?.contact?.phone, CONTACT.phone),
      maldives: pick(doc?.contact?.maldives, CONTACT.maldives),
      malaysia: pick(doc?.contact?.malaysia, CONTACT.malaysia),
    },
    photos: {
      hero: pick(doc?.photos?.hero, DEFAULT_PHOTOS.hero),
      source: pick(doc?.photos?.source, DEFAULT_PHOTOS.source),
      malaysia: pick(doc?.photos?.malaysia, DEFAULT_PHOTOS.malaysia),
    },
  };
}

/** Divisions with any admin edits applied on top of the defaults in code. */
export async function getDivisions(): Promise<DivisionData[]> {
  let docs: DivisionDoc[] = [];
  try {
    await connectDB();
    docs = (await DivisionContent.find().lean()) as DivisionDoc[];
  } catch {
    // database unavailable: serve defaults
  }
  return DIVISIONS.map((d) => {
    const o = docs.find((x) => x.slug === d.slug);
    return {
      ...d,
      title: pick(o?.title, d.title),
      summary: pick(o?.summary, d.summary),
      detail: pick(o?.detail, d.detail),
      items: o?.items?.length ? o.items : d.items,
      image: pick(o?.image, `/photos/${d.slug}.jpg`),
    };
  });
}

/* ---------- Navigation ---------- */

export type NavNode = { id?: string; label: string; href: string; children: NavNode[] };
export type FooterGroup = { title: string; links: { label: string; href: string }[] };

type NavDoc = {
  _id: unknown;
  area: string;
  group?: string | null;
  label: string;
  href: string;
  parent?: unknown;
  order?: number | null;
};

/** Header tree and footer columns; falls back to the defaults in code until menus are edited. */
export async function getNav(): Promise<{ header: NavNode[]; footer: FooterGroup[] }> {
  let docs: NavDoc[] = [];
  try {
    await connectDB();
    docs = (await NavItem.find().sort({ order: 1, createdAt: 1 }).lean()) as NavDoc[];
  } catch {
    // database unavailable: serve defaults
  }

  const hdr = docs.filter((d) => d.area === "header");
  const header: NavNode[] = hdr.length
    ? hdr
        .filter((d) => !d.parent)
        .map((d) => ({
          id: String(d._id),
          label: d.label,
          href: d.href,
          children: hdr
            .filter((c) => c.parent && String(c.parent) === String(d._id))
            .map((c) => ({ id: String(c._id), label: c.label, href: c.href, children: [] })),
        }))
    : NAV.map((n) => ({ ...n, children: [] }));

  const ftr = docs.filter((d) => d.area === "footer");
  let footer: FooterGroup[];
  if (ftr.length) {
    footer = [];
    for (const d of ftr) {
      const title = d.group || "Navigate";
      let g = footer.find((x) => x.title === title);
      if (!g) footer.push((g = { title, links: [] }));
      g.links.push({ label: d.label, href: d.href });
    }
  } else {
    footer = [
      { title: "Navigate", links: NAV },
      { title: "Divisions", links: DIVISIONS.map((d) => ({ label: d.title, href: `/divisions#${d.slug}` })) },
    ];
  }
  return { header, footer };
}

/* ---------- Testimonials, gallery, news ---------- */

export async function getTestimonials() {
  try {
    await connectDB();
    return await Testimonial.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean();
  } catch {
    return [];
  }
}

export async function getGallery() {
  try {
    await connectDB();
    return await GalleryItem.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean();
  } catch {
    return [];
  }
}

export async function getPosts() {
  try {
    await connectDB();
    return await Post.find({ published: true }).sort({ publishedAt: -1 }).lean();
  } catch {
    return [];
  }
}

export async function getPost(slug: string) {
  try {
    await connectDB();
    return await Post.findOne({ slug, published: true }).lean();
  } catch {
    return null;
  }
}
