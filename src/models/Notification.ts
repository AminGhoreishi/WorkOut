import mongoose, { Schema } from "mongoose";
import type { INotification } from "@/types/notification";

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["ticket", "workout_plan", "subscription", "system"],
      default: "ticket",
      index: true,
    },
    link: {
      type: String,
      default: "/dashboard/tickets",
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
);

NotificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

export default mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);
