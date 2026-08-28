"use client";

import { memo } from "react";
import { MessageCircle, RefreshCw } from "lucide-react";
import type { TicketListProps } from "@/types/ticket";
import {
  getStatusBadge,
  getStatusLabel,
  getCategoryBadge,
  getCategoryLabel,
  formatDate,
} from "./ticketHelpers";
import Pagination from "@/components/common/Pagination";

const TicketList = memo(function TicketList({
  children,
  selectedTicket,
  setSelectedTicket,
  tickets,
  totalPages,
  totalItems,
  currentPage,
  setCurrentPage,
  isLoading,
  error,
  onRefresh,
}: TicketListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-danaMed">
      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-lg font-morabbaReg">لیست تیکت‌ها</h2>
          <button
            type="button"
            onClick={onRefresh}
            className="p-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="بروزرسانی"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {isLoading && tickets.length === 0 ? (
          <div className="p-12 text-center text-white/50 bg-white/5 border border-white/10 rounded-xl text-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              در حال بارگذاری تیکت‌ها...
            </div>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-400 bg-white/5 border border-white/10 rounded-xl text-sm">
            {error.message || "دریافت اطلاعات با خطا مواجه شد"}
          </div>
        ) : tickets.length === 0 ? (
          <div className="p-12 text-center text-white/40 bg-white/5 border border-white/10 rounded-xl text-sm">
            <MessageCircle className="w-12 h-12 mx-auto opacity-20 mb-3" />
            تیکتی یافت نشد.
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => {
              const isSelected = selectedTicket?._id === t._id;
              return (
                <div
                  key={t._id}
                  onClick={() => setSelectedTicket(t)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-3 ${ isSelected ? "bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-amber-400 text-white shadow-lg" : "bg-white/5 border-white/10 text-white hover:bg-white/10" }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-sm line-clamp-1">
                      {t.subject}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded border text-[10px] ${getCategoryBadge(t.category)}`}
                    >
                      {getCategoryLabel(t.category)}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-white/50 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-amber-500/10 rounded-full flex items-center justify-center text-[10px] text-amber-400 font-bold">
                        {t.userId?.username?.charAt(0)?.toUpperCase() || "👤"}
                      </div>
                      <span>
                        {t.userId?.fullName ||
                          t.userId?.username ||
                          "کاربر ناشناس"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full border text-[9px] font-semibold ${getStatusBadge(t.status)}`}
                      >
                        {getStatusLabel(t.status)}
                      </span>
                      <span className="ss02">
                        {formatDate(t.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {totalPages > 1 && (
              <div className="pt-2">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  pageSize={8}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {children}
    </div>
  );
});

export default TicketList;
