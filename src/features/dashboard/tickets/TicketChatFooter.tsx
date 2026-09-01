import type { TicketChatFooterProps } from "@/types/ticket";
import { Lock, Send, MessageSquareOff } from "lucide-react";

export default function TicketChatFooter({
  selectedTicketStatus,
  isCoachMessage,
  replyText,
  setReplyText,
  sendingReply,
  onSendReply,
}: TicketChatFooterProps) {
  return (
    <div className="p-4 border-t border-white/10 bg-black/40">
      {isCoachMessage ? (
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center text-amber-400 text-xs flex items-center justify-center gap-2">
          <MessageSquareOff className="w-4 h-4 text-amber-400" />
          این پیام از طرف مربی ارسال شده است و امکان ارسال پاسخ برای آن وجود ندارد.
        </div>
      ) : selectedTicketStatus === "closed" ? (
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center text-amber-400 text-xs flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          این تیکت پشتیبانی بسته شده است. در صورت نیاز تیکت جدیدی ایجاد کنید.
        </div>
      ) : (
        <form onSubmit={onSendReply} className="flex gap-2">
          <textarea
            rows={1}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="پاسخ خود را در اینجا بنویسید..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50 resize-none leading-relaxed h-11 min-h-[44px] max-h-24 overflow-y-auto"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSendReply(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!replyText.trim() || sendingReply}
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold hover:opacity-95 w-12 h-11 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="w-4 h-4 rotate-180 text-neutral-950" />
          </button>
        </form>
      )}
    </div>
  );
}
