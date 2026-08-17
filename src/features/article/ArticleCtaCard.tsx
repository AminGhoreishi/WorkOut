"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ArticleCtaCard() {
  return (
    <div className="rounded-2xl p-5 relative overflow-hidden bg-neutral-900/80 border border-amber-500/30 shadow-lg font-danaMed">
      <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />
      <h4 className="font-bold text-white mb-2 text-xs sm:text-sm font-morabbaReg">
        برنامه شخصی بگیر!
      </h4>
      <p className="text-neutral-400 text-xs leading-5 mb-4">
        با مشاوره و برنامه اختصاصی امیرحسین میرافتابی، سریع‌تر به اهداف ورزشی خود برسید
      </p>
      <Link
        href="/packages"
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-neutral-950 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
      >
        مشاهده پکیج‌ها
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
