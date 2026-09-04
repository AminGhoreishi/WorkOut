"use client";

import { useState } from "react";
import {
  MessageSquare,
  Send,
  CheckCircle2,
  RotateCcw,
  Trash2,
  User,
  ShieldCheck,
  Video,
} from "lucide-react";
import type { TicketChatPanelProps } from "@/types/ticket";
import { showAlert, showConfirm } from "@/utils/alert";

export default function TicketChatPanel({
  ticket,
  mutate,
  onTicketDeleted,
  onCloseTicket,
  onReopenTicket,
  onDeleteTicket,
  onSendMessage,
}: TicketChatPanelProps) {
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!ticket) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 min-h-[580px] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <MessageSquare className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white mb-1 font-morabbaReg">
            تیکتی انتخاب نشده است
          </h3>
          <p className="text-xs text-white/50 max-w-sm leading-relaxed">
            از لیست سمت راست یک تیکت را انتخاب کنید تا متن کامل گفتگو و گزینه‌های پاسخگویی نمایش داده شوند.
          </p>
        </div>
      </div>
    );
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !ticket) return;

    if (onSendMessage) {
      onSendMessage(ticket._id, replyText.trim());
      setReplyText("");
      return;
    }

    try {
      setIsSending(true);
      const res = await fetch(`/api/admin/ticket/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageText: replyText.trim() }),
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(resData.message || "خطا در ارسال پیام");
      }

      setReplyText("");
      if (resData.ticket) {
        mutate(
          (current) => {
            if (!current) return current;
            return {
              ...current,
              tickets: current.tickets.map((t) =>
                t._id === ticket._id ? resData.ticket : t
              ),
            };
          },
          true
        );
      } else {
        await mutate();
      }
    } catch (err: any) {
      showAlert("خطا", err.message || "ارسال پیام با مشکل مواجه شد.", "error");
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = async () => {
    if (!ticket) return;
    if (onCloseTicket) {
      onCloseTicket(ticket._id);
      return;
    }

    const confirmed = await showConfirm(
      "بستن تیکت",
      "آیا از بستن این تیکت اطمینان دارید؟",
      "بله، بسته شود"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/ticket/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "closed" }),
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(resData.message || "خطا در بستن تیکت");
      }

      await mutate();
      showAlert("موفقیت", "تیکت با موفقیت بسته شد.", "success");
    } catch (err: any) {
      showAlert("خطا", err.message || "عملیات با خطا مواجه شد.", "error");
    }
  };

  const handleReopen = async () => {
    if (!ticket) return;
    if (onReopenTicket) {
      onReopenTicket(ticket._id);
      return;
    }

    try {
      const res = await fetch(`/api/admin/ticket/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "pending" }),
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(resData.message || "خطا در بازگشایی تیکت");
      }

      await mutate();
      showAlert("موفقیت", "تیکت مجدداً بازگشایی شد.", "success");
    } catch (err: any) {
      showAlert("خطا", err.message || "عملیات با خطا مواجه شد.", "error");
    }
  };

  const handleDelete = async () => {
    if (!ticket) return;
    if (onDeleteTicket) {
      onDeleteTicket(ticket._id);
      return;
    }

    const confirmed = await showConfirm(
      "حذف تیکت",
      "آیا از حذف این تیکت اطمینان دارید؟ این عمل غیرقابل بازگشت است.",
      "بله، حذف شود",
      "warning",
      "#ef4444"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/ticket/${ticket._id}`, {
        method: "DELETE",
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(resData.message || "خطا در حذف تیکت");
      }

      onTicketDeleted?.(ticket._id);
      await mutate();
      showAlert("موفقیت", "تیکت با موفقیت حذف شد.", "success");
    } catch (err: any) {
      showAlert("خطا", err.message || "حذف تیکت با خطا مواجه شد.", "error");
    }
  };

  const isClosed = ticket.status === "closed";

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col min-h-[580px] overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-black/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 font-bold text-sm">
            {ticket.userId?.fullName ? ticket.userId.fullName[0] : ticket.userId?.username ? ticket.userId.username[0] : "ک"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-morabbaReg">
                {ticket.userId?.fullName || ticket.userId?.username || "کاربر"}
              </h3>
              <span className="text-[11px] text-white/40">
                @{ticket.userId?.username || "user"}
              </span>
            </div>
            <p className="text-xs text-white/60 line-clamp-1 mt-0.5">
              {ticket.subject}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {isClosed ? (
            <button
              type="button"
              onClick={handleReopen}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>بازگشایی تیکت</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleClose}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>بستن تیکت</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDelete}
            className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs transition-colors cursor-pointer"
            title="حذف تیکت"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar max-h-[440px]">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50 pb-2 border-b border-white/5">
            <span className="font-semibold text-amber-400">موضوع و شرح درخواست:</span>
            <span className="ss02 text-[11px]">
              {new Date(ticket.createdAt).toLocaleString("fa-IR")}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
            {ticket.description}
          </p>

          {ticket.videoUrl && (
            <div className="mt-3 p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <Video className="w-4 h-4 text-purple-400" />
                <span>فایل ویدیویی ارسالی کاربر</span>
              </div>
              <a
                href={ticket.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-400 hover:underline"
              >
                مشاهده ویدیو
              </a>
            </div>
          )}
        </div>

        {ticket.messages && ticket.messages.length > 0 && (
          <div className="space-y-3 pt-2">
            {ticket.messages.map((msg) => {
              const isCoach =
                typeof msg.senderId === "string"
                  ? msg.senderId.includes("coach") || msg.senderId.includes("admin")
                  : msg.senderId?.role === "admin" || msg.senderId?.role === "coach";

              return (
                <div
                  key={msg._id}
                  className={`flex gap-3 max-w-[85%] ${
                    isCoach ? "mr-auto flex-row-reverse" : "ml-auto"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      isCoach
                        ? "bg-amber-400 text-neutral-950 shadow-md"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {isCoach ? (
                      <ShieldCheck className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1 ${
                      isCoach
                        ? "bg-gradient-to-br from-amber-500/20 via-amber-400/15 to-transparent border border-amber-400/30 text-white rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 text-[10px] text-white/40 pb-1">
                      <span className="font-semibold text-white/70">
                        {msg.senderName}
                      </span>
                      <span className="ss02">
                        {new Date(msg.createdAt).toLocaleTimeString("fa-IR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-black/30">
        {isClosed ? (
          <div className="text-center py-3 text-xs text-white/40 bg-white/5 rounded-xl border border-white/10">
            این تیکت بسته شده است. برای ارسال پیام، ابتدا آن را بازگشایی کنید.
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-3">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={3}
              placeholder="پاسخ مربی / پشتیبان را بنویسید..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400 resize-none transition-colors"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!replyText.trim() || isSending}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? "در حال ارسال..." : "ارسال پاسخ"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
