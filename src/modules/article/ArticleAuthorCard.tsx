"use client";

import type { ArticleAuthorCardProps } from "@/types/blog";

export default function ArticleAuthorCard({
  authorAvatar,
  authorName,
  authorRole,
}: ArticleAuthorCardProps) {
  return (
    <div className="rounded-2xl p-5 bg-neutral-900/60 border border-amber-500/20 font-danaMed">
      <h4 className="font-bold text-white mb-4 text-xs sm:text-sm font-morabbaReg">
        درباره نویسنده
      </h4>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-neutral-950 text-2xl font-bold mb-3 bg-gradient-to-r from-amber-500 to-yellow-500 shadow-md">
          {authorAvatar}
        </div>
        <p className="font-bold text-white text-sm sm:text-base">
          {authorName}
        </p>
        <p className="text-amber-400 text-xs mt-1">{authorRole}</p>
        <p className="text-neutral-400 text-xs mt-3 leading-5">
          نویسنده و تحلیل‌گر تخصصی سامانه استارفیت، ارائه دهنده برترین مقالات ورزشی و تغذیه‌ای
        </p>
      </div>
    </div>
  );
}
