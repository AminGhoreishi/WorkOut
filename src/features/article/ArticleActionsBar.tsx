"use client";

import { useState } from "react";
import { Heart, MessageSquare, Bookmark, Share2 } from "lucide-react";
import { showAlert } from "@/utils/alert";
import type { ArticleActionsBarProps } from "@/types/blog";

export default function ArticleActionsBar({
  articleId,
  articleTitle,
  userId = null,
  initialLikeCount = 0,
  totalComments = 0,
  isLiked = false,
  isWished = false,
}: ArticleActionsBarProps) {
  const [liked, setLiked] = useState<boolean>(isLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [bookmarked, setBookmarked] = useState<boolean>(isWished);

  const handleLike = async () => {
    if (!userId) {
      showAlert({
        title: "ورود به حساب کاربری",
        text: "برای پسندیدن مقالات، ابتدا وارد حساب کاربری خود شوید.",
        icon: "warning",
        confirmButtonColor: "#eab308",
      });
      return;
    }

    try {
      const res = await fetch("/api/blog/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId: articleId }),
      });

      if (res.ok) {
        const data = await res.json();
        setLiked(data.liked);
        setLikeCount(data.likes);
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "پسندیدن مقاله با خطا مواجه شد.",
        icon: "error",
        confirmButtonColor: "#eab308",
      });
    }
  };

  const handleBookmark = async () => {
    if (!userId) {
      showAlert({
        title: "ورود به حساب کاربری",
        text: "برای افزودن به لیست علاقه‌مندی‌ها، ابتدا وارد حساب کاربری خود شوید.",
        icon: "warning",
        confirmButtonColor: "#eab308",
      });
      return;
    }

    try {
      const res = await fetch("/api/blog/wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId: articleId }),
      });

      if (res.ok) {
        const data = await res.json();
        setBookmarked(data.wished);
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "انجام عملیات با خطا مواجه شد.",
        icon: "error",
        confirmButtonColor: "#eab308",
      });
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator
        .share({
          title: articleTitle,
          url: window.location.href,
        })
        .catch(() => {});
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showAlert({
        title: "کپی شد",
        text: "لینک مقاله در حافظه موقت کپی شد.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl mb-10 bg-neutral-900/60 border border-amber-500/20">
      <div className="flex items-center gap-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
            liked
              ? "text-rose-400 bg-rose-500/15 border border-rose-500/30"
              : "text-neutral-400 bg-neutral-800/50 hover:text-white border border-amber-500/10"
          }`}
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
          {likeCount}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm text-neutral-400 bg-neutral-800/50 border border-amber-500/10">
          <MessageSquare size={16} className="text-amber-400" />
          {totalComments}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            bookmarked
              ? "text-amber-400 bg-amber-500/20 border border-amber-500/30"
              : "text-neutral-400 bg-neutral-800/50 hover:text-white border border-amber-500/10"
          }`}
        >
          <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
        </button>
        <button
          onClick={handleShare}
          className="p-2 rounded-xl text-neutral-400 hover:text-white bg-neutral-800/50 border border-amber-500/10 transition-colors cursor-pointer"
        >
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
}
