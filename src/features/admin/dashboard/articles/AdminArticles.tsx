import Link from "next/link";
import { Plus } from "lucide-react";
import type { AdminArticlesProps } from "@/types/blog";
import ArticleStats from "./ArticleStats";
import ArticleList from "./ArticleList";

export default function AdminArticles({
  stats,
  totalCount,
}: AdminArticlesProps) {
  return (
    <div
      className="min-h-screen bg-neutral-950 md:p-8 font-danaMed text-white"
      dir="rtl"
    >
      <div className="container mx-auto pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl mb-2 text-white font-bold font-morabbaReg">
              مدیریت مقالات
            </h1>
            <p className="text-neutral-400 text-sm">
              مشاهده، افزودن، ویرایش و مدیریت تمامی مقالات سامانه استارفیت
            </p>
          </div>
          <Link
            href="/admin/articles/createArticles"
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] cursor-pointer text-sm"
          >
            <Plus className="w-5 h-5" />
            ایجاد مقاله جدید
          </Link>
        </div>

        <ArticleStats stats={stats} totalCount={totalCount} />

        <ArticleList />
      </div>
    </div>
  );
}
