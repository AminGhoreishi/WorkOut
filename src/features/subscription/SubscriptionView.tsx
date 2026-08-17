import { Calendar, Clock, Award, Zap, CreditCard } from "lucide-react";
import NoSubscriptionView from "./NoSubscriptionView";
import PurchaseHistory from "./PurchaseHistory";
import ActiveAccesses from "./ActiveAccesses";
import type { SubscriptionViewProps } from "@/types/subscription";
import {
  formatDate,
  getCycleLabel,
  getStatusBadge,
} from "./subscriptionHelpers";

export default function SubscriptionView({
  subscription,
  orders = [],
}: SubscriptionViewProps) {
  let daysRemaining = 0;
  let totalDays = 1;
  let progressPercent = 0;

  if (subscription?.endsAt && subscription?.startsAt) {
    const now = new Date();
    const endsAt = new Date(subscription.endsAt);
    const startsAt = new Date(subscription.startsAt);

    if (!isNaN(endsAt.getTime()) && !isNaN(startsAt.getTime())) {
      const totalTime = endsAt.getTime() - startsAt.getTime();
      const remainingTime = endsAt.getTime() - now.getTime();

      daysRemaining = Math.max(
        0,
        Math.ceil(remainingTime / (1000 * 60 * 60 * 24)),
      );
      totalDays = Math.max(1, Math.ceil(totalTime / (1000 * 60 * 60 * 24)));
      progressPercent = Math.min(
        100,
        Math.max(
          0,
          Math.round(((totalDays - daysRemaining) / totalDays) * 100),
        ),
      );
    }
  }

  return (
    <div className="min-h-screen text-white font-danaMed pb-12 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-morabbaReg text-2xl md:text-3xl font-bold text-white">
              اشتراک من
            </h1>
            <p className="text-neutral-400 text-xs md:text-sm mt-1">
              جزئیات عضویت فعال، دسترسی‌های ورزشی و سوابق مالی شما
            </p>
          </div>
        </div>

        {subscription ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/15 bg-white/[0.03] p-6 md:p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -z-10" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 shadow-md">
                      <Award className="w-6 h-6 text-neutral-950" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-white font-morabbaReg">
                        {subscription.packageId?.name || "پکیج اختصاصی"}
                      </h2>
                      <p className="text-neutral-400 text-xs md:text-sm mt-0.5">
                        {subscription.packageId?.tagline ||
                          "برنامه اختصاصی تناسب اندام و مربیگری"}
                      </p>
                    </div>
                  </div>
                  <div>{getStatusBadge(subscription.status)}</div>
                </div>

                <hr className="border-white/10 my-6" />

                <div className="space-y-4">
                  <div className="flex justify-between items-end text-xs md:text-sm">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>میزان مصرف اشتراک</span>
                    </div>
                    <span className="font-bold text-amber-400 ss02">
                      {daysRemaining} روز مانده از {totalDays} روز
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 text-xs md:text-sm text-neutral-400">
                    <div className="flex flex-col gap-1 bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-neutral-400">تاریخ شروع</span>
                      <span className="text-white font-semibold flex items-center gap-1 ss02">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {formatDate(subscription.startsAt)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-neutral-400">تاریخ انقضا</span>
                      <span className="text-white font-semibold flex items-center gap-1 ss02">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {formatDate(subscription.endsAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <ActiveAccesses />
            </div>

            <div className="space-y-6">
              {subscription.orderId && (
                <div className="rounded-2xl border border-amber-500/15 bg-white/[0.03] p-6 shadow-xl">
                  <h3 className="text-base font-bold text-neutral-300 mb-4 flex items-center gap-2 font-morabbaReg">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span>جزئیات پرداخت دوره</span>
                  </h3>
                  <div className="space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-neutral-400">دوره صورت‌حساب</span>
                      <span className="text-white font-semibold">
                        {getCycleLabel(subscription.orderId.billingCycle)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-neutral-400">مبلغ پرداخت شده</span>
                      <span className="text-white font-semibold ss02">
                        {(subscription.orderId.amountPaid ?? 0).toLocaleString(
                          "fa-IR",
                        )}{" "}
                        تومان
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-neutral-400">کد پیگیری پرداخت</span>
                      <span className="text-amber-400 font-semibold select-all">
                        {subscription.orderId.paymentRef || "ثبت نشده"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <NoSubscriptionView />
        )}

        <PurchaseHistory orders={orders} />
      </div>
    </div>
  );
}
