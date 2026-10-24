import mongoose, { Schema, models, model } from "mongoose";

const InquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    type: { type: String, trim: true },
    division: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    notes: { type: String, trim: true },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

export default (models.Inquiry as mongoose.Model<mongoose.InferSchemaType<typeof InquirySchema>>) ||
  model("Inquiry", InquirySchema);
