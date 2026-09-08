import type { Document, Types } from "mongoose";
import type { KeyedMutator } from "swr";

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

export interface PopulatedTestimonialUser {
  _id: string;
  fullName?: string;
  username?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface AdminTestimonialItem {
  _id: string;
  name: string;
  role: string;
  avatar?: string;
  badge: string;
  rating: number;
  comment: string;
  achievement?: string;
  isVisible: boolean;
  order?: number;
  userId?: PopulatedTestimonialUser | string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminTestimonialsResponse {
  success: boolean;
  testimonials: AdminTestimonialItem[];
  total: number;
  page?: number;
  totalPages?: number;
}

export interface ViewTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: AdminTestimonialItem | null;
}

export interface AdminTestimonialStatsData {
  total: number;
  active: number;
  hidden: number;
  avgRating: string;
}

export interface TestimonialStatsProps {
  stats: AdminTestimonialStatsData;
}

export interface TestimonialTableProps {
  initialStatus?: string;
  onView: (item: AdminTestimonialItem) => void;
}
