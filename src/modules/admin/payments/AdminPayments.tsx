"use client";

import { useState } from "react";
import useSWR from "swr";
import {
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  Wallet,
  Search,
  Check,
  X,
  Copy,
  Loader2,
  User,
  Package as PackageIcon,
  Calendar,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Filter,
} from "lucide-react";
import type {
  AdminPaymentItem,
  AdminPaymentsApiResponse,
  AdminPaymentsProps,
} from "@/types/admin-payments";

const fetcher = async (url: string): Promise<AdminPaymentsApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت اطلاعات پرداخت‌ها");
  }
  return res.json();
};

export default function AdminPayments({ initialStats }: AdminPaymentsProps) {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const apiUrl = `/api/admin/payments?status=${activeTab}&search=${encodeURIComponent(
    searchQuery
  )}&page=${page}&limit=10`;

  const { data, error, isLoading, mutate } = useSWR<AdminPaymentsApiResponse>(
    apiUrl,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("fa-IR").format(num || 0);
  };

  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedRef(text);
      setTimeout(() => setCopiedRef(null), 2000);
    } catch {
      setCopiedRef(null);
    }
  };

  const handleUpdateStatus = async (
    orderId: string,
    action: "approve" | "reject"
  ) => {
    setProcessingId(orderId);
    setActionMessage(null);

    try {
      const res = await fetch("/api/admin/payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          action,
        }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setActionMessage({
          text: result.message || "خطا در تغییر وضعیت پرداخت",
          type: "error",
        });
        setProcessingId(null);
        return;
      }

      setActionMessage({
        text:
          action === "approve"
            ? "پرداخت با موفقیت تایید شد و اشتراک کاربر فعال گردید."
            : "پرداخت با موفقیت رد شد.",
        type: "success",
      });

      setProcessingId(null);
      mutate();
    } catch {
      setActionMessage({
        text: "خطای غیرمنتظره در ارتباط با سرور",
        type: "error",
      });
      setProcessingId(null);
    }
  };

  const stats = data?.stats || initialStats || {
    pendingCount: 0,
    paidCount: 0,
    failedCount: 0,
    totalAmount: 0,
  };

  const orders = data?.orders || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div
      className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-zinc-950 text-amber-50 min-h-screen font-danaMed"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-amber-500/20">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent"
            style={{ fontFamily: "Marbeh, sans-serif" }}
          >
            مدیریت و تایید پرداخت‌های کارت به کارت
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            بررسی، تایید آنلاین یا رد واریزی‌های ثبت‌شده توسط کاربران استار فیت
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full text-xs text-amber-300">
          <CreditCard className="w-4 h-4 text-amber-400" />
          <span>پنل مدیریت مالی</span>
        </div>
      </div>

      {actionMessage && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-all ${
            actionMessage.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border border-red-500/30 text-red-300"
          }`}
        >
          <span>{actionMessage.text}</span>
          <button
            onClick={() => setActionMessage(null)}
            className="text-zinc-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-amber-950/30 border border-amber-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs text-amber-300/80 font-medium block mb-1">
                در انتظار تایید
              </span>
              <span
                className="text-2xl sm:text-3xl font-extrabold text-amber-300"
                style={{ fontFamily: "Marbeh, sans-serif" }}
              >
                {formatNumber(stats.pendingCount)}
              </span>
            </div>
            <div className="w-12 h-12 bg-amber-500/20 rounded-2xl border border-amber-500/30 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-emerald-950/30 border border-emerald-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs text-emerald-300/80 font-medium block mb-1">
                تایید شده
              </span>
              <span
                className="text-2xl sm:text-3xl font-extrabold text-emerald-400"
                style={{ fontFamily: "Marbeh, sans-serif" }}
              >
                {formatNumber(stats.paidCount)}
              </span>
            </div>
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-red-950/30 border border-red-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs text-red-300/80 font-medium block mb-1">
                رد شده
              </span>
              <span
                className="text-2xl sm:text-3xl font-extrabold text-red-400"
                style={{ fontFamily: "Marbeh, sans-serif" }}
              >
                {formatNumber(stats.failedCount)}
              </span>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-2xl border border-red-500/30 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-900 border border-amber-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs text-zinc-400 font-medium block mb-1">
                مجموع پرداختی‌های تایید شده
              </span>
              <span
                className="text-lg sm:text-xl font-extrabold text-amber-200"
                style={{ fontFamily: "Marbeh, sans-serif" }}
              >
                {formatNumber(stats.totalAmount)} تومان
              </span>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-zinc-900/60 p-3 sm:p-4 rounded-2xl border border-amber-500/20">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-amber-400 shrink-0 hidden sm:block" />
          {[
            { id: "pending", label: "در انتظار تایید", count: stats.pendingCount },
            { id: "paid", label: "تایید شده", count: stats.paidCount },
            { id: "failed", label: "رد شده", count: stats.failedCount },
            { id: "all", label: "همه پرداخت‌ها", count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setPage(1);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 shadow-md shadow-amber-500/20"
                  : "bg-black/40 text-zinc-400 hover:text-amber-200 hover:bg-black/60"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/30">
                  {formatNumber(tab.count)}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="جستجو نام، ایمیل، تلفن یا شماره پیگیری..."
            className="w-full bg-black/60 border border-amber-500/20 rounded-xl pr-10 pl-4 py-2 text-xs sm:text-sm text-amber-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      <div className="bg-zinc-900/80 border border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <p className="text-xs text-zinc-400">در حال دریافت لیست پرداخت‌ها...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <p className="text-xs text-red-300">خطا در دریافت لیست پرداخت‌ها</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <CreditCard className="w-10 h-10 text-zinc-600 mx-auto" />
            <p className="text-sm font-semibold text-zinc-400">
              هیچ پرداختی در این بخش یافت نشد
            </p>
          </div>
        ) : (
          <div className="divide-y divide-amber-500/10">
            {orders.map((order: AdminPaymentItem) => {
              const isProcessing = processingId === order._id;
              const userObj = order.userId;
              const pkgObj = order.packageId;

              return (
                <div
                  key={order._id}
                  className="p-5 sm:p-6 hover:bg-white/[0.02] transition-colors flex flex-col lg:flex-row justify-between lg:items-center gap-6"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                        <User className="w-4.5 h-4.5 text-amber-400" />
                      </div>
                      <div>
                        <div className="font-bold text-amber-100 text-sm sm:text-base">
                          {userObj?.fullName || userObj?.username || "کاربر استار فیت"}
                        </div>
                        <div className="text-xs text-zinc-400 flex flex-wrap items-center gap-2 mt-0.5">
                          {userObj?.phone && <span>{userObj.phone}</span>}
                          {userObj?.email && (
                            <>
                              <span>•</span>
                              <span>{userObj.email}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mr-auto shrink-0">
                        {order.status === "pending" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                            در انتظار تایید
                          </span>
                        )}
                        {order.status === "paid" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            تایید شده
                          </span>
                        )}
                        {order.status === "failed" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30">
                            <XCircle className="w-3.5 h-3.5" />
                            رد شده
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-zinc-300">
                      <div className="bg-black/40 border border-amber-500/10 rounded-xl p-2.5">
                        <span className="text-zinc-500 block text-[11px] mb-1">
                          پکیج انتخابی
                        </span>
                        <span className="font-semibold text-amber-200">
                          {pkgObj?.name || "پکیج اختصاصی"}
                        </span>
                      </div>

                      <div className="bg-black/40 border border-amber-500/10 rounded-xl p-2.5">
                        <span className="text-zinc-500 block text-[11px] mb-1">
                          مبلغ واریزی
                        </span>
                        <span className="font-bold text-emerald-400">
                          {formatNumber(order.amountPaid)} تومان
                        </span>
                      </div>

                      <div className="bg-black/40 border border-amber-500/10 rounded-xl p-2.5">
                        <span className="text-zinc-500 block text-[11px] mb-1">
                          تاریخ ثبت
                        </span>
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>

                    {order.paymentRef && (
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-amber-300 font-medium">
                            کد پیگیری / شناسه واریز:
                          </span>
                          <span className="font-mono font-bold text-amber-200 dir-ltr text-sm select-all">
                            {order.paymentRef}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(order.paymentRef!)}
                          className="p-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg transition-colors flex items-center gap-1 text-xs cursor-pointer"
                        >
                          {copiedRef === order.paymentRef ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">کپی شد</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>کپی</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-amber-500/10 shrink-0">
                    {order.status !== "paid" && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order._id, "approve")}
                        disabled={isProcessing}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-600/20"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                        <span>تایید پرداخت</span>
                      </button>
                    )}

                    {order.status !== "failed" && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order._id, "reject")}
                        disabled={isProcessing}
                        className="bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        <span>رد پرداخت</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="p-4 bg-black/40 border-t border-amber-500/10 flex justify-between items-center text-xs text-zinc-400">
            <span>
              صفحه {formatNumber(page)} از {formatNumber(totalPages)}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
