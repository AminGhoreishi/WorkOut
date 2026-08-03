"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import Pagination from "@/components/AdminPagination";
import { showAlert, showConfirm } from "@/utils/alert";
import { formatNumber } from "@/utils/numbers";
import {
  ARTICLE_CATEGORIES,
  ARTICLE_STATUSES,
  mapStatusToEnglish,
} from "@/constants/blog";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  Loader2,
} from "lucide-react";
import type { ArticleListProps, AdminBlog, AdminBlogStats } from "@/types/blog";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات مقالات");
  }
  return res.json();
};

export default function ArticleList({ onStatsChange }: ArticleListProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("همه");
  const [selectedStatus, setSelectedStatus] = useState<string>("همه");
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [isDeletingBulk, setIsDeletingBulk] = useState<boolean>(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(1);
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedStatus]);

  const engStatus = mapStatusToEnglish(selectedStatus);
  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: "10",
    search: debouncedSearchTerm,
    category: selectedCategory,
    status: engStatus,
  });

  const apiUrl = `/api/admin/blog?${queryParams.toString()}`;

  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const articles: AdminBlog[] = data?.blogs || [];
  const total: number = data?.total || 0;
  const totalPages: number = data?.totalPages || 1;
  const stats: AdminBlogStats = data?.stats || {
    totalViews: 0,
    publishedCount: 0,
    draftCount: 0,
  };

  useEffect(() => {
    if (onStatsChange && data?.stats) {
      onStatsChange(stats, total);
    }
  }, [data?.stats, total, onStatsChange]);

  const handleSelectAll = () => {
    if (selectedArticles.length === articles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(articles.map((a) => a._id));
    }
  };

  const handleSelectArticle = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter((aid) => aid !== id));
    } else {
      setSelectedArticles([...selectedArticles, id]);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    const confirm = await showConfirm({
      title: "آیا مطمئن هستید؟",
      text: "این عمل غیرقابل بازگشت است و مقاله حذف خواهد شد.",
      icon: "warning",
      confirmButtonText: "بله، حذف شود",
    });

    if (confirm) {
      try {
        const res = await fetch(`/api/admin/blog?id=${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          showAlert({
            title: "حذف شد",
            text: "مقاله با موفقیت حذف شد.",
            icon: "success",
            confirmButtonColor: "#eab308",
          });
          setSelectedArticles((prev) => prev.filter((item) => item !== id));
          mutate();
        } else {
          throw new Error("خطا در حذف مقاله");
        }
      } catch {
        showAlert({
          title: "خطا",
          text: "حذف مقاله با خطا مواجه شد.",
          icon: "error",
          confirmButtonColor: "#eab308",
        });
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedArticles.length === 0) return;

    const confirm = await showConfirm({
      title: "آیا مطمئن هستید؟",
      text: `آیا مایلید ${formatNumber(selectedArticles.length)} مقاله انتخاب شده را حذف کنید؟ این عمل غیرقابل بازگشت است.`,
      icon: "warning",
      confirmButtonText: "بله، حذف شوند",
    });

    if (confirm) {
      try {
        setIsDeletingBulk(true);
        await Promise.all(
          selectedArticles.map((id) =>
            fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" })
          )
        );

        showAlert({
          title: "حذف شد",
          text: "مقالات انتخابی با موفقیت حذف شدند.",
          icon: "success",
          confirmButtonColor: "#eab308",
        });
        setSelectedArticles([]);
        mutate();
      } catch {
        showAlert({
          title: "خطا",
          text: "برخی مقالات با خطا مواجه شدند.",
          icon: "error",
          confirmButtonColor: "#eab308",
        });
      } finally {
        setIsDeletingBulk(false);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      draft: "bg-neutral-800 text-neutral-400 border-neutral-700",
      scheduled: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    };
    const labels = {
      published: "منتشر شده",
      draft: "پیش‌نویس",
      scheduled: "زمان‌بندی شده",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full border text-xs font-medium ${
          styles[status as keyof typeof styles] || "bg-neutral-800 text-neutral-400 border-neutral-700"
        }`}
      >
        {labels[status as keyof typeof labels] || "پیش‌نویس"}
      </span>
    );
  };

  const isTableLoading = isLoading || isDeletingBulk;

  return (
    <>
      <div className="bg-neutral-900/60 backdrop-blur-xl border border-amber-500/20 rounded-xl p-6 mb-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500/50" />
            <input
              type="text"
              placeholder="جستجوی مقاله..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-950 border border-amber-500/20 rounded-lg pr-10 pl-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/60 transition-all text-sm"
            />
          </div>

          <div className="relative">
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500/50" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-neutral-950 border border-amber-500/20 rounded-lg pr-10 pl-4 py-3 text-white focus:outline-none focus:border-amber-500/60 appearance-none cursor-pointer text-sm"
            >
              {ARTICLE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-neutral-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500/50" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-neutral-950 border border-amber-500/20 rounded-lg pr-10 pl-4 py-3 text-white focus:outline-none focus:border-amber-500/60 appearance-none cursor-pointer text-sm"
            >
              {ARTICLE_STATUSES.map((status) => (
                <option key={status} value={status} className="bg-neutral-900 text-white">
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-lg mx-auto p-4 mb-6 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-center text-sm">
          خطا در دریافت لیست مقالات مدیریتی.
        </div>
      )}

      {selectedArticles.length > 0 && (
        <div className="bg-amber-500/10 backdrop-blur-xl border border-amber-500/30 rounded-xl p-4 mb-6 flex items-center justify-between shadow-lg">
          <div className="text-white font-medium text-sm">
            <span className="font-bold text-amber-400">
              {formatNumber(selectedArticles.length)}
            </span>{" "}
            مقاله انتخاب شده
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDelete}
              disabled={isDeletingBulk}
              className="bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer text-sm font-bold disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {isDeletingBulk ? "در حال حذف..." : "حذف دسته‌جمعی"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-neutral-900/60 backdrop-blur-xl border border-amber-500/20 rounded-xl overflow-hidden shadow-2xl">
        {isTableLoading ? (
          <div className="min-h-[350px] flex flex-col items-center justify-center text-neutral-400 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-amber-400" />
            <span className="text-sm">در حال پردازش مقالات...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="min-h-[350px] flex flex-col items-center justify-center text-neutral-500 gap-2">
            <Tag className="w-12 h-12 text-amber-500/20 mb-2" />
            <span className="text-sm">هیچ مقاله‌ای یافت نشد.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-amber-500/10 bg-neutral-950/60 text-neutral-400">
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={
                        articles.length > 0 &&
                        selectedArticles.length === articles.length
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-amber-500/30 bg-neutral-950 checked:bg-amber-500 text-neutral-950 cursor-pointer"
                    />
                  </th>
                  <th className="p-4">عنوان مقاله</th>
                  <th className="p-4">نویسنده</th>
                  <th className="p-4">دسته‌بندی</th>
                  <th className="p-4">بازدید</th>
                  <th className="p-4">تاریخ انتشار</th>
                  <th className="p-4">وضعیت</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article._id}
                    className="border-b border-amber-500/10 hover:bg-neutral-800/50 transition-colors"
                  >
                    <td className="p-4 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={selectedArticles.includes(article._id)}
                        onChange={() => handleSelectArticle(article._id)}
                        className="w-4 h-4 rounded border-amber-500/30 bg-neutral-950 checked:bg-amber-500 text-neutral-950 cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-neutral-950 flex-shrink-0 border border-amber-500/20">
                          {article.image ? (
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-amber-500/30">
                              <Tag className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="max-w-xs md:max-w-sm">
                          <div className="text-white font-bold line-clamp-2 leading-relaxed">
                            {article.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-neutral-300">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-400" />
                        {article.authorId?.fullName ||
                          article.authorId?.username ||
                          "مدیر سایت"}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-300 font-mono">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-amber-400" />
                        {formatNumber(article.views || 0)}
                      </div>
                    </td>
                    <td className="p-4 text-neutral-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        {article.publishDate
                          ? new Date(article.publishDate).toLocaleDateString(
                              "fa-IR"
                            )
                          : new Date(article.createdAt).toLocaleDateString(
                              "fa-IR"
                            )}
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(article.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/article/${article.slug}`}
                          target="_blank"
                          className="text-amber-400 hover:text-amber-300 transition-colors p-2 hover:bg-amber-500/10 rounded-lg cursor-pointer"
                          title="مشاهده مقاله"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/articles/editArticles/${article._id}`}
                          className="text-emerald-400 hover:text-emerald-300 transition-colors p-2 hover:bg-emerald-500/10 rounded-lg cursor-pointer"
                          title="ویرایش مقاله"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteArticle(article._id)}
                          className="text-rose-400 hover:text-rose-300 transition-colors p-2 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                          title="حذف مقاله"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isTableLoading && articles.length > 0 && (
          <div className="p-4 border-t border-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-neutral-400 text-sm">
              نمایش {(currentPage - 1) * 10 + 1} تا{" "}
              {Math.min(currentPage * 10, total)} از {formatNumber(total)}{" "}
              مقاله
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
}
