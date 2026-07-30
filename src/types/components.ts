export interface BreadcrumbProps {
  packageName: string;
}

export interface FeatureItem {
  name: string;
  description?: string;
  included: boolean;
}

export interface PackageFeaturesProps {
  features: FeatureItem[];
}

export interface PricePriceObj {
  monthly: number;
  quarterly: number;
  biannual: number;
}

export interface PriceCardProps {
  price: PricePriceObj;
  originalPrice: PricePriceObj;
}

export interface PackageStatsProps {
  studentCount: number;
  rating: number;
  reviewCount: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export interface HomeStats {
  todayUsersCount: string;
  trendText: string;
}

export interface HomeTemplateProps {
  articles: any[];
  stats: HomeStats;
}

export interface HeaderSessionUser {
  id?: string;
  username?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface HeaderSession {
  user: HeaderSessionUser;
}

export interface HeaderProps {
  session?: HeaderSession | null;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  session?: HeaderSession | null;
  getLinkClass: (href: string) => string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
