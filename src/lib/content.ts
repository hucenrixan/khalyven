// Built-in wording. Everything here can be overridden from the admin panel;
// these values are what the site shows until an override is saved.

export const COMPANY = "Khalyven International";

export const CONTACT = {
  email: "global.trade@khalyven.com / ahsan@khalyven.com",
  phone: "+960 7878784 / +960 7524449",
  maldives: "G. Shabnamee Villa, K. Malé, Republic of Maldives",
  malaysia: "B-G, 08, Jalan SS 7/13b, SS7, 47301 Petaling Jaya, Selangor, Malaysia",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/divisions", label: "Divisions" },
  { href: "/who-we-serve", label: "Who We Serve" },
  { href: "/contact", label: "Contact" },
];

export const DIVISIONS = [
  {
    slug: "hospitality",
    title: "Bespoke Resort & Hospitality",
    icon: "bed",
    summary:
      "Unparalleled hotel and resort amenities, from high-thread-count textiles to bespoke in-room accessories and premium guest consumables.",
    detail:
      "In luxury hospitality every detail is judged. We source and supply the pieces guests touch, wear and remember, vetted at the factory so that your property consistently exceeds five-star expectations.",
    items: [
      "Luxury linens, towels and robes",
      "Bespoke in-room accessories and amenity sets",
      "Premium guest consumables and bathroom collections",
      "Custom-branded uniforms and soft furnishings",
      "Villa and spa fit-out essentials",
    ],
  },
  {
    slug: "gastronomy",
    title: "Premium Gastronomy & FMCG",
    icon: "kitchen",
    summary:
      "Fine ingredients and fast-moving consumer goods for high-volume, high-expectation environments.",
    detail:
      "We connect Maldivian hospitality groups with elite ASEAN food producers, so gourmet provisions, fresh imports and daily essentials arrive reliably and on schedule.",
    items: [
      "Gourmet pantry staples and specialty ingredients",
      "Fresh and chilled imports",
      "Beverages and bulk daily essentials",
      "Private-label and bulk supply programmes",
      "Scheduled replenishment for resorts and groups",
    ],
  },
  {
    slug: "architectural",
    title: "Architectural & Renovation Materials",
    icon: "skyscraper",
    summary:
      "Top-tier construction, finishing and renovation materials built for the tropical climate without compromising on aesthetics.",
    detail:
      "Salt, humidity and sun are unforgiving. We source materials engineered to endure the Maldivian climate while meeting the design standards of modern luxury architecture.",
    items: [
      "Luxury flooring and wall finishes",
      "Weather-resistant architectural hardware",
      "Doors, joinery and custom-milled elements",
      "Sanitary ware, tiles and fittings",
      "Renovation and refurbishment packages",
    ],
  },
  {
    slug: "culinary",
    title: "Commercial Culinary Infrastructure",
    icon: "chef",
    summary:
      "State-of-the-art commercial kitchen equipment and complete restaurant fit-outs for demanding culinary operations.",
    detail:
      "We procure the robust, high-performance infrastructure that top-tier chefs and large-scale resort kitchens depend on, specified to your menu, volume and layout.",
    items: [
      "Commercial cooking and refrigeration equipment",
      "Industrial-grade appliances",
      "Complete restaurant and kitchen fit-outs",
      "Stainless steel fabrication and workstations",
      "Smallwares, serviceware and kitchen accessories",
    ],
  },
  {
    slug: "packaging",
    title: "Elevated Packaging Solutions",
    icon: "package",
    summary:
      "Sophisticated, sustainable and custom-branded packaging that protects your products and reflects your brand.",
    detail:
      "First impressions are permanent. From eco-conscious food containers to luxury retail bags, our packaging bridges utility and elegance.",
    items: [
      "Eco-conscious food and takeaway containers",
      "Luxury retail and gift packaging",
      "Custom-branded printed packaging",
      "Protective shipping and export packaging",
      "Sustainable and compostable ranges",
    ],
  },
];

