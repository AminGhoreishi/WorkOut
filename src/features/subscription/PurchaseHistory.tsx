import { FileText, AlertCircle } from "lucide-react";
import type { PurchaseHistoryProps } from "@/types/subscription";
import { formatDate, getCycleLabel } from "./subscriptionHelpers";

export default function PurchaseHistory({ orders = [] }: PurchaseHistoryProps) {
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div className="rounded-2xl border border-amber-500/15 bg-white/[0.03] p-6 shadow-xl font-danaMed">
      <h3 className="text-lg font-bold font-morabbaReg text-white mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-amber-400" />
        <span>سوابق تراکنش‌ها و خریدها</span>
      </h3>

      {safeOrders.length > 0 ? (
        <div className="overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[700px] text-right border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400 text-xs md:text-sm whitespace-nowrap">
                <th className="pb-3 px-4 font-medium">پکیج</th>
                <th className="pb-3 px-4 font-medium">دوره</th>
                <th className="pb-3 px-4 font-medium">مبلغ پرداختی</th>
                <th className="pb-3 px-4 font-medium">تاریخ خرید</th>
                <th className="pb-3 px-4 font-medium">کد پیگیری</th>
                <th className="pb-3 px-4 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs md:text-sm text-neutral-200">
              {safeOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-white/5 transition-colors whitespace-nowrap"
                >
                  <td className="py-4 px-4 font-semibold text-white font-morabbaReg">
                    {order.packageId?.name || "پکیج اختصاصی"}
                  </td>
                  <td className="py-4 px-4 text-neutral-300">
                    {getCycleLabel(order.billingCycle)}
                  </td>
                  <td className="py-4 px-4 font-bold text-white ss02">
                    {(order.amountPaid ?? 0).toLocaleString("fa-IR")} تومان
                  </td>
                  <td className="py-4 px-4 text-neutral-300 ss02">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-4 px-4 text-amber-400 font-mono select-all">
                    {order.paymentRef || "—"}
                  </td>
                  <td className="py-4 px-4">
                    {order.status === "paid" ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        موفق
                      </span>
                    ) : order.status === "pending" ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 animate-pulse">
                        در انتظار پرداخت
                      </span>
                    ) : order.status === "failed" ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
                        ناموفق
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-400 border border-neutral-700">
                        مرجوع شده
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-neutral-400 text-xs md:text-sm">
          <AlertCircle className="w-8 h-8 text-amber-400/40 mx-auto mb-2" />
          <p>هیچ تراکنش مالی برای حساب شما یافت نشد.</p>
        </div>
      )}
    </div>
  );
}
