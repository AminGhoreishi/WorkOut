export const formatDate = (dateVal?: Date | string) => {
  if (!dateVal) return "";
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  } catch {
    return String(dateVal);
  }
};

export const getCycleLabel = (cycle?: string) => {
  if (!cycle) return "نامشخص";
  switch (cycle) {
    case "monthly":
      return "ماهانه (۳۰ روزه)";
    case "quarterly":
      return "سه ماهه (۹۰ روزه)";
    case "biannual":
      return "شش ماهه (۱۸۰ روزه)";
    default:
      return cycle;
  }
};

export const getStatusBadge = (status?: string) => {
  switch (status) {
    case "active":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          فعال
        </span>
      );
    case "trial":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          دوره آزمایشی
        </span>
      );
    case "expired":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
          منقضی شده
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
          لغو شده
        </span>
      );
    default:
      return null;
  }
};
