import mongoose, { Schema } from "mongoose";
import type { ISendTicketCoach, IMessage } from "@/types/ticket";

const MessageSchema = new Schema<IMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    senderName: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

const SendTicketCoachSchema = new Schema<ISendTicketCoach>(
  {
    coachId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "answered", "closed", "coach_sent"],
      default: "coach_sent",
      index: true,
    },
    category: {
      type: String,
      enum: ["workout", "nutrition", "form_check", "injury", "technical"],
      required: true,
      index: true,
    },
    readNotifications: {
      type: Boolean,
      default: false,
      index: true,
    },
    videoUrl: { type: String },
    messages: [MessageSchema],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.SendTicketCoach ||
  mongoose.model<ISendTicketCoach>("SendTicketCoach", SendTicketCoachSchema);
