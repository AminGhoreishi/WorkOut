"use client";

import { useState } from "react";
import { Activity, Trash2, Loader2 } from "lucide-react";
import { showConfirm, showToast, showAlert } from "@/utils/alert";
import type { UserProgressHistoryProps } from "@/types/progress";

export default function ProgressHistoryTable({
  sortedRecords,
  onDeleteSuccess,
}: UserProgressHistoryProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, testName?: string) => {
    const isConfirmed = await showConfirm(
      "حذف رکورد",
      `آیا از حذف رکورد "${testName || "مورد نظر"}" اطمینان دارید؟`,
      "بله، حذف شود",
      "warning"
    );

    if (!isConfirmed) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/user/pr/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "خطا در حذف رکورد");
      }

      showToast({ title: "رکورد با موفقیت حذف شد", icon: "success" });
      onDeleteSuccess?.();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "خطایی رخ داد";
      showAlert("خطا", message, "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl font-danaMed">
      <h3 className="text-xs sm:text-lg text-white font-semibold mb-4 font-morabbaReg flex items-center gap-2">
        <Activity className="w-5 h-5 text-amber-400" />
        تاریخچه رکوردهای ثبت‌شده
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs sm:text-sm text-white/80 whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/10 text-white/50 text-xs">
              <th className="pb-3 px-4 font-medium">تاریخ ثبت</th>
              <th className="pb-3 px-4 font-medium">دسته‌بندی</th>
              <th className="pb-3 px-4 font-medium">نام حرکت / تست</th>
              <th className="pb-3 px-4 font-medium">مقدار</th>
              <th className="pb-3 px-4 font-medium">توضیحات</th>
              <th className="pb-3 px-4 font-medium text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedRecords.map((r) => (
              <tr key={r._id} className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 text-xs text-white/60 ss02">
                  {new Date(r.date).toLocaleDateString("fa-IR")}
                </td>
                <td className="py-3 px-4 text-xs font-semibold text-amber-400">
                  {r.category || "-"}
                </td>
                <td className="py-3 px-4 text-xs font-medium text-white">
                  {r.testName || "-"}
                </td>
                <td className="py-3 px-4 text-xs font-bold text-white ss02">
                  {r.value} {r.unit || ""}
                </td>
                <td className="py-3 px-4 text-xs text-white/50">
                  {r.notes || "-"}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => handleDelete(r._id, r.testName)}
                    disabled={deletingId === r._id}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-all cursor-pointer disabled:opacity-50 inline-flex items-center justify-center"
                    title="حذف رکورد"
                  >
                    {deletingId === r._id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
