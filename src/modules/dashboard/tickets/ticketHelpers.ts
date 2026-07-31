import { IClientTicket as ITicket } from "@/types/ticket";

export const getStatusBadge = (status: ITicket["status"]) => {
  switch (status) {
    case "pending":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "answered":
      return "bg-amber-500/10 text-amber-300 border-amber-500/20";
    case "closed":
      return "bg-neutral-800 text-neutral-400 border-neutral-700";
    default:
      return "bg-neutral-800 text-neutral-400 border-neutral-700";
  }
};

export const getStatusLabel = (status: ITicket["status"]) => {
  switch (status) {
    case "pending":
      return "در انتظار پاسخ مربی";
    case "answered":
      return "پاسخ داده شده";
    case "closed":
      return "بسته شده";
    default:
      return status;
  }
};

export const getCategoryBadge = (category: ITicket["category"]) => {
  switch (category) {
    case "workout":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "nutrition":
      return "bg-amber-500/10 text-amber-300 border-amber-500/20";
    case "form_check":
      return "bg-amber-500/15 text-amber-400 border-amber-500/25";
    case "injury":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "technical":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    default:
      return "bg-white/5 text-neutral-400 border-white/10";
  }
};

export const getCategoryLabel = (category: ITicket["category"]) => {
  switch (category) {
    case "workout":
      return "سوال تمرینی";
    case "nutrition":
      return "سوال تغذیه";
    case "form_check":
      return "بررسی فرم حرکت";
    case "injury":
      return "درد یا آسیب";
    case "technical":
      return "مشکل سایت";
    default:
      return category;
  }
};
