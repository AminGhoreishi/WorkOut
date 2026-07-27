"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, CheckCircle2, Clock3 } from "lucide-react";
import type { AdminComment, RecentCommentsProps } from "@/types/comment";

export default function RecentComments({ limit = 3 }: RecentCommentsProps) {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getRecentComments() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`/api/admin/comment?limit=${limit}`);
        if (!res.ok) {
          throw new Error("خطا در دریافت دیدگاه‌ها");
        }
        const data = await res.json();
        const list = data.comments || [];
        setComments(list.slice(0, limit));
      } catch (err: any) {
        setError(err.message || "خطایی رخ داد");
      } finally {
        setIsLoading(false);
      }
    }

    getRecentComments();
  }, [limit]);

  return (
    <div className="min-w-0 bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.05)] font-danaMed">
      <div className="p-4 sm:p-6 border-b border-amber-500/20">
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold text-white font-morabbaReg">
            کامنت‌های جدید
          </h2>
          <Link
            href="/admin/comments"
            className="text-amber-400 hover:text-amber-300 text-sm font-bold transition-colors"
          >
            مشاهده همه
          </Link>
        </div>
      </div>
      <div className="p-3 sm:p-6">
        {isLoading ? (
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-3 sm:p-4 bg-neutral-950/60 rounded-xl animate-pulse h-20 border border-amber-500/10"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-6 text-red-400 text-sm">{error}</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-6 text-neutral-500 text-sm">
            دیدگاهی یافت نشد
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {comments.slice(0, limit).map((comment) => {
              const authorName =
                comment.userId?.fullName ||
                comment.name ||
                comment.userId?.username ||
                "کاربر";
              const dateStr = comment.createdAt
                ? new Date(comment.createdAt).toLocaleDateString("fa-IR", {
                    day: "numeric",
                    month: "long",
                  })
                : "";

              return (
                <div
                  key={comment._id}
                  className="p-3 sm:p-4 bg-neutral-950/60 border border-amber-500/10 hover:border-amber-500/30 rounded-xl hover:bg-neutral-950 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-white font-semibold text-sm truncate">
                      {authorName}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 font-medium ${
                        comment.isApproved
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          : "bg-neutral-800 text-neutral-400 border border-neutral-700"
                      }`}
                    >
                      {comment.isApproved ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-amber-400" />
                          تایید شده
                        </>
                      ) : (
                        <>
                          <Clock3 className="w-3 h-3 text-neutral-400" />
                          در انتظار تایید
                        </>
                      )}
                    </span>
                  </div>
                  {comment.blogId?.title && (
                    <div className="text-amber-400/80 text-xs mb-1 truncate font-medium">
                      مقاله: {comment.blogId.title}
                    </div>
                  )}
                  <div className="text-neutral-300 text-xs sm:text-sm mb-2 line-clamp-2">
                    {comment.text}
                  </div>
                  {dateStr && (
                    <div className="flex items-center text-neutral-500 text-xs">
                      <Clock className="w-3 h-3 ml-1 text-amber-400" />
                      {dateStr}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
