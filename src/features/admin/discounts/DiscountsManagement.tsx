"use client";

import { useState } from "react";
import useSWR from "swr";
import { Tag, Plus } from "lucide-react";
import type { DiscountItem, DiscountsManagementProps } from "@/types/discount";
import DiscountModal from "./DiscountModal";
import DiscountStats from "./DiscountStats";
import DiscountList from "./DiscountList";

const fetcher = async (url: string): Promise<DiscountItem[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت اطلاعات");
  }
  return res.json();
};

export default function DiscountsManagement({ initialStats }: DiscountsManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const {
    data: discountsData,
    error: discountsError,
    isLoading: isDiscountsLoading,
    mutate: mutateDiscounts,
  } = useSWR<DiscountItem[]>(
    `/api/admin/discount?status=${statusFilter}`,
    fetcher,
    {
      dedupingInterval: 5000,
    },
  );

  return (
    <div className="min-h-screen bg-black/30 md:p-8 font-danaMed" dir="rtl">
      <div className="container mx-auto pt-6 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Tag className="w-6 h-6" />
              </span>
              <h1 className="text-2xl md:text-3xl text-white font-morabbaReg font-bold">
                مدیریت کدهای تخفیف
              </h1>
            </div>
            <p className="text-white/60 text-sm">
              ایجاد، پایش و پیکربندی کدهای تخفیف، درصدها و محدودیت‌های اعمال در سیستم استار فیت
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer text-sm"
          >
            <Plus className="w-5 h-5" />
            افزودن کد تخفیف جدید
          </button>
        </div>

        <DiscountStats stats={initialStats} />

        <DiscountList
          discounts={discountsData || []}
          setStatusFilter={setStatusFilter}
          loading={isDiscountsLoading}
          error={discountsError ? discountsError.message : null}
          onRefresh={() => mutateDiscounts()}
          statusFilter={statusFilter}
        />

        <DiscountModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => mutateDiscounts()}
        />
      </div>
    </div>
  );
}
