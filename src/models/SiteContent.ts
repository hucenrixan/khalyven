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
  },
  { timestamps: true }
);

export const Settings =
  (models.Settings as mongoose.Model<mongoose.InferSchemaType<typeof SettingsSchema>>) ||
  model("Settings", SettingsSchema);

export const DivisionContent =
  (models.DivisionContent as mongoose.Model<mongoose.InferSchemaType<typeof DivisionSchema>>) ||
  model("DivisionContent", DivisionSchema);
