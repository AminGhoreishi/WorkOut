import mongoose, { Schema } from "mongoose";
import type { IBan } from "@/types/ban";

const BanSchema = new Schema<IBan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    adminId: { type: Schema.Types.ObjectId, ref: "User" },
    reason: { type: String, default: "مسدود شده توسط مدیر" },
    status: {
      type: String,
      enum: ["active", "revoked"],
      default: "active",
    },
  },
  { timestamps: true, versionKey: false }
);

const BanModel =
  mongoose.models.Ban || mongoose.model<IBan>("Ban", BanSchema);

export default BanModel;
