import type { SubscriptionItem } from "@/types/workout";

export const getStatusBadge = (status: SubscriptionItem["status"]) => {
  const styles: Record<SubscriptionItem["status"], string> = {
    active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    trial: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    expired: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const labels: Record<SubscriptionItem["status"], string> = {
    active: "فعال",
    trial: "تست (Trial)",
    expired: "منقضی شده",
    cancelled: "لغو شده",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full border text-xs sm:text-sm font-medium ${styles[status] || styles.expired}`}
    >
      {labels[status] || status}
    </span>
  );
};
