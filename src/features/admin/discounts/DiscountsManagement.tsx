"use client";

import { useState } from "react";
import useSWR from "swr";
import { Tag, Plus } from "lucide-react";
import type { DiscountItem, DiscountsApiResponse } from "@/types/discount";
import DiscountModal from "./DiscountModal";
import DiscountStats from "./DiscountStats";
import DiscountList from "./DiscountList";

const fetcher = async (url: string): Promise<DiscountsApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت لیست تخفیف‌ها");
  }
  return res.json();
};

export default function DiscountsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<DiscountsApiResponse>(
    "/api/admin/discount",
    fetcher,
    {
      dedupingInterval: 5000,
    },
  );

  const discounts: DiscountItem[] = data?.discounts || [];

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

        <DiscountStats discounts={discounts} />

        <DiscountList
          discounts={discounts}
          loading={isLoading}
          error={error ? error.message : null}
          onRefresh={() => mutate()}
        />

        <DiscountModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => mutate()}
        />
      </div>
    </div>
  );
}
