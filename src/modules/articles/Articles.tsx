"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { Search, User, Clock, BookOpen, Loader2, Inbox } from "lucide-react";
import { ARTICLE_CATEGORIES } from "@/constants/blog";
import type { PublicArticleItem } from "@/types/blog";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("خطا در دریافت لیست مقالات");
  }
  return res.json();
};

export default function Articles() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("همه");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const queryParams = new URLSearchParams({
    page: String(page),
    limit: "9",
  });
  if (category && category !== "همه") {
    queryParams.append("category", category);
  }
  if (debouncedSearch) {
    queryParams.append("search", debouncedSearch);
  }

  const apiUrl = `/api/blog?${queryParams.toString()}`;

  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const articles: PublicArticleItem[] = data?.blogs || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  const getReadTime = (content?: string) => {
    if (!content) return "۱ دقیقه";
    const words = content
      .replace(/<[^>]+>/g, "")
      .split(/\s+/)
      .filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return new Intl.NumberFormat("fa-IR").format(minutes) + " دقیقه";
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-danaMed" dir="rtl">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center font-morabbaReg">
            مقالات تخصصی ورزشی و تغذیه
          </h1>
          <p className="text-lg text-neutral-300 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            جدیدترین مقالات آموزشی بدنسازی، برنامه غذایی و سلامتی تحت نظر امیرحسین میرافتابی
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو در عنوان یا متن مقالات..."
                className="w-full bg-neutral-900/80 border border-amber-500/20 rounded-xl px-12 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all shadow-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500/70" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center">
            {ARTICLE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-xl transition-all text-sm font-medium cursor-pointer ${
                  cat === category
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                    : "bg-neutral-900/60 text-neutral-300 hover:text-amber-400 hover:bg-neutral-800/80 border border-amber-500/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="max-w-lg mx-auto p-4 mb-8 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-center text-sm">
              خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.
            </div>
          )}

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => {
                const authorName =
                  article.authorId?.fullName ||
                  article.authorId?.username ||
                  "استارفیت";
                return (
                  <Link
                    href={`/article/${article.slug}`}
                    key={article._id}
                    className="block h-full group"
                  >
                    <article className="bg-neutral-900/60 border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] flex flex-col h-full">
                      <div className="relative aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden">
                        {article.image ? (
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <BookOpen className="w-12 h-12 text-amber-500/30" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-xs text-neutral-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            {getReadTime(article.content)}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors font-morabbaReg leading-snug">
                          {article.title}
                        </h2>

                        <p className="text-neutral-400 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                          {article.excerpt ||
                            article.content?.replace(/<[^>]+>/g, "").slice(0, 140) + "..."}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-amber-500/10 mt-auto text-xs text-neutral-400">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-amber-400" />
                            <span>{authorName}</span>
                          </div>
                          <span>
                            {formatDate(article.publishDate || article.createdAt)}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            !isLoading && (
              <div className="text-center py-20 bg-neutral-900/40 rounded-2xl border border-amber-500/20 max-w-lg mx-auto">
                <Inbox className="w-16 h-16 text-amber-500/40 mx-auto mb-4" />
                <h3 className="text-white text-lg font-bold mb-1">
                  هیچ مقاله‌ای یافت نشد
                </h3>
                <p className="text-neutral-400 text-sm">
                  لطفاً با فیلترها یا عبارت‌های دیگری جستجو کنید.
                </p>
              </div>
            )
          )}

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
            </div>
          )}

          {!isLoading && page < totalPages && (
            <div className="text-center mt-12">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] cursor-pointer"
              >
                مشاهده مقالات بیشتر ({total - articles.length} مقاله باقی‌مانده)
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
