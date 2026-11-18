// Registry of every editable piece of wording on the public site, with the
// built-in text as the default. Safe to import from client components.
import { ADVANTAGES, CLIENTS, HUB_POINTS, INQUIRY_TYPES, PROCESS } from "./content";

export type Field = {
  key: string;
  label: string;
  def: string;
  /** Multi-line text box. */
  long?: boolean;
  /** Value must be a link (/page, https://…, mailto:, tel:, #anchor). */
  link?: boolean;
  hint?: string;
};

export type ListItem = { icon?: string; title: string; tagline?: string; text?: string };
export type ListColumn = "icon" | "title" | "tagline" | "text";

export type ListDef = {
  key: string;
  label: string;
  hint?: string;
  columns: ListColumn[];
  def: ListItem[];
};

export type PageDef = {
  label: string;
  /** Public URL, for the "view page" link. */
  path?: string;
  about: string;
  groups: { title: string; fields: Field[] }[];
  lists?: ListDef[];
};

const f = (key: string, label: string, def: string, extra: Partial<Field> = {}): Field => ({
  key,
  label,
  def,
  ...extra,
});

const seo = (title: string): PageDef["groups"][number] => ({
  title: "Search engines (SEO)",
  fields: [
    f("seoTitle", "Browser tab / Google title", title),
    f("seoDescription", "Google description", "", {
      long: true,
      hint: "Leave blank to use the site-wide description.",
    }),
  ],
});

const hero = (eyebrow: string, title: string, text: string): PageDef["groups"][number] => ({
  title: "Top banner",
  fields: [
    f("heroEyebrow", "Small label above the title", eyebrow),
    f("heroTitle", "Title", title),
    f("heroText", "Intro text", text, { long: true }),
  ],
});

