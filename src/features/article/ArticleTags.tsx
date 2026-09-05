"use client";

import { memo } from "react";
import type { ArticleTagsProps } from "@/types/blog";

function ArticleTags({ tags }: ArticleTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="rounded-2xl p-5 bg-neutral-900/60 border border-amber-500/20 font-danaMed">
      <h4 className="font-bold text-white mb-4 text-xs sm:text-sm font-morabbaReg">
        برچسب‌ها
      </h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string, i: number) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full text-neutral-300 hover:text-amber-400 bg-neutral-950 border border-amber-500/20 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(ArticleTags);
