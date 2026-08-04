"use client";

import { Calendar, Clock, Eye } from "lucide-react";
import type { ArticleMainContentProps } from "@/types/blog";

export default function ArticleMainContent({
  authorAvatar,
  authorName,
  authorRole,
  publishDate,
  content,
  viewCount,
  formatDate,
  getReadTime,
}: ArticleMainContentProps) {
  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-amber-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-950 font-bold bg-gradient-to-r from-amber-500 to-yellow-500 shadow-md overflow-hidden shrink-0">
            {authorAvatar}
          </div>
          <div>
            <p className="text-white text-xs sm:text-sm font-bold">
              {authorName}
            </p>
            <p className="text-neutral-400 text-xs">{authorRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-neutral-400">
          <span className="flex items-center gap-1">
            <Calendar size={13} className="text-amber-400" />{" "}
            {formatDate(publishDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-amber-400" />{" "}
            {getReadTime(content)}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={13} className="text-amber-400" /> {viewCount} بازدید
          </span>
        </div>
      </div>

      <article className="mb-10 text-neutral-300 leading-8 text-sm sm:text-base space-y-4">
        <div
          className="ck-content-view"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </>
  );
}
