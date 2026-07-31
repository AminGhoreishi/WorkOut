import Link from "next/link";
import { ChevronLeft, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

interface TicketItem {
  id: string;
  subject: string;
  status: string;
  rawStatus: string;
  time: string;
}

interface RecentTicketsProps {
  recentTickets: TicketItem[];
}

export default function RecentTickets({ recentTickets }: RecentTicketsProps) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(234,179,8,0.15)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white">تیکت‌های اخیر</h3>
        <Link
          href="/dashboard/tickets"
          className="text-amber-400 text-xs hover:text-amber-300 flex items-center gap-1 font-medium"
        >
          همه تیکت‌ها <ChevronLeft size={14} />
        </Link>
      </div>
      {recentTickets.length > 0 ? (
        <div className="space-y-3">
          {recentTickets.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-amber-500/10 transition-all border border-amber-500/15"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  t.rawStatus === "answered"
                    ? "bg-amber-500/20"
                    : t.rawStatus === "closed"
                      ? "bg-neutral-800"
                      : "bg-amber-500/10"
                }`}
              >
                {t.rawStatus === "answered" ? (
                  <CheckCircle size={14} className="text-amber-400" />
                ) : t.rawStatus === "closed" ? (
                  <CheckCircle size={14} className="text-neutral-400" />
                ) : (
                  <AlertCircle size={14} className="text-amber-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate font-medium">
                  {t.subject}
                </p>
                <p className="text-neutral-400 text-xs mt-0.5">{t.time}</p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium ${
                  t.rawStatus === "answered"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : t.rawStatus === "closed"
                      ? "bg-neutral-800 text-neutral-400 border border-neutral-700"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {t.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-white/40 text-xs">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-white/20" />
          <p>تیکتی ثبت نکرده‌اید</p>
        </div>
      )}
      <Link
        href="/dashboard/tickets"
        className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-amber-400 hover:text-amber-300 border border-amber-500/20 hover:bg-amber-500/10 transition-all font-medium"
      >
        <MessageSquare size={14} />
        ارسال تیکت جدید
      </Link>
    </div>
  );
}
