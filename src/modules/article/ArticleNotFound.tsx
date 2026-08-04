"use client";

import Link from "next/link";
import { Inbox } from "lucide-react";

export default function ArticleNotFound() {
  return (
    <div
      className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white font-danaMed"
      dir="rtl"
    >
      <Inbox className="w-16 h-16 text-amber-500/30 mb-4" />
      <p className="text-neutral-400 mb-4">مقاله‌ای یافت نشد.</p>
      <Link
        href="/articles"
        className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold px-6 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] text-sm"
      >
        بازگشت به لیست مقالات
      </Link>
    </div>
  );
}
