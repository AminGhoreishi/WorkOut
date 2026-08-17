import type { Document, Types } from "mongoose";

export interface ITestimonial {
  name: string;
  role: string;
  avatar?: string;
  badge: string;
  rating: number;
  comment: string;
  achievement?: string;
  isVisible: boolean;
  order?: number;
  userId?: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITestimonialDocument extends ITestimonial, Document {}

export interface UserTestimonialRecord {
  _id: string;
  name: string;
  role: string;
  avatar?: string;
  badge: string;
  rating: number;
  comment: string;
  achievement?: string;
  isVisible: boolean;
  createdAt: string;
}

export interface NewTestimonialInput {
  badge: string;
  rating: number;
  comment: string;
  achievement: string;
}

export interface AddTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
