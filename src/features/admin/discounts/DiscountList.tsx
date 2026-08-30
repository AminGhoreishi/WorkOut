"use client";

import { useState } from "react";
import {
  Percent,
  Trash2,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  Tag,
} from "lucide-react";
import { showConfirm, showToast, showAlert } from "@/utils/alert";
import type { DiscountListProps } from "@/types/discount";

export default function DiscountList({
  discounts,
  loading,
  error,
  onRefresh,
  setStatusFilter,
  statusFilter
}: DiscountListProps) {
 
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDelete = async (id: string, code?: string | null) => {
    const label = code ? `کد تخفیف "${code}"` : "تخفیف مستقیم پکیج";
    const isConfirmed = await showConfirm(
      "حذف تخفیف",
      `آیا از حذف ${label} اطمینان دارید؟`,
      "بله، حذف شود",
      "warning",
    );

    if (!isConfirmed) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/discount?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "خطا در حذف تخفیف");
      }

      showToast({ title: "تخفیف با موفقیت حذف شد", icon: "success" });
      onRefresh?.();
    } catch (err: any) {
      showAlert({
        title: "خطا",
        text: err.message || "خطایی رخ داد",
        icon: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-4 md:p-6 mb-8 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              statusFilter === "all"
                ? "bg-amber-500 text-neutral-950"
                : "bg-neutral-800/60 text-white/70 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            همه ({discounts.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("active")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              statusFilter === "active"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-neutral-800/60 text-white/70 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            فعال
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("inactive")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              statusFilter === "inactive"
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                : "bg-neutral-800/60 text-white/70 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            غیرفعال
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-white/60 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
          <span className="text-sm">در حال بارگذاری لیست تخفیف‌ها...</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      ) : discounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-white/40 gap-3 text-center">
          <span className="p-4 rounded-2xl bg-neutral-800/50 text-white/30">
            <Tag className="w-8 h-8" />
          </span>
          <span className="text-sm font-medium">تخفیفی یافت نشد</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-neutral-800 text-white/40 text-xs font-medium">
                <th className="pb-4 pr-4">عنوان / کد تخفیف</th>
                <th className="pb-4 px-4">درصد تخفیف</th>
                <th className="pb-4 px-4">پکیج‌های مجاز</th>
                <th className="pb-4 px-4">میزان مصرف</th>
                <th className="pb-4 px-4">بازه اعتبار</th>
                <th className="pb-4 px-4">وضعیت</th>
                <th className="pb-4 pl-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-sm">
              {discounts.map((discount) => (
                <tr
                  key={discount._id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="py-4 pr-4">
                    {discount.code ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400 tracking-wider bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                          {discount.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(discount.code!)}
                          className="text-white/40 hover:text-white p-1 rounded transition-colors cursor-pointer"
                          title="کپی کد"
                        >
                          {copiedCode === discount.code ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">
                        <Tag className="w-3.5 h-3.5" />
                        تخفیف مستقیم پکیج
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-white font-bold">
                      <Percent className="w-4 h-4 text-amber-400" />
                      <span>{discount.percent}٪</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    {!discount.packages || discount.packages.length === 0 ? (
                      <span className="text-xs text-white/50 bg-neutral-800 px-2.5 py-1 rounded-md">
                        همه پکیج‌ها
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {discount.packages.map((pkg) => (
                          <span
                            key={pkg._id}
                            className="text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded"
                          >
                            {pkg.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="text-xs text-white/80">
                        {discount.usageCount?.toLocaleString("fa-IR") || "۰"} از{" "}
                        {discount.maxUsage
                          ? discount.maxUsage.toLocaleString("fa-IR")
                          : "نامحدود"}
                      </div>
                      {discount.maxUsage && (
                        <div className="w-24 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{
                              width: `${Math.min(
                                (discount.usageCount / discount.maxUsage) * 100,
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-xs space-y-1 text-white/60">
                      <div>
                        شروع:{" "}
                        {discount.startsAt
                          ? new Date(discount.startsAt).toLocaleDateString("fa-IR")
                          : "-"}
                      </div>
                      <div>
                        انقضا:{" "}
                        {discount.expiresAt
                          ? new Date(discount.expiresAt).toLocaleDateString("fa-IR")
                          : "نامحدود"}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    {discount.isActive ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        فعال
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <XCircle className="w-3.5 h-3.5" />
                        غیرفعال
                      </span>
                    )}
                  </td>

                  <td className="py-4 pl-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(discount._id, discount.code)}
                        disabled={deletingId === discount._id}
                        className="p-2 rounded-lg bg-neutral-800 text-white/70 hover:text-rose-400 hover:bg-neutral-700 transition-colors cursor-pointer disabled:opacity-50"
                        title="حذف"
                      >
                        {deletingId === discount._id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
