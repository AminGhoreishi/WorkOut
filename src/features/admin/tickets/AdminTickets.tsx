"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Plus } from "lucide-react";
import type {
  IClientTicket as ITicket,
  ITicketStats as IStats,
  AdminTicketsApiResponse,
} from "@/types/ticket";
import TicketStats from "./TicketStats";
import TicketList from "./TicketList";
import TicketDetails from "./TicketDetails";
import { formatNumber } from "./ticketHelpers";

const fetcher = async (url: string): Promise<AdminTicketsApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت لیست تیکت‌ها");
  }
  return res.json();
};

const initialStats: IStats = {
  totalCount: 0,
  pendingCount: 0,
  answeredCount: 0,
  closedCount: 0,
};

export default function AdminTickets() {
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const url = `/api/admin/ticket?page=${currentPage}&limit=8`;

  const { data, error: swrError, isLoading, mutate } = useSWR<AdminTicketsApiResponse>(
    url,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;
  const stats = data?.stats || initialStats;

  return (
    <div className="overflow-hidden font-danaMed" dir="rtl">
      <div className="container mx-auto pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl max-sm:text-xl font-bold text-white mb-2 font-morabbaReg">
              مدیریت تیکت‌های پشتیبانی
            </h1>
            <p className="text-white/60 max-sm:text-xs text-sm">
              تیکت‌های ارسالی کاربران را پاسخ داده و مشکلات تمرینی، تغذیه‌ای یا پشتیبانی آن‌ها را برطرف کنید.
            </p>
          </div>

          <Link
            href="/admin/sendTicket"
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer text-sm shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>ارسال تیکت</span>
          </Link>
        </div>

        <TicketStats stats={stats} formatNumber={formatNumber} />

        <TicketList
          tickets={tickets}
          totalPages={totalPages}
          totalItems={total}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          error={swrError}
          onRefresh={() => mutate()}
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
        >
          <TicketDetails
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            onRefresh={() => mutate()}
          />
        </TicketList>
      </div>
    </div>
  );
}
