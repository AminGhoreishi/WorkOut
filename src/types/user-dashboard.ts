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
