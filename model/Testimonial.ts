import mongoose, { Schema } from "mongoose";
import type { ITestimonialDocument } from "@/types/testimonial";

const TestimonialSchema = new Schema<ITestimonialDocument>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    avatar: { type: String, default: "" },
    badge: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    comment: { type: String, required: true, trim: true },
    achievement: { type: String, default: "" },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonialDocument>("Testimonial", TestimonialSchema);