export const ADVANTAGES = [
  {
    icon: "target",
    title: "Direct Source Procurement",
    text: "We remove the middleman, negotiating directly with manufacturers for superior quality and cost-efficiency.",
  },
  {
    icon: "shield",
    title: "Uncompromising Quality Assurance",
    text: "Every shipment is vetted to meet luxury standards before it leaves the factory floor.",
  },
  {
    icon: "truck",
    title: "Logistical Mastery",
    text: "We navigate the complexities of ASEAN-to-Maldives freight and customs from origin to island.",
  },
];

export const HUB_POINTS = [
  {
    icon: "target",
    title: "Direct-to-Source Economics",
    text: "By bypassing third-party distributors and negotiating directly with manufacturers in Malaysia and across ASEAN, we secure exclusive pricing and scale advantages for our Maldivian partners.",
  },
  {
    icon: "search",
    title: "On-the-Ground Quality Control",
    text: "We don't just order; we inspect. Our presence at the source lets us audit factories, verify materials and ensure every container meets the exacting standards of luxury hospitality and high-end construction.",
  },
  {
    icon: "hammer",
    title: "Bespoke Curation",
    text: "Custom-milled architectural materials, specialised kitchen outfitting or bespoke resort amenities: our team sources, develops and customises products directly at the manufacturing level.",
  },
  {
    icon: "world",
    title: "Logistical Precision",
    text: "From the factory floor in Southeast Asia to your project site or resort dock in the Maldives, we oversee a seamless, end-to-end journey.",
  },
];

export const CLIENTS = [
  {
    icon: "community",
    title: "Luxury Hotels & Resorts",
    tagline: "Elevating the Guest Experience",
    text: "In ultra-luxury hospitality, consistency is everything. We partner with general managers and procurement directors to ensure an uninterrupted flow of premium amenities, high-end textiles and exquisite guest consumables, safeguarding your property's five-star reputation.",
  },
  {
    icon: "home",
    title: "Real Estate Developers",
    tagline: "Building the Future of Island Luxury",
    text: "For developers shaping the next generation of private islands and luxury residences, delays are costly. We provide direct access to elite Southeast Asian manufacturers for high-grade construction materials, luxury finishings and custom architectural elements, delivered on time and to the highest aesthetic standards.",
  },
  {
    icon: "chef",
    title: "Restaurants & Culinary Groups",
    tagline: "Empowering Culinary Excellence",
    text: "From standalone fine-dining establishments to expansive resort restaurant portfolios, we equip culinary innovators with commercial kitchen infrastructure and a curated selection of premium food and beverage imports, so chefs can execute their vision without supply limitations.",
  },
  {
    icon: "store",
    title: "Premium Wholesalers & Distributors",
    tagline: "Strengthening the Supply Chain",
    text: "We are the conduit for Maldivian wholesalers looking to upgrade their portfolios. Through our on-the-ground presence in Malaysia we secure distribution rights and competitive pricing on premium ASEAN goods, allowing you to supply the local market with reliability and scale.",
  },
];

export const PROCESS = [
  {
    icon: "clipboard",
    title: "Brief",
    text: "You share your requirements, volumes, specifications and timeline with our procurement team.",
  },
  {
    icon: "search",
    title: "Source",
    text: "We shortlist and audit qualified manufacturers and negotiate directly at the source.",
  },
  {
    icon: "shield",
    title: "Inspect",
    text: "Samples, materials and production are checked on the ground before anything ships.",
  },
  {
    icon: "truck",
    title: "Deliver",
    text: "We coordinate freight, customs and final delivery to your project site or resort dock.",
  },
];

export const INQUIRY_TYPES = [
  "Luxury Hotel / Resort",
  "Real Estate Developer",
  "Restaurant / Culinary Group",
  "Wholesaler / Distributor",
  "Other",
];
