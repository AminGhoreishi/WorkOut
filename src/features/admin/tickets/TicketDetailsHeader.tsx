import { Lock, CheckCircle, Trash2 } from "lucide-react";
import type { TicketDetailsHeaderProps, TicketMutateApiResponse } from "@/types/ticket";
import { showAlert, showConfirm } from "@/utils/alert";
import {
  getStatusBadge,
  getStatusLabel,
  getCategoryBadge,
  getCategoryLabel,
  formatDate,
} from "./ticketHelpers";

export default function TicketDetailsHeader({
  ticketId,
  status,
  category,
  createdAt,
  subject,
  senderName,
  senderEmail,
  setSelectedTicket,
  onRefresh,
}: TicketDetailsHeaderProps) {
  const handleCloseTicket = async (id: string) => {
    const confirmed = await showConfirm({
      title: "بستن تیکت",
      text: "آیا از بستن این تیکت اطمینان دارید؟ در صورت نیاز بعداً می‌توانید دوباره آن را باز کنید.",
      confirmButtonText: "بله، بسته شود",
      icon: "question",
    });

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/ticket/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "closed",
        }),
      });

      const data: TicketMutateApiResponse = await res.json().catch(() => ({}));

      if (res.ok && data.ticket) {
        setSelectedTicket(data.ticket);
        showAlert({
          title: "موفقیت",
          text: "تیکت با موفقیت بسته شد.",
          icon: "success",
        });
      } else {
        throw new Error(data.message || "خطا در بستن تیکت");
      }
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : "عملیات با خطا مواجه شد";
      showAlert({
        title: "خطا",
        text: errMessage,
        icon: "error",
      });
    }
  };

  const handleReopenTicket = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/ticket/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "pending",
        }),
      });

      const data: TicketMutateApiResponse = await res.json().catch(() => ({}));

      if (res.ok && data.ticket) {
        setSelectedTicket(data.ticket);
        showAlert({
          title: "موفقیت",
          text: "تیکت با موفقیت بازگشایی شد.",
          icon: "success",
        });
      } else {
        throw new Error(data.message || "خطا در بازگشایی تیکت");
      }
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : "عملیات با خطا مواجه شد";
      showAlert({
        title: "خطا",
        text: errMessage,
        icon: "error",
      });
    }
  };

  const handleDeleteTicket = async (id: string) => {
    const confirmed = await showConfirm({
      title: "حذف تیکت",
      text: "آیا از حذف این تیکت پشتیبانی اطمینان دارید؟ این عمل غیرقابل بازگشت است.",
      confirmButtonText: "بله، حذف شود",
      icon: "warning",
    });

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/ticket/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSelectedTicket(null);
        onRefresh?.();
        showAlert({
          title: "حذف شد",
          text: "تیکت با موفقیت حذف شد.",
          icon: "success",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "خطا در حذف تیکت");
      }
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : "حذف تیکت با خطا مواجه شد.";
      showAlert({
        title: "خطا",
        text: errMessage,
        icon: "error",
      });
    }
  };

  return (
    <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-start gap-4">
      <div>
        <div className="flex flex-wrap gap-2 mb-2 items-center">
          <span
            className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${getStatusBadge(status)}`}
          >
            {getStatusLabel(status)}
          </span>
          <span
            className={`px-2 py-0.5 rounded border text-[10px] ${getCategoryBadge(category)}`}
          >
            دسته‌بندی: {getCategoryLabel(category)}
          </span>
          <span className="text-[10px] text-white/40 ss02">
            ثبت: {formatDate(createdAt)}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white line-clamp-1 font-morabbaReg">
          {subject}
        </h3>
        <div className="text-xs text-white/60 mt-1 flex items-center gap-1">
          <span>
            ارسال کننده: {senderName} ({senderEmail || "بدون ایمیل"})
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        {status !== "closed" ? (
          <button
            type="button"
            onClick={() => handleCloseTicket(ticketId)}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 p-2 rounded-lg transition-all text-xs flex items-center gap-1 cursor-pointer"
            title="بستن تیکت"
          >
            <Lock className="w-4 h-4 text-red-400" />
            بستن تیکت
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleReopenTicket(ticketId)}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 p-2 rounded-lg transition-all text-xs flex items-center gap-1 cursor-pointer"
            title="بازگشایی تیکت"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            بازگشایی تیکت
          </button>
        )}
        <button
          type="button"
          onClick={() => handleDeleteTicket(ticketId)}
          className="bg-white/5 hover:bg-red-500/20 border border-white/10 text-red-400 p-2 rounded-lg transition-all cursor-pointer"
          title="حذف تیکت"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
