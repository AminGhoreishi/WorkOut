import type mongoose from "mongoose";
import type { Document } from "mongoose";

export type NotificationType = "ticket" | "workout_plan" | "subscription" | "system";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClientNotification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsApiResponse {
  success: boolean;
  notifications: IClientNotification[];
  unreadCount: number;
  message?: string;
}

export interface NotificationDropdownProps {
  initialUnreadCount?: number;
}
