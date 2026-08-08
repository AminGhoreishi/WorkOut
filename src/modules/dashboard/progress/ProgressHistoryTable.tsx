import { Activity } from "lucide-react";
import type { UserProgressHistoryProps } from "@/types/progress";

export default function ProgressHistoryTable({
  sortedRecords,
}: UserProgressHistoryProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl font-danaMed">
      <h3 className="text-xs sm:text-lg text-white font-semibold mb-4 font-morabbaReg flex items-center gap-2">
        <Activity className="w-5 h-5 text-amber-400" />
        تاریخچه رکوردهای ثبت‌شده
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs sm:text-sm text-white/80">
          <thead>
            <tr className="border-b border-white/10 text-white/50 text-xs">
              <th className="pb-3 px-4 font-medium">تاریخ ثبت</th>
              <th className="pb-3 px-4 font-medium">دسته‌بندی</th>
              <th className="pb-3 px-4 font-medium">نام حرکت / تست</th>
              <th className="pb-3 px-4 font-medium">مقدار</th>
              <th className="pb-3 px-4 font-medium">توضیحات</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
