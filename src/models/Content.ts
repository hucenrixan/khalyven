import mongoose, { Schema, models, model } from "mongoose";

type M<S extends Schema> = mongoose.Model<mongoose.InferSchemaType<S>>;

const TestimonialSchema = new Schema(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    role: String,
    company: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const GallerySchema = new Schema(
  {
    image: { type: String, required: true },
    caption: String,
    category: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const PostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: String,
    body: String,
    image: String,
    published: { type: Boolean, default: false },
    publishedAt: Date,
  },
  { timestamps: true }
);

// Header / footer menu entry. `parent` makes it a sub-nav (dropdown) item.
const NavItemSchema = new Schema(
  {
    area: { type: String, enum: ["header", "footer"], required: true },
    group: String, // footer column heading
    label: { type: String, required: true },
    href: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "NavItem", default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: String,
    role: { type: String, enum: ["admin", "editor"], default: "editor" },
    passwordHash: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Fixed-window counter; documents expire on their own via the TTL index.
const RateLimitSchema = new Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export const Testimonial =
  (models.Testimonial as M<typeof TestimonialSchema>) || model("Testimonial", TestimonialSchema);
export const GalleryItem =
  (models.GalleryItem as M<typeof GallerySchema>) || model("GalleryItem", GallerySchema);
export const Post = (models.Post as M<typeof PostSchema>) || model("Post", PostSchema);
export const NavItem =
  (models.NavItem as M<typeof NavItemSchema>) || model("NavItem", NavItemSchema);
export const AdminUser =
  (models.AdminUser as M<typeof AdminUserSchema>) || model("AdminUser", AdminUserSchema);
export const RateLimit =
  (models.RateLimit as M<typeof RateLimitSchema>) || model("RateLimit", RateLimitSchema);
