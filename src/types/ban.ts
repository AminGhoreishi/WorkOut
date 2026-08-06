import type { Types } from "mongoose";

export interface IBan {
  _id?: string | Types.ObjectId;
  userId: Types.ObjectId | string;
  adminId?: Types.ObjectId | string;
  reason?: string;
  status: "active" | "revoked";
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