export const PAGES = {
  site: {
    label: "Site-wide",
    about: "Logo text, header button, footer, the closing call-to-action band and default SEO.",
    groups: [
      {
        title: "Logo text",
        fields: [f("logoTop", "First line", "KHALYVEN"), f("logoBottom", "Second line", "INTERNATIONAL")],
      },
      {
        title: "Header button",
        fields: [
          f("headerCtaLabel", "Button text", "Partner With Us"),
          f("headerCtaHref", "Button link", "/contact", { link: true }),
        ],
      },
      {
        title: "Footer",
        fields: [
          f(
            "footerBlurb",
            "Text under the logo",
            "Born in the Maldives, strategically anchored in Malaysia. Premium procurement for the Indian Ocean's most exclusive destinations.",
            { long: true }
          ),
          f("footerContactHeading", "Contact column heading", "Contact"),
          f("footerCopyright", "Copyright line (after © and the year)", "Khalyven International. All rights reserved."),
        ],
      },
      {
        title: "Closing call-to-action band (bottom of most pages)",
        fields: [
          f("ctaTitle", "Title", "Secure Your Supply Chain"),
          f(
            "ctaText",
            "Text",
            "Discover how Khalyven can elevate your property, project or enterprise with world-class ASEAN procurement.",
            { long: true }
          ),
          f("ctaButton", "Button text", "Contact Our Procurement Team"),
          f("ctaHref", "Button link", "/contact", { link: true }),
        ],
      },
      {
        title: "Search engines (SEO)",
        fields: [
          f("seoTitle", "Home page title", "Khalyven International | Strategic Procurement for the Maldives"),
          f("seoBrand", "Name added after every other page title", "Khalyven International"),
          f(
            "seoDescription",
            "Default Google description",
            "Khalyven International is a premium procurement and supply partner connecting ASEAN manufacturers with Maldivian resorts, developers, restaurants and distributors.",
            { long: true }
          ),
        ],
      },
    ],
  },

  home: {
    label: "Home",
    path: "/",
    about: "Every heading, paragraph, button and list on the home page.",
    groups: [
      {
        title: "Hero",
        fields: [
          f("heroEyebrow", "Small label above the headline", "Strategic Procurement · Maldives × ASEAN"),
          f("heroTitle", "Headline", "Elevating the Maldivian Standard."),
          f(
            "heroText",
            "Paragraph",
            "The premier strategic procurement and supply partner bridging Malaysia and other ASEAN manufacturing excellence with the Maldives' most discerning resorts, developers and commercial enterprises.",
            { long: true }
          ),
          f("heroBtn1", "First button text", "Partner With Us"),
          f("heroBtn1Href", "First button link", "/contact", { link: true }),
          f("heroBtn2", "Second button text", "Explore Our Divisions"),
          f("heroBtn2Href", "Second button link", "/divisions", { link: true }),
          f("heroAlt", "Hero photo description (for screen readers)", "Aerial view of overwater villas in the Maldives"),
        ],
      },
      {
        title: "Who We Are",
        fields: [
          f("introEyebrow", "Small label", "Who We Are"),
          f("introTitle", "Heading", "Redefining Seamless Procurement"),
          f(
            "introBody",
            "Paragraphs",
            "Operating at the intersection of quality, scale and exclusivity, Khalyven International is a distinguished supply enterprise registered in the Maldives, with a strategic procurement hub in Malaysia. We bypass traditional supply-chain friction to deliver world-class products directly from the heart of Southeast Asia to the shores of the Indian Ocean.\n\nWhether outfitting a newly developed private island, sourcing premium gastronomy or upgrading commercial infrastructure, we provide a frictionless, end-to-end procurement experience tailored for the luxury and commercial sectors.",
            { long: true, hint: "Leave an empty line between paragraphs." }
          ),
        ],
      },
      {
        title: "Divisions section",
        fields: [
          f("divEyebrow", "Small label", "Areas of Expertise"),
          f("divTitle", "Heading", "Our Divisions"),
          f("divText", "Text", "Five specialist divisions, one accountable partner.", { long: true }),
          f("divCardTitle", "Last card: title", "Need something specific?"),
          f("divCardText", "Last card: text", "If it can be manufactured in ASEAN, we can source it."),
          f("divCardLink", "Last card: link text", "Send a brief"),
          f("divCardHref", "Last card: link", "/contact", { link: true }),
        ],
      },
      {
        title: "Advantage section",
        fields: [
          f("advEyebrow", "Small label", "The Khalyven Advantage"),
          f("advTitle", "Heading", "A Transnational Footprint"),
          f(
            "advText",
            "Text",
            "With foundational roots in the Maldives and a dynamic operational expansion into Malaysia, we hold a rare dual-market advantage: we audit manufacturers, enforce strict quality control and negotiate exclusive pricing at the source, passing that value, speed and reliability on to our Maldivian clientele.",
            { long: true }
          ),
          f("advAlt", "Photo description (for screen readers)", "Container terminal with cranes and stacked shipping containers"),
        ],
      },
      {
        title: "How We Work section",
        fields: [
          f("procEyebrow", "Small label", "How We Work"),
          f("procTitle", "Heading", "From Factory Floor to Island Shore"),
        ],
      },
      {
        title: "Who We Serve section",
        fields: [
          f("cliEyebrow", "Small label", "Who We Serve"),
          f("cliTitle", "Heading", "Strategic Partnerships Across the Maldivian Economy"),
          f(
            "cliText",
            "Text",
            "We don't just supply products; we engineer supply-chain solutions for the most demanding sectors in the Maldives.",
            { long: true, hint: "The sector cards themselves are edited under Pages → Who We Serve." }
          ),
        ],
      },
      {
        title: "Testimonials section",
        fields: [
          f("testEyebrow", "Small label", "Testimonials"),
          f("testTitle", "Heading", "Trusted by the people we supply"),
        ],
      },
    ],
    lists: [
      { key: "advantages", label: "Advantages (three columns)", columns: ["icon", "title", "text"], def: ADVANTAGES },
      {
        key: "process",
        label: "How We Work steps",
        hint: "Steps are numbered automatically in this order.",
        columns: ["title", "text"],
        def: PROCESS.map(({ title, text }) => ({ title, text })),
      },
    ],
  },

  about: {
    label: "About",
    path: "/about",
    about: "The company story, the Malaysian hub points and the commitment statement.",
    groups: [
      hero(
        "About Us",
        "Bridging ASEAN Excellence and Maldivian Luxury.",
        "Born in the Maldives, strategically anchored in Malaysia. Khalyven International is the premier transnational procurement firm dedicated to elevating the supply chain for the Indian Ocean's most exclusive destinations and developments."
      ),
      {
        title: "Our Story",
        fields: [
          f("storyEyebrow", "Small label", "Our Story"),
          f("storyTitle", "Heading", "A Vision of Frictionless Procurement"),
          f(
            "storyBody",
            "Paragraphs",
            "Khalyven International was established in the Maldives with a singular, uncompromising vision: to redefine how the nation's top-tier industries source their essential infrastructure and luxury goods. We recognised that while the Maldives sets the global standard for luxury hospitality and high-end development, the traditional supply chains feeding it were often fragmented, indirect and inefficient.\n\nWe knew that to serve the apex of the Maldivian market (elite resorts, visionary real estate developers and high-volume commercial enterprises) we had to eliminate the middlemen. We needed to be at the source.",
            { long: true, hint: "Leave an empty line between paragraphs." }
          ),
        ],
      },
      {
        title: "Transnational Advantage",
        fields: [
          f("hubEyebrow", "Small label", "The Transnational Advantage"),
          f("hubTitle", "Heading", "Two Nations. One Seamless Supply Chain."),
          f(
            "hubText",
            "Text",
            "To give our partners unparalleled access to the world's fastest-growing manufacturing hub, we are actively expanding our corporate footprint with a dedicated procurement and operations headquarters in Malaysia. By bridging the Maldives and the ASEAN region, we operate as a direct conduit between Southeast Asia's most capable manufacturers and the Maldives' most demanding buyers.",
            { long: true }
          ),
          f("hubCaption", "Caption on the banner photo", "Kuala Lumpur · Procurement Hub"),
          f("hubAlt", "Banner photo description (for screen readers)", "Kuala Lumpur skyline at dusk"),
          f("hubListHeading", "Heading above the hub points", "What Our Malaysian Hub Means for You"),
        ],
      },
      {
        title: "Our Commitment",
        fields: [
          f("comEyebrow", "Small label", "Our Commitment"),
          f("comTitle", "Heading", "Engineered for the Exceptional"),
          f(
            "comText",
            "Text",
            "At Khalyven International, we do not merely fulfil orders; we architect supply solutions. We understand the stakes of opening a new luxury resort on time, the precision required in a commercial kitchen fit-out, and the volume demands of national wholesalers.",
            { long: true }
          ),
          f(
            "comQuote",
            "Closing statement (italic)",
            "Our commitment is to be the silent, flawless engine behind your operations, delivering the quality you demand with the reliability you deserve.",
            { long: true }
          ),
        ],
      },
      seo("About Us"),
    ],
    lists: [{ key: "hubPoints", label: "Hub points", columns: ["icon", "title", "text"], def: HUB_POINTS }],
  },

  divisions: {
    label: "Divisions page",
    path: "/divisions",
    about: "The banner and labels on the Divisions page. The divisions themselves are under Divisions.",
    groups: [
      hero(
        "Areas of Expertise",
        "Our Divisions",
        "Five specialist divisions covering the full spectrum of luxury hospitality, development and commercial supply, sourced direct from ASEAN manufacturers."
      ),
      {
        title: "Labels",
        fields: [
          f("numberLabel", "Word before each number (e.g. Division 01)", "Division"),
          f("itemsHeading", "Heading above each supply list", "What we supply"),
        ],
      },
      seo("Our Divisions"),
    ],
  },

  serve: {
    label: "Who We Serve",
    path: "/who-we-serve",
    about: "The banner and the client sectors (also shown as cards on the home page).",
    groups: [
      hero(
        "Our Partners",
        "Strategic Partnerships Across the Maldivian Economy.",
        "Khalyven International does not just supply products; we engineer supply-chain solutions for the most demanding sectors in the Maldives, with uncompromising quality, reliable volume and exclusive access to ASEAN markets."
      ),
      seo("Who We Serve"),
    ],
    lists: [
      {
        key: "clients",
        label: "Client sectors",
        hint: "Also shown as cards on the home page.",
        columns: ["icon", "title", "tagline", "text"],
        def: CLIENTS,
      },
    ],
  },

  contact: {
    label: "Contact",
    path: "/contact",
    about: "Banner, office labels and every label on the inquiry form. Email, phone and addresses are under Photos & Contact.",
    groups: [
      hero(
        "Contact",
        "Secure Your Supply Chain.",
        "Tell us about your property, project or enterprise. Our procurement team will respond with a considered approach."
      ),
      {
        title: "Contact details column",
        fields: [
          f("directHeading", "Heading above email and phone", "Direct"),
          f("office1Heading", "First office heading", "Maldives"),
          f("office1Note", "First office note", "Registered office"),
          f("office2Heading", "Second office heading", "Malaysia"),
          f("office2Note", "Second office note", "Procurement hub"),
        ],
      },
      {
        title: "Inquiry form",
        fields: [
          f("fName", "Name field label", "Full name"),
          f("fCompany", "Company field label", "Company / Property"),
          f("fEmail", "Email field label", "Email"),
          f("fPhone", "Phone field label", "Phone / WhatsApp"),
          f("fType", "Customer type field label", "I am a"),
          f("inquiryTypes", "Customer type options", INQUIRY_TYPES.join("\n"), {
            long: true,
            hint: "One option per line.",
          }),
          f("fDivision", "Division field label", "Division of interest"),
          f("fSelect", "Placeholder in the drop-downs", "Select"),
          f("fMessage", "Message field label", "Tell us what you need"),
          f("fSubmit", "Submit button text", "Submit Inquiry"),
          f("thanksTitle", "Thank-you title", "Thank you."),
          f("thanksText", "Thank-you text", "Your inquiry has reached our procurement team. We will respond shortly.", {
            long: true,
          }),
          f("thanksAgain", "Link to send another", "Send another inquiry"),
        ],
      },
      seo("Contact Our Procurement Team"),
    ],
  },

  gallery: {
    label: "Gallery page",
    path: "/gallery",
    about: "The banner on the Gallery page. Photos are under Gallery.",
    groups: [
      hero("Our Work", "Gallery", "A look at the products and projects we deliver."),
      { title: "Labels", fields: [f("empty", "Message when there are no photos", "Photos coming soon.")] },
      seo("Gallery"),
    ],
  },

  news: {
    label: "News page",
    path: "/news",
    about: "The banner on the News page. Articles are under News.",
    groups: [
      hero("Updates", "News", "Announcements and insights from Khalyven International."),
      {
        title: "Labels",
        fields: [
          f("empty", "Message when there are no articles", "No articles yet."),
          f("back", "Back link on an article", "All news"),
        ],
      },
      seo("News"),
    ],
  },
} satisfies Record<string, PageDef>;

export type PageKey = keyof typeof PAGES;
export const PAGE_KEYS = Object.keys(PAGES) as PageKey[];
export const isPageKey = (v: string): v is PageKey => v in PAGES;
export const pageDef = (k: PageKey): PageDef => PAGES[k];

/** Splits a multi-paragraph field into paragraphs. */
export const paras = (s: string) => s.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
/** Splits a one-per-line field into its lines. */
export const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);
