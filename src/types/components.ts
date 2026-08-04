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

export interface HomeArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  readingTime: string;
  authorName: string;
  authorInitial: string;
  publishDate: string;
}

export interface HomeWorkoutPlanItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  icon: string;
  features: string[];
}

export interface WorkoutPlansProps {
  plans?: HomeWorkoutPlanItem[];
}

export interface HomeTemplateProps {
  articles: HomeArticleItem[];
  stats: HomeStats;
  plans?: HomeWorkoutPlanItem[];
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

export interface UserDropdownProps {
  username?: string;
  avatar?: string;
  email?: string;
  role?: string;
}
