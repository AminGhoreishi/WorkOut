"use client";

import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { Plus, ArrowRight, RefreshCw } from "lucide-react";
import type { IClientTicket, UserTicketsApiResponse } from "@/types/ticket";
import UserTicketChat from "./UserTicketChat";
import UserTicketForm from "./UserTicketForm";

const fetcher = async (url: string): Promise<UserTicketsApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || "خطا در دریافت لیست تیکت‌ها",
    );
  }
  return res.json();
};

export default function UserTickets() {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    data,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<UserTicketsApiResponse>("/api/user/ticket", fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });

  const tickets = data?.tickets || [];
  const selectedTicket = tickets.find((t) => t._id === selectedTicketId) || null;

  useEffect(() => {
    if (selectedTicket?.messages) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTicket?.messages?.length]);

  const handleTicketCreated = (newTicketId: string) => {
    setSelectedTicketId(newTicketId);
    setShowCreateForm(false);
    mutate();
  };

  const handleSelectTicket = (ticket: IClientTicket | null) => {
    setSelectedTicketId(ticket ? ticket._id : null);
  };

  return (
    <div
      className="min-h-screen bg-neutral-950 p-4 md:p-8 font-danaMed text-white"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-morabbaReg">
              تیکت‌های پشتیبانی و مشاوره
            </h1>
            <p className="text-neutral-400 text-sm">
              سوالات بدنسازی، برنامه‌های ورزشی یا مشکلات فنی خود را با مربیان و
              کارشناسان در میان بگذارید.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r cursor-pointer from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 px-5 py-3 rounded-xl flex items-center gap-2 transition-all font-bold text-sm shadow-md"
          >
            {showCreateForm ? (
              <>
                <ArrowRight className="w-4 h-4" />
                بازگشت به گفتگوها
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                ثبت تیکت جدید
              </>
            )}
          </button>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-neutral-400 bg-white/[0.03] border border-amber-500/15 rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            در حال بارگذاری اطلاعات تیکت‌ها...
          </div>
        ) : swrError ? (
          <div className="p-12 text-center text-amber-400 bg-white/[0.03] border border-amber-500/15 rounded-2xl flex flex-col items-center justify-center gap-4">
            <p>{swrError.message || "بارگذاری تیکت‌ها با خطا مواجه شد."}</p>
            <button
              type="button"
              onClick={() => mutate()}
              className="flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-xl text-xs hover:bg-amber-500/30 transition-all cursor-pointer font-bold"
            >
              <RefreshCw className="w-4 h-4" />
              تلاش مجدد
            </button>
          </div>
        ) : showCreateForm ? (
          <UserTicketForm
            setShowCreateForm={setShowCreateForm}
            onTicketCreated={handleTicketCreated}
          />
        ) : (
          <UserTicketChat
            tickets={tickets}
            selectedTicket={selectedTicket}
            setSelectedTicket={handleSelectTicket}
            chatEndRef={chatEndRef}
            onTicketUpdated={() => mutate()}
          />
        )}
      </div>
    </div>
  );
}
