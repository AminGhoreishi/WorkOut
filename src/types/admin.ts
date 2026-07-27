export interface AdminDashboardAdminProps {
  usersCount: number;
  publishedBlogsCount: number;
  openTicketsCount: number;
}

export interface AdminHeaderProps {
  username?: string;
  role?: string;
  avatar?: string;
  newTicketsCount?: number;
}
