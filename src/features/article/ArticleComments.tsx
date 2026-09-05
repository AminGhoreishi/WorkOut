import { useState, useEffect, memo } from "react";
import useSWR from "swr";
import { ThumbsUp } from "lucide-react";
import { isImageUrl } from "@/utils/article";
import { showAlert } from "@/utils/alert";
import { formatPersianDate } from "@/utils/date";
import type {
  ArticleCommentsProps,
  ArticleCommentItem,
  ArticleCommentsApiResponse,
} from "@/types/blog";

const fetcher = async (url: string): Promise<ArticleCommentsApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات");
  }
  return res.json();
};

function ArticleComments({
  articleId,
  userId,
  onCommentsCountChange,
}: ArticleCommentsProps) {
  const [newComment, setNewComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [commentPage, setCommentPage] = useState<number>(1);
  const [allComments, setAllComments] = useState<ArticleCommentItem[]>([]);
  const [isCommentsThrottled, setIsCommentsThrottled] =
    useState<boolean>(false);

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    mutate: mutateComments,
  } = useSWR<ArticleCommentsApiResponse>(
    articleId
      ? `/api/blog/comment?blogId=${articleId}&page=${commentPage}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    },
  );

  useEffect(() => {
    const incomingComments = commentsData?.comments;
    if (!incomingComments) return;
    if (commentPage === 1) {
      setAllComments(incomingComments);
    } else {
      setAllComments((prev) => {
        const existingIds = new Set(prev.map((c) => c._id));
        const newItems = incomingComments.filter(
          (c) => !existingIds.has(c._id),
        );
        return [...prev, ...newItems];
      });
    }
  }, [commentsData, commentPage]);

  useEffect(() => {
    if (typeof commentsData?.totalCount === "number" && onCommentsCountChange) {
      onCommentsCountChange(commentsData.totalCount);
    }
  }, [commentsData?.totalCount, onCommentsCountChange]);

  const totalComments: number = commentsData?.totalCount || 0;
  const hasMoreComments: boolean = allComments.length < totalComments;

  const handleLoadMoreComments = () => {
    if (isLoadingComments || isCommentsThrottled || !hasMoreComments) return;
    setIsCommentsThrottled(true);
    setCommentPage((prev) => prev + 1);
    setTimeout(() => {
      setIsCommentsThrottled(false);
    }, 600);
  };

  const handleSendComment = async () => {
    if (!newComment.trim() || isSubmitting) return;
    if (!userId) {
      showAlert({
        title: "ورود به حساب کاربری",
        text: "برای ثبت نظر، ابتدا وارد حساب کاربری خود شوید.",
        icon: "warning",
        confirmButtonColor: "#eab308",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/blog/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId: articleId,
          text: newComment.trim(),
        }),
      });

      if (res.ok) {
        setNewComment("");
        mutateComments();
        showAlert({
          title: "ثبت شد",
          text: "نظر شما با موفقیت ثبت شد و پس از تایید مدیریت نمایش داده خواهد شد.",
          icon: "success",
          confirmButtonColor: "#eab308",
        });
      } else {
        throw new Error("ثبت نظر ناموفق بود");
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "ثبت نظر با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
        icon: "error",
        confirmButtonColor: "#eab308",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-6 font-morabbaReg">
        نظرات ({totalComments})
      </h3>

      <div className="rounded-2xl p-5 mb-6 bg-neutral-900/60 border border-amber-500/20">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="نظر خود را بنویسید..."
          rows={3}
          className="w-full bg-neutral-950 border border-amber-500/20 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/60 resize-none text-xs sm:text-sm"
        />
        <div className="flex justify-end mt-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSendComment}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-neutral-950 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "در حال ارسال..." : "ارسال نظر"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoadingComments && allComments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mb-2" />
            <p className="text-neutral-400 text-xs sm:text-sm">
              در حال بارگذاری نظرات...
            </p>
          </div>
        ) : allComments.length > 0 ? (
          allComments.map((c, i) => (
            <div
              key={c._id || i}
              className="rounded-2xl p-5 bg-neutral-900/60 border border-amber-500/10"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-950 font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0 overflow-hidden">
                  {isImageUrl(c.avatar) ? (
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    c.avatar || c.name.charAt(0)
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-xs sm:text-sm font-bold">
                      {c.name}
                    </span>
                    <span className="text-neutral-500 text-xs">
                      {c.time || formatPersianDate(c.createdAt)}
                    </span>
                  </div>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-6">
                    {c.text}
                  </p>
                  <button className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-400 mt-3 transition-colors cursor-pointer">
                    <ThumbsUp size={12} /> {c.likes || 0} پسند
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-neutral-500 text-center py-8 text-xs sm:text-sm">
            هیچ نظری برای این مقاله ثبت نشده است.
          </p>
        )}
      </div>

      {hasMoreComments && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMoreComments}
            disabled={isLoadingComments || isCommentsThrottled}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-amber-400 bg-neutral-900 border border-amber-500/20 hover:bg-neutral-800 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            {isLoadingComments || isCommentsThrottled ? (
              <>
                <span className="w-4 h-4 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                در حال بارگذاری...
              </>
            ) : (
              "مشاهده بیشتر"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(ArticleComments);
