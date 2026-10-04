import { connectDB } from "./mongodb";
import { CONTACT, DIVISIONS } from "./content";
import { DEFAULT_PHOTOS } from "./defaults";
import { DivisionContent, Settings } from "@/models/SiteContent";


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
