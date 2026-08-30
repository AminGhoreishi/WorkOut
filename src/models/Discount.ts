import mongoose, { Schema } from "mongoose";
import type { IDiscount } from "@/types/discount";

const DiscountSchema = new Schema<IDiscount>(
  {
    code: {
      type: String,
      default: null,
      trim: true,
      uppercase: true,
      sparse: true,
    },
    percent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    packages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Package",
      },
    ],
    maxUsage: {
      type: Number,
      default: null,
    },
    usageCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    startsAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.models.Discount ||
  mongoose.model<IDiscount>("Discount", DiscountSchema);
