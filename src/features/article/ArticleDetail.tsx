"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { ArticleDetailProps } from "@/types/blog";
import RelatedArticles from "./RelatedArticles";
import ArticleTags from "./ArticleTags";
import ArticleAuthorCard from "./ArticleAuthorCard";
import ArticleCtaCard from "./ArticleCtaCard";
import ArticleNotFound from "./ArticleNotFound";
import ArticleMainContent from "./ArticleMainContent";
import ArticleActionsBar from "./ArticleActionsBar";
import ArticleComments from "./ArticleComments";

export default function ArticleDetail({
  article,
  relatedArticles = [],
  userId = null,
  isWished = false,
  isLiked = false,
  totalComments = 0,
}: ArticleDetailProps) {
  const [viewCount, setViewCount] = useState<number>(article?.views || 0);

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

            <ArticleComments
              articleId={article._id}
              userId={userId}
              initialTotalComments={totalComments}
            />
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
