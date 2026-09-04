import { MessageSquare } from "lucide-react";
import type { TicketChatEmptyStateProps } from "@/types/ticket";

export default function TicketChatEmptyState({
  title = "تیکتی انتخاب نشده است",
  description = "از لیست تیکت‌ها یک مورد را انتخاب کنید تا متن کامل گفتگو و گزینه‌های ارسال پاسخ نمایش داده شوند.",
}: TicketChatEmptyStateProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 min-h-[580px] flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
        <MessageSquare className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-base font-bold text-white mb-1 font-morabbaReg">
          {title}
        </h3>
        <p className="text-xs text-white/50 max-w-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
