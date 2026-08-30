import type { Document, Types } from "mongoose";
import type { IPackage } from "@/types/package";

export interface IDiscountSchema {
  code?: string | null;
  percent: number;
  packages: Types.ObjectId[] | IPackage[];
  maxUsage?: number | null;
  usageCount: number;
  startsAt?: Date;
  expiresAt?: Date | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDiscount extends Omit<IDiscountSchema, "packages">, Document {
  packages: Types.ObjectId[] | IPackage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscountItem {
  _id: string;
  code?: string | null;
  percent: number;
  packages: { _id: string; name: string }[];
  maxUsage?: number | null;
  usageCount: number;
  startsAt?: string | Date;
  expiresAt?: string | Date | null;
  isActive: boolean;
  createdAt?: string | Date;
}

export interface DiscountFormData {
  code?: string;
  percent: number;
  packageId: string;
  maxUsage?: number | null;
  startsAt?: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export interface DiscountStatsData {
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
  totalUsage: number;
}

export interface DiscountsManagementProps {
  initialStats: DiscountStatsData;
}

export interface DiscountStatsProps {
  stats: DiscountStatsData;
}

export interface DiscountListProps {
  discounts: DiscountItem[];
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  statusFilter: "all" | "active" | "inactive";
  setStatusFilter: (status: "all" | "active" | "inactive") => void;
}

export interface DiscountsApiResponse {
  discounts: DiscountItem[];
}
