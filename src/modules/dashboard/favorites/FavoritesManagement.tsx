"use client";

import { useState } from "react";
import { BookOpen, Eye, ArrowRight, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { showAlert } from "@/utils/alert";
import type { FavoritesManagementProps, FavoriteArticleItem } from "@/types/favorites";

export default function FavoritesManagement({
  initialWishlist = [],
}: FavoritesManagementProps) {
  const [wishlist, setWishlist] = useState<FavoriteArticleItem[]>(initialWishlist);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (blogId: string) => {
    if (removingId) return;

    const previousWishlist = [...wishlist];
    setWishlist((prev) => prev.filter((item) => item.id !== blogId));
    setRemovingId(blogId);

    try {
      const res = await fetch("/api/blog/wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId }),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok || resData.wished) {
        setWishlist(previousWishlist);
        showAlert({
          title: "خطا",
          text: resData.message || "امکان حذف مقاله وجود ندارد، لطفاً دوباره تلاش کنید.",
          icon: "error",
          confirmButtonText: "متوجه شدم",
          confirmButtonColor: "#f59e0b",
        });
      }
    } catch {
      setWishlist(previousWishlist);
      showAlert({
        title: "خطای ارتباط",
        text: "ارتباط با سرور برقرار نشد، لطفاً اتصال اینترنت خود را بررسی کنید.",
        icon: "error",
        confirmButtonText: "متوجه شدم",
        confirmButtonColor: "#f59e0b",
      });
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-danaMed" dir="rtl">
      <main className="p-4 md:p-6 space-y-6">
        <div className="relative rounded-2xl p-6 overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/25 shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-amber-500 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-yellow-500 blur-2xl" />
          </div>
          <div className="relative flex items-center justify-between flex-wrap gap-4 z-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 font-morabbaReg">
                علاقه‌مندی‌های من
              </h2>
              <p className="text-neutral-400 text-sm">
                لیست مقالات علمی و ورزشی که نشانه‌گذاری کرده‌اید.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 transition-all border border-amber-500/20"
            >
              <ArrowRight size={16} />
              بازگشت به داشبورد
            </Link>
          </div>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-lg border border-amber-500/15 rounded-2xl p-5 shadow-xl">
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl p-4 bg-white/[0.03] border border-amber-500/15 hover:border-amber-500/40 transition-all group relative flex flex-col justify-between"
                >
                  <div>
                    {a.image ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
                        <img
                          src={a.image}
                          alt={a.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-video bg-white/5 rounded-lg flex items-center justify-center text-3xl mb-3">
                        📚
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                        {a.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemove(a.id)}
                        disabled={removingId === a.id}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                        title="حذف از علاقه‌مندی‌ها"
                      >
                        {removingId === a.id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>

                    <Link href={`/article/${a.slug}`} className="block">
                      <h3 className="text-white text-sm font-semibold group-hover:text-amber-300 transition-colors line-clamp-2 leading-relaxed mb-3">
                        {a.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 border-t border-white/5 pt-3 mt-2">
                    <Eye size={12} />
                    <span className="">
                      {new Intl.NumberFormat("fa-IR").format(a.views)} بازدید
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-white/40 text-sm bg-white/[0.02] border border-dashed border-amber-500/20 rounded-xl">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-white/20" />
              <p className="mb-3">لیست علاقه‌مندی‌های شما خالی است.</p>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-neutral-950 transition-all hover:scale-[1.02] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 shadow-md shadow-amber-500/10"
              >
                مشاهده مقالات ورزشی
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
