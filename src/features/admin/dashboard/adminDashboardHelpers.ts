import type { StatusMapItem, RoleMapItem, AdminDashboardAdminProps } from "@/types/admin";

export const gradients = [
  "from-amber-500/20 to-yellow-600/10 text-amber-300 border-amber-500/30",
  "from-yellow-500/20 to-amber-600/10 text-yellow-300 border-amber-500/30",
  "from-amber-400/20 to-amber-600/10 text-amber-200 border-amber-500/30",
];

export const statusMap: Record<string, StatusMapItem> = {
  active: {
    text: "فعال",
    bg: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
    dot: "bg-amber-400 animate-pulse",
  },
  expired: {
    text: "منقضی شده",
    bg: "bg-neutral-800 text-neutral-400 border border-neutral-700",
    dot: "bg-neutral-500",
  },
  blocked: {
    text: "مسدود شده",
    bg: "bg-red-500/10 text-red-400 border border-red-500/30",
    dot: "bg-red-400",
  },
};

export const roleMap: Record<string, RoleMapItem> = {
  admin: {
    text: "مدیر",
    bg: "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold",
  },
  coach: {
    text: "مربی",
    bg: "bg-yellow-500/10 text-yellow-300 border border-yellow-500/30",
  },
};

export function extractDashboardStats([
  usersRes,
  blogsRes,
  ticketsRes,
  revenueRes,
]: [
  PromiseSettledResult<number>,
  PromiseSettledResult<number>,
  PromiseSettledResult<number>,
  PromiseSettledResult<{ total: number }[]>,
]): AdminDashboardAdminProps {
  return {
    usersCount: usersRes.status === "fulfilled" ? usersRes.value : 0,
    publishedBlogsCount: blogsRes.status === "fulfilled" ? blogsRes.value : 0,
    openTicketsCount: ticketsRes.status === "fulfilled" ? ticketsRes.value : 0,
    monthlyIncome:
      revenueRes.status === "fulfilled" ? revenueRes.value[0]?.total || 0 : 0,
  };
}
