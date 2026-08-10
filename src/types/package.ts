import type mongoose from "mongoose";
import type { Document } from "mongoose";
import type { FeatureItem } from "./components";

export interface Package {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: {
    monthly: number;
  };
  icon: string;
  colorClass: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  isPopular: boolean;
  isActive: boolean;
  hasMealPlan: boolean;
  tier?: string;
  features?: string[] | { name: string }[];
  highlights?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PackageSlugPageProps {
  params: Promise<{ slug: string }>;
}

export interface PackageDetailsProps {
  package: Package;
  features: FeatureItem[];
}

export interface IPackage extends Omit<Package, "_id" | "createdAt" | "updatedAt">, Document {
  createdAt: Date;
  updatedAt: Date;
}

export type PackageFormData = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  colorClass: string;
  tier: string;
  isPopular: boolean;
  isActive: boolean;
  price: {
    monthly: string;
  };
  featuresText: string;
};

export interface PackageStats {
  totalCount: number;
  activeCount: number;
  totalUsers: number;
  totalRevenue: number;
  mostPopularName: string;
  mostPopularCount: number;
}

export interface PackageStatsProps {
  packages: Package[];
  formatNumber: (num: number) => string;
}

export interface PackageListProps {
  packages: Package[];
  loading?: boolean;
  error?: string | null;
  setEditingPackage: (pkg: Package | null) => void;
  setShowCreateModal: (show: boolean) => void;
  reset: (values: PackageFormData) => void;
  formatNumber: (num: number) => string;
  onDeleteSuccess?: () => void;
}

export interface PackageModalProps {
  isOpen: boolean;
  setShowCreateModal: (show: boolean) => void;
  editingPackage: Package | null;
  setEditingPackage: (pkg: Package | null) => void;
  reset: (values: PackageFormData) => void;
  handleSubmit: any;
  onSuccess: () => void;
  register: any;
  errors: any;
  isSubmitting: boolean;
  setValue: any;
}

export interface SubscriptionPackageFeature {
  _id?: string;
  packageId?: string;
  name: string;
  description?: string;
  included?: boolean;
  sortOrder?: number;
}

export interface SubscriptionPackageItem {
  _id: string;
  id?: string;
  name: string;
  slug?: string;
  price: number | string;
  duration?: string;
  popular?: boolean;
  isPopular?: boolean;
  features?: (SubscriptionPackageFeature | string)[];
}

export interface SubscriptionPackagesProps {
  children?: React.ReactNode;
}

export interface PackagesGridProps {
  packages: SubscriptionPackageItem[];
}
