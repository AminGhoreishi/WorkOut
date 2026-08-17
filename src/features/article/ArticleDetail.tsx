"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import {
  ChevronLeft,
  ThumbsUp,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { showAlert } from "@/utils/alert";
import type {
  ArticleDetailProps,
  ArticleCommentItem,
  ArticleCommentsApiResponse,
} from "@/types/blog";
import { getReadTime, isImageUrl } from "@/utils/article";
import RelatedArticles from "./RelatedArticles";
import ArticleTags from "./ArticleTags";
import ArticleAuthorCard from "./ArticleAuthorCard";
import ArticleCtaCard from "./ArticleCtaCard";
import ArticleNotFound from "./ArticleNotFound";
import ArticleMainContent from "./ArticleMainContent";
import ArticleActionsBar from "./ArticleActionsBar";

const fetcher = async (url: string): Promise<ArticleCommentsApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات");
  }
  return res.json();
};

export default function ArticleDetail({
  article,
  relatedArticles = [],
  userId = null,
  isWished = false,
  isLiked = false,
}: ArticleDetailProps) {
  const [newComment, setNewComment] = useState<string>("");
  const [commentPage, setCommentPage] = useState<number>(1);
  const [allComments, setAllComments] = useState<ArticleCommentItem[]>([]);
  const [isCommentsThrottled, setIsCommentsThrottled] =
    useState<boolean>(false);
  const [viewCount, setViewCount] = useState<number>(article?.views || 0);

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    mutate: mutateComments,
  } = useSWR<ArticleCommentsApiResponse>(
    article?._id
      ? `/api/blog/comment?blogId=${article._id}&page=${commentPage}`
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

  useEffect(() => {
    if (!article?._id) return;
    const recordView = async () => {
      try {
        const res = await fetch("/api/blog/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blogId: article._id }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.incremented) {
            setViewCount(data.views);
          }
        }
      } catch {}
    };
    recordView();
  }, [article?._id]);

  const handleSendComment = async () => {
    if (!newComment.trim()) return;
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
      const res = await fetch("/api/blog/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId: article._id,
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
    }
  };

  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!article) {
    return <ArticleNotFound />;
  }

  const authorName =
    article.authorId?.fullName || article.authorId?.username || "استارفیت";
  const authorRole =
    article.authorId?.role === "admin"
      ? "مدیر سیستم"
      : article.authorId?.role === "coach"
        ? "مربی مجرب"
        : "نویسنده";
  const authorAvatar = authorName.charAt(0);

  return (
    <div
      className="min-h-screen bg-neutral-950 text-white font-danaMed ss02"
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            خانه
          </Link>
          <ChevronLeft size={14} className="text-neutral-600" />
          <Link
            href="/articles"
            className="hover:text-amber-400 transition-colors"
          >
            مقالات
          </Link>
          <ChevronLeft size={14} className="text-neutral-600" />
          <span className="text-neutral-200 line-clamp-1">{article.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden mb-8 border border-amber-500/20 bg-neutral-900/60 shadow-xl">
              <div className="relative aspect-video flex items-center justify-center text-8xl">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <BookOpen className="w-24 h-24 text-amber-500/20" />
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs px-3 py-1 rounded-full font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {article.category}
              </span>
              {article.tags &&
                article.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-0.5 rounded-full text-neutral-400 bg-neutral-900 border border-amber-500/10"
                  >
                    #{tag}
                  </span>
                ))}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-5 leading-relaxed font-morabbaReg">
              {article.title}
            </h1>

            <ArticleMainContent
              authorAvatar={authorAvatar}
              authorName={authorName}
              authorRole={authorRole}
              publishDate={article.publishDate || article.createdAt}
              content={article.content}
              viewCount={viewCount}
              formatDate={formatDate}
              getReadTime={getReadTime}
            />

            <ArticleActionsBar
              articleId={article._id}
              articleTitle={article.title}
              userId={userId}
              initialLikeCount={article?.likedUsers?.length || 0}
              totalComments={totalComments}
              isLiked={isLiked}
              isWished={isWished}
            />

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
                    onClick={handleSendComment}
                    className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-neutral-950 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] cursor-pointer"
                  >
                    ارسال نظر
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
                      key={i}
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
                              {c.time || formatDate(c.createdAt)}
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
          </div>

          <div className="space-y-6">
            <ArticleAuthorCard
              authorAvatar={authorAvatar}
              authorName={authorName}
              authorRole={authorRole}
            />

            <ArticleCtaCard />

            <RelatedArticles
              relatedArticles={relatedArticles}
              getReadTime={getReadTime}
            />

            <ArticleTags tags={article.tags} />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-amber-500/10">
          <Link
            href="/articles"
            className="flex items-center gap-2 text-neutral-400 hover:text-amber-400 transition-colors text-xs sm:text-sm"
          >
            <ArrowRight size={16} />
            بازگشت به مقالات
          </Link>
        </div>
      </div>
    </div>
  );
}
