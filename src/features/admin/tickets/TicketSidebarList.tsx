import { Search, MessageSquare } from "lucide-react";
import type { TicketSidebarListProps, TicketFilterOption } from "@/types/ticket";
import Pagination from "@/components/common/Pagination";

const FILTER_OPTIONS: TicketFilterOption[] = [
  { key: "all", label: "همه" },
  { key: "pending", label: "در انتظار" },
  { key: "answered", label: "پاسخ‌داده" },
  { key: "closed", label: "بسته" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "answered":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "closed":
      return "bg-white/10 text-white/50 border-white/20";
    default:
      return "bg-white/10 text-white/50 border-white/20";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "در انتظار پاسخ";
    case "answered":
      return "پاسخ داده شده";
    case "closed":
      return "بسته شده";
    default:
      return status;
  }
};

const getCategoryBadge = (category: string) => {
  switch (category) {
    case "workout":
      return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    case "nutrition":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "form_check":
      return "bg-purple-500/15 text-purple-400 border-purple-500/30";
    case "injury":
      return "bg-red-500/15 text-red-400 border-red-500/30";
    case "technical":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    default:
      return "bg-white/5 text-white/60 border-white/10";
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "workout":
      return "تمرین";
    case "nutrition":
      return "تغذیه";
    case "form_check":
      return "فرم حرکت";
    case "injury":
      return "آسیب / درد";
    case "technical":
      return "پشتیبانی فنی";
    default:
      return category;
  }
};

export default function TicketSidebarList({
  tickets,
  selectedTicket,
  onSelectTicket,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  isLoading,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: TicketSidebarListProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="w-4 h-4 text-white/40 absolute right-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو در موضوع، متن یا نام کاربر..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 transition-colors"
        />
      </div>

      <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => setFilterStatus(opt.key)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              filterStatus === opt.key
                ? "bg-amber-400 text-neutral-950 font-bold shadow"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {isLoading && tickets.length === 0 ? (
        <div className="space-y-2.5">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-white/10 bg-white/5 animate-pulse space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="h-4 bg-white/10 rounded-md w-3/5" />
                <div className="h-4 bg-white/10 rounded-md w-16" />
              </div>
              <div className="h-3 bg-white/10 rounded-md w-4/5" />
              <div className="h-3 bg-white/10 rounded-md w-1/2" />
              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <div className="h-5 bg-white/10 rounded-full w-24" />
                <div className="h-4 bg-white/10 rounded-md w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : tickets.length === 0 ? (
        <div className="p-12 text-center text-white/40 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-2">
          <MessageSquare className="w-8 h-8 mx-auto opacity-30 text-amber-400" />
          <p>هیچ تیکتی با این مشخصات یافت نشد.</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[640px] overflow-y-auto custom-scrollbar pr-1">
          {tickets.map((t) => {
            const isSelected = selectedTicket?._id === t._id;
            return (
              <div
                key={t._id}
                onClick={() => onSelectTicket(t)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2.5 ${
                  isSelected
                    ? "bg-gradient-to-br from-amber-500/20 via-amber-400/10 to-transparent border-amber-400 shadow-xl"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-sm text-white line-clamp-1">
                    {t.subject}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-lg border text-[10px] shrink-0 font-medium ${getCategoryBadge(
                      t.category
                    )}`}
                  >
                    {getCategoryLabel(t.category)}
                  </span>
                </div>

                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {t.description}
                </p>

                <div className="flex justify-between items-center text-[11px] text-white/50 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[10px] text-amber-400 font-bold">
                      {t.userId?.fullName ? t.userId.fullName[0] : t.userId?.username ? t.userId.username[0] : "ک"}
                    </div>
                    <span className="text-white/80 font-medium">
                      {t.userId?.fullName || t.userId?.username || "کاربر"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-md border text-[9px] font-semibold ${getStatusBadge(
                        t.status
                      )}`}
                    >
                      {getStatusLabel(t.status)}
                    </span>
                    <span className="ss02 text-[10px] text-white/40">
                      {new Date(t.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
