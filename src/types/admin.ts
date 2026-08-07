export interface AdminDashboardAdminProps {
  usersCount: number;
  publishedBlogsCount: number;
  openTicketsCount: number;
  monthlyIncome?: number;
}

export interface AdminHeaderProps {
  username?: string;
  role?: string;
  avatar?: string;
  newTicketsCount?: number;
}

export interface MonthlyIncomeCardProps {
  income: number;
}

export interface StatusMapItem {
  text: string;
  bg: string;
  dot: string;
}

export interface RoleMapItem {
  text: string;
  bg: string;
}

export interface AdminStatsOverviewProps {
  usersCount: number;
  publishedBlogsCount: number;
  openTicketsCount: number;
  monthlyIncome?: number;
}

export interface RecentUserItem {
  _id: string | any;
  username: string;
  email?: string;
  fullName?: string;
  role: string;
  status: string;
  createdAt: string | Date;
}

export interface RecentUsersProps {
  users: RecentUserItem[];
}
