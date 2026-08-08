import type mongoose from "mongoose";
import type { Document } from "mongoose";

export interface IUser extends Document {
  email?: string;
  username: string;
  password?: string;
  role: "user" | "admin" | "coach";
  fullName?: string;
  avatar?: string;
  phone?: string;
  status: "active" | "expired" | "blocked";
  wishlist?: mongoose.Types.ObjectId[];
  createdAt: Date;
}

export interface IAdminUser {
  _id: string;
  username: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role: "user" | "admin" | "coach";
  status: string;
  package?: string;
  avatar?: string;
  totalPayments?: number;
  createdAt: string;
}

export interface UsersStatsProps {
  totalUsers: number;
  activeUsers: number;
  expiredUsers: number;
  blockedUsers: number;
}

export interface UserEditModalProps {
  user: IAdminUser;
  onClose: () => void;
  onSaveSuccess: () => void;
}

export interface UserTableListProps {
  onEditUser?: (user: IAdminUser) => void;
}

export interface AdminUsersApiResponse {
  users?: IAdminUser[];
  userFind?: IAdminUser[];
  totalPage?: number;
  totalUsers?: number;
  activeUsers?: number;
  expiredUsers?: number;
  blockedUsers?: number;
  message?: string;
}

export type { IOtp } from "./otp";
