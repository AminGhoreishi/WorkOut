"use client";

import Link from "next/link";
import { AlertTriangle, Clock, SearchX, ServerCrash, ArrowRight, ShieldAlert } from "lucide-react";
import type { CheckoutErrorViewProps } from "@/types/checkout";

export default function CheckoutErrorView({
  title,
  description,
  actionText = "بازگشت به پکیج‌ها",
  actionHref = "/packages",
  iconType = "error",
}: CheckoutErrorViewProps) {
  const getIcon = () => {
    switch (iconType) {
      case "expired":
        return <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400" />;
      case "not-found":
        return <SearchX className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400" />;
      case "server":
        return <ServerCrash className="w-10 h-10 sm:w-12 sm:h-12 text-red-400" />;
      case "error":
      default:
        return <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400" />;
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-neutral-950 text-amber-50 py-12 px-4 relative overflow-hidden font-danaMed flex items-center justify-center"
      dir="rtl"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            {getIcon()}
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-500 bg-clip-text text-transparent font-morabbaReg">
              {title}
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              {description}
            </p>
          </div>

          <div className="pt-2">
            <Link
              href={actionHref}
              className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-bold py-3 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all text-xs sm:text-sm cursor-pointer"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500/60" />
          <span>مرکز پشتیبانی پرداخت استار فیت</span>
        </div>
      </div>
    </div>
  );
}
