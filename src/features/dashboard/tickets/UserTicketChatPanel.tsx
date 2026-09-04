"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Send,
  User,
  ShieldCheck,
  Video,
  ArrowRight,
  MessageSquareOff,
  Lock,
} from "lucide-react";
import type { UserTicketChatPanelProps } from "@/types/ticket";
import { showAlert } from "@/utils/alert";
import TicketChatEmptyState from "./TicketChatEmptyState";
import {
  getStatusBadge,
  getStatusLabel,
  getCategoryBadge,
  getCategoryLabel,
  isVideo,
} from "./ticketHelpers";

export default function UserTicketChatPanel({
  ticket,
  onBackToList,
  onTicketUpdated,
  chatEndRef,
}: UserTicketChatPanelProps) {
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!ticket) {
    return <TicketChatEmptyState />;
  }

  const isCoachMessage = ticket.initiatedBy === "coach";
  const isClosed = ticket.status === "closed";

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = replyText.trim();
    if (!trimmed || !ticket || isSending || isCoachMessage || isClosed) return;

    try {
      setIsSending(true);
      const res = await fetch("/api/user/ticket", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: ticket._id,
          messageText: trimmed,
        }),
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(resData.message || "خطا در ارسال پیام");
      }

      setReplyText("");
      if (onTicketUpdated) {
        onTicketUpdated();
      }
    } catch (err: unknown) {
      showAlert("خطا", (err as Error).message || "ارسال پیام با مشکل مواجه شد.", "error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col min-h-[580px] overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-black/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          {onBackToList && (
            <button
              type="button"
              onClick={onBackToList}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-amber-400 hover:bg-white/10 cursor-pointer transition-colors"
              title="بازگشت به لیست"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 font-bold text-sm">
            {isCoachMessage ? (
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            ) : (
              <User className="w-5 h-5 text-amber-400" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-morabbaReg line-clamp-1">
                {ticket.subject}
              </h3>
              {isCoachMessage && (
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold shrink-0">
                  پیام مربی
                </span>
              )}
            </div>
            <p className="text-xs text-white/60 mt-0.5">
              {isCoachMessage ? (ticket.coachId?.fullName || "مربی استار فیت") : "درخواست من"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span
            className={`px-2.5 py-1 rounded-lg border text-[10px] font-medium ${getCategoryBadge(
              ticket.category
            )}`}
          >
            {getCategoryLabel(ticket.category)}
          </span>
          <span
            className={`px-2.5 py-1 rounded-lg border text-[10px] font-semibold ${getStatusBadge(
              ticket.status
            )}`}
          >
            {getStatusLabel(ticket.status)}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar max-h-[440px]">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50 pb-2 border-b border-white/5">
            <span className="font-semibold text-amber-400">
              {isCoachMessage ? "پیام ارسال شده از مربی:" : "موضوع و شرح درخواست شما:"}
            </span>
            <span className="ss02 text-[11px]">
              {new Date(ticket.createdAt).toLocaleString("fa-IR")}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
            {ticket.description}
          </p>

          {ticket.videoUrl && (
            <div className="mt-3 p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <Video className="w-4 h-4 text-purple-400" />
                <span>فایل ویدیویی یا تصویر پیوست</span>
              </div>
              {isVideo(ticket.videoUrl) ? (
                <video
                  src={ticket.videoUrl}
                  controls
                  className="w-full max-h-56 rounded-lg bg-black object-contain"
                />
              ) : (
                <a
                  href={ticket.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block relative rounded-lg overflow-hidden group max-w-sm"
                >
                  <Image
                    src={ticket.videoUrl}
                    alt="پیوست تیکت"
                    width={400}
                    height={260}
                    className="w-full h-auto max-h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white">
                    مشاهده اندازه کامل
                  </div>
                </a>
              )}
            </div>
          )}
        </div>

        {ticket.messages && ticket.messages.length > 0 && (
          <div className="space-y-3 pt-2">
            {ticket.messages.map((msg) => {
              const sender = msg.senderId as { role?: string } | null;
              const isSupport =
                typeof msg.senderId === "object" && msg.senderId !== null
                  ? sender?.role === "admin" || sender?.role === "coach"
                  : true;

              return (
                <div
                  key={msg._id}
                  className={`flex gap-3 max-w-[85%] ${
                    isSupport ? "mr-auto flex-row-reverse" : "ml-auto"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      isSupport
                        ? "bg-amber-400 text-neutral-950 shadow-md"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {isSupport ? (
                      <ShieldCheck className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1 ${
                      isSupport
                        ? "bg-gradient-to-br from-amber-500/20 via-amber-400/15 to-transparent border border-amber-400/30 text-white rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 text-[10px] text-white/40 pb-1">
                      <span className="font-semibold text-white/70">
                        {isSupport
                          ? isCoachMessage
                            ? "مربی استار فیت"
                            : "پشتیبان استار فیت"
                          : "شما"}
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
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-white/10 bg-black/30">
        {isCoachMessage ? (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center text-amber-400 text-xs flex items-center justify-center gap-2">
            <MessageSquareOff className="w-4 h-4 text-amber-400" />
            این پیام از طرف مربی ارسال شده است و امکان ارسال پاسخ برای آن وجود ندارد.
          </div>
        ) : isClosed ? (
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center text-white/40 text-xs flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            این تیکت پشتیبانی بسته شده است. در صورت نیاز تیکت جدیدی ایجاد کنید.
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-3">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={3}
              placeholder="پاسخ خود را بنویسید..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400 resize-none transition-colors"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
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
