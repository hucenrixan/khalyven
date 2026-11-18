import mongoose, { Schema, models, model } from "mongoose";

const SettingsSchema = new Schema(
  {
    key: { type: String, default: "site", unique: true },
    contact: {
      email: String,
      phone: String,
      maldives: String,
      malaysia: String,
    },
    photos: {
      hero: String,
      source: String,
      malaysia: String,
    },
  },
  { timestamps: true }
);

const DivisionSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: String,
    summary: String,
    detail: String,
    items: [String],
    image: String,
    icon: String,
    order: Number,
    // A built-in division the admin removed (kept as a marker so it stays hidden).
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Wording overrides for one page: `values` holds text fields, `lists` holds
// repeating blocks. Anything missing falls back to the defaults in lib/pages.ts.
const PageContentSchema = new Schema(
  {
    page: { type: String, required: true, unique: true },
    values: { type: Schema.Types.Mixed, default: {} },
    lists: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

export const Settings =
  (models.Settings as mongoose.Model<mongoose.InferSchemaType<typeof SettingsSchema>>) ||
  model("Settings", SettingsSchema);

export const DivisionContent =
  (models.DivisionContent as mongoose.Model<mongoose.InferSchemaType<typeof DivisionSchema>>) ||
  model("DivisionContent", DivisionSchema);

export const PageContent =
  (models.PageContent as mongoose.Model<mongoose.InferSchemaType<typeof PageContentSchema>>) ||
  model("PageContent", PageContentSchema);
