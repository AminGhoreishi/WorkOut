import mongoose, { Schema } from "mongoose";
import { ITicket, IMessage } from "@/types/ticket";

const MessageSchema = new Schema<IMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    senderName: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

const TicketSchema = new Schema<ITicket>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    coachId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    initiatedBy: {
      type: String,
      enum: ["user", "coach"],
      default: "user",
      index: true,
    },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "answered", "closed", "coach_sent"],
      default: "pending",
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

export default mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", TicketSchema);
