"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import PaymentActionAlert from "./PaymentActionAlert";
import PaymentStats from "./PaymentStats";
import PaymentTable from "./PaymentTable";
import type {
  AdminPaymentStats,
  AdminPaymentsProps,
  PaymentActionMessage,
} from "@/types/admin-payments";

export default function AdminPayments({
  initialStats,
  initialData,
}: AdminPaymentsProps) {
  const [actionMessage, setActionMessage] =
    useState<PaymentActionMessage | null>(null);
  const [stats, setStats] = useState<AdminPaymentStats>(
    initialData?.stats ||
      initialStats || {
        pendingCount: 0,
        paidCount: 0,
        failedCount: 0,
        totalAmount: 0,
      }
  );

  return (
    <div
      className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-zinc-950 text-amber-50 min-h-screen font-danaMed"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-amber-500/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
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

      <PaymentActionAlert
        message={actionMessage}
        onClose={() => setActionMessage(null)}
      />

      <PaymentStats stats={stats} />

      <PaymentTable
        stats={stats}
        initialData={initialData}
        onStatsUpdate={setStats}
        onActionMessage={setActionMessage}
      />
    </div>
  );
}
