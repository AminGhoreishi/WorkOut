import type mongoose from "mongoose";

export interface CoachInfo {
  _id: string;
  name: string;
  avatarUrl?: string;
  specialties?: string[];
  bio?: string;
}

export interface SubscriptionPackageInfo {
  _id: string;
  name: string;
  slug?: string;
  tagline?: string;
  colorClass?: string;
}

export interface OrderItem {
  _id: string;
  packageId?: {
    name: string;
  } | null;
  billingCycle: string;
  amountPaid: number;
  createdAt: string | Date;
  paymentRef?: string;
  status: string;
}

export interface SubscriptionDetails {
  _id: string;
  orderId?: OrderItem | null;
  userId: string;
  packageId?: SubscriptionPackageInfo | null;
  coachId?: CoachInfo | null;
  status: "trial" | "active" | "expired" | "cancelled";
  startsAt: string | Date;
  endsAt: string | Date;
  trialEndsAt?: string | Date;
  cancelledAt?: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ISubscription {
  orderId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  packageId: mongoose.Types.ObjectId;
  coachId?: mongoose.Types.ObjectId;
  status: "trial" | "active" | "expired" | "cancelled";
  startsAt: Date;
  endsAt: Date;
  trialEndsAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseHistoryProps {
  orders: OrderItem[];
}

export interface SubscriptionViewProps {
  subscription: SubscriptionDetails | null;
  workoutPlan?: any;
  workoutDays?: any[];
  orders: OrderItem[];
}

export interface ActiveAccessesProps {
  className?: string;
}

export interface NoSubscriptionViewProps {
  className?: string;
}

export interface SubscriptionStats {
  total: number;
  active: number;
  trial: number;
  expired: number;
}

export interface SubscriptionStatsProps {
  stats: SubscriptionStats;
}

export interface SubscriptionsManagementProps {
  stats: SubscriptionStats;
}
