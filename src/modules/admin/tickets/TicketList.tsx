"use client";

import { useState, useEffect, memo } from "react";
import useSWR from "swr";
import { Search, MessageCircle, RefreshCw } from "lucide-react";
import type {
  TicketListProps,
  IClientTicket as ITicket,
  ITicketStats,
} from "@/types/ticket";
import {
  getStatusBadge,
  getStatusLabel,
  getCategoryBadge,
  getCategoryLabel,
} from "./ticketHelpers";
import Pagination from "@/components/AdminPagination";

interface TicketsApiResponse {
  tickets: ITicket[];
  total: number;
  totalPages: number;
  stats?: ITicketStats;
  message?: string;
}

const fetcher = async (url: string): Promise<TicketsApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت لیست تیکت‌ها");
  }
  return res.json();
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("fa-IR");
  } catch {
    return dateStr;
  }
};

const TicketList = memo(function TicketList({
  children,
  selectedTicket,
  setSelectedTicket,
  onStatsUpdate,
}: TicketListProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  let url = `/api/admin/ticket?page=${currentPage}&limit=8`;
  if (statusFilter !== "all") {
    url += `&status=${statusFilter}`;
  }
  if (debouncedSearchQuery.trim()) {
    url += `&search=${encodeURIComponent(debouncedSearchQuery.trim())}`;
  }

  const { data, error: swrError, isLoading, mutate } = useSWR<TicketsApiResponse>(
    url,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 1;
  const stats = data?.stats;

  useEffect(() => {
    if (stats && onStatsUpdate) {
      onStatsUpdate(stats);
    }
  }, [stats, onStatsUpdate]);

  return (
    <>
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6 font-danaMed">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="جستجو در موضوع، متن تیکت یا نام کاربر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pr-12 pl-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 text-sm cursor-pointer"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="pending">در انتظار پاسخ</option>
              <option value="answered">پاسخ داده شده</option>
              <option value="closed">بسته شده</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-danaMed">
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold text-lg font-morabbaReg">لیست تیکت‌ها</h2>
            <button
              type="button"
              onClick={() => mutate()}
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
          ) : swrError ? (
            <div className="p-12 text-center text-red-400 bg-white/5 border border-white/10 rounded-xl text-sm">
              {swrError.message || "دریافت اطلاعات با خطا مواجه شد"}
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
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-3 ${
                      isSelected
                        ? "bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-amber-400 text-white shadow-lg"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    }`}
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
                        <span className="ss02 font-sans">
                          {formatDate(t.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>

        {children}
      </div>
    </>
  );
});

export default TicketList;
