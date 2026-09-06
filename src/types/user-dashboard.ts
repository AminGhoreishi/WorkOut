export interface DashboardUser {
  name: string;
  avatar: string;
  email: string;
  level: string;
  joinDate: string;
  coachName: string;
}

export interface DashboardSubscription {
  packageName: string;
  status: string;
  daysRemaining: number;
  totalDays: number;
  endDate: string;
  nextPayment: string;
}

export interface DashboardWorkoutDay {
  day: string;
  type: string;
  duration: string;
  done: boolean;
  sets: number;
}

export interface DashboardTicket {
  id: string;
  subject: string;
  status: string;
  rawStatus: string;
  time: string;
}

export interface DashboardWishlistItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  views: number;
}

export interface UserDashboardProps {
  initialUser: DashboardUser;
  initialSubscription: DashboardSubscription | null;
  initialWorkouts: DashboardWorkoutDay[];
  initialTickets: DashboardTicket[];
  initialWishlist?: DashboardWishlistItem[];
}

export interface WeeklyWorkoutsProps {
  recentWorkouts: DashboardWorkoutDay[];
}

export interface RecentTicketsProps {
  recentTickets: DashboardTicket[];
}

export interface DashboardBannerProps {
  userName: string;
  todayWorkout: {
    type: string;
    duration: string;
  } | null;
}

export interface ActiveSubscriptionProps {
  subscription: DashboardSubscription | null;
  coachName: string;
}

export interface WishlistArticlesProps {
  wishlist: DashboardWishlistItem[];
}

export interface RawDbUser {
  _id?: unknown;
  fullName?: string;
  username?: string;
  email?: string;
  role?: string;
  createdAt?: string | Date;
}

export interface RawDbSubscription {
  _id?: unknown;
  startsAt?: string | Date;
  endsAt?: string | Date;
  status?: string;
  packageId?: {
    _id?: unknown;
    name?: string;
    price?: number;
  } | null;
  coachId?: {
    fullName?: string;
  } | null;
}

export interface RawDbTicket {
  _id: { toString(): string } | string;
  subject?: string;
  status?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface RawDbWishlist {
  blogId?: {
    _id?: { toString(): string } | string;
    title?: string;
    slug?: string;
    image?: string;
    category?: string;
    views?: number;
  } | null;
}

