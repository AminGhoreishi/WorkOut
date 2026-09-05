"use client";

import { useState, useOptimistic, useTransition, memo } from "react";
import { Heart, MessageSquare, Bookmark, Share2 } from "lucide-react";
import { showAlert } from "@/utils/alert";
import type { ArticleActionsBarProps, OptimisticLikeState } from "@/types/blog";

function ArticleActionsBar({
  articleId,
  articleTitle,
  userId = null,
  initialLikeCount = 0,
  totalComments = 0,
  isLiked = false,
  isWished = false,
}: ArticleActionsBarProps) {
  const [, startTransition] = useTransition();

  const [likeState, setLikeState] = useState<OptimisticLikeState>({
    liked: isLiked,
    likeCount: initialLikeCount,
  });
  const [bookmarkedState, setBookmarkedState] = useState<boolean>(isWished);

  const [optimisticLike, setOptimisticLike] = useOptimistic<
    OptimisticLikeState,
    boolean
  >(likeState, (prev, nextLiked) => ({
    liked: nextLiked,
    likeCount: nextLiked ? prev.likeCount + 1 : Math.max(0, prev.likeCount - 1),
  }));

  const [optimisticBookmarked, setOptimisticBookmarked] = useOptimistic<
    boolean,
    boolean
  >(bookmarkedState, (_prev, nextWished) => nextWished);

  const handleLike = () => {
    if (!userId) {
      showAlert({
        title: "ورود به حساب کاربری",
        text: "برای پسندیدن مقالات، ابتدا وارد حساب کاربری خود شوید.",
        icon: "warning",
        confirmButtonColor: "#eab308",
      });
      return;
    }

    const nextLiked = !optimisticLike.liked;
    startTransition(async () => {
      setOptimisticLike(nextLiked);

      try {
        const res = await fetch("/api/blog/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blogId: articleId }),
        });

        if (res.ok) {
          const data = await res.json();
          setLikeState({
            liked: data.liked,
            likeCount: data.likes,
          });
        } else {
          throw new Error();
        }
      } catch {
        showAlert({
          title: "خطا",
          text: "پسندیدن مقاله با خطا مواجه شد.",
          icon: "error",
          confirmButtonColor: "#eab308",
        });
      }
    });
  };

  const handleBookmark = () => {
    if (!userId) {
      showAlert({
        title: "ورود به حساب کاربری",
        text: "برای افزودن به لیست علاقه‌مندی‌ها، ابتدا وارد حساب کاربری خود شوید.",
        icon: "warning",
        confirmButtonColor: "#eab308",
      });
      return;
    }

    const nextBookmarked = !optimisticBookmarked;
    startTransition(async () => {
      setOptimisticBookmarked(nextBookmarked);

      try {
        const res = await fetch("/api/blog/wish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blogId: articleId }),
        });

        if (res.ok) {
          const data = await res.json();
          setBookmarkedState(data.wished);
        } else {
          throw new Error();
        }
      } catch {
        showAlert({
          title: "خطا",
          text: "انجام عملیات با خطا مواجه شد.",
          icon: "error",
          confirmButtonColor: "#eab308",
        });
      }
    });
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
            optimisticLike.liked
              ? "text-rose-400 bg-rose-500/15 border border-rose-500/30"
              : "text-neutral-400 bg-neutral-800/50 hover:text-white border border-amber-500/10"
          }`}
        >
          <Heart size={16} fill={optimisticLike.liked ? "currentColor" : "none"} />
          {optimisticLike.likeCount}
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
            optimisticBookmarked
              ? "text-amber-400 bg-amber-500/20 border border-amber-500/30"
              : "text-neutral-400 bg-neutral-800/50 hover:text-white border border-amber-500/10"
          }`}
        >
          <Bookmark size={16} fill={optimisticBookmarked ? "currentColor" : "none"} />
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

export default memo(ArticleActionsBar);
