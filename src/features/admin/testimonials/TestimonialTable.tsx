"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import {
  Trash2,
  Eye,
  Star,
  CheckCircle,
  XCircle,
  MessageSquare,
  Trophy,
  Loader2,
  AlertCircle,
  RefreshCw,
  Filter,
} from "lucide-react";
import { showConfirm, showToast, showAlert } from "@/utils/alert";
import AppPagination from "@/components/common/AppPagination";
import type {
  TestimonialTableProps,
  AdminTestimonialItem,
  AdminTestimonialsResponse,
  PopulatedTestimonialUser,
} from "@/types/testimonial";

const fetcher = async (url: string): Promise<AdminTestimonialsResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "خطا در دریافت لیست نظرات");
  }
  return res.json();
};

export default function TestimonialTable({
  initialStatus = "all",
  onView,
}: TestimonialTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const endpoint = `/api/admin/testimonials?page=${currentPage}&limit=8${
    statusFilter !== "all" ? `&status=${statusFilter}` : ""
  }`;

  const { data, error, isLoading, mutate } = useSWR<AdminTestimonialsResponse>(
    endpoint,
    fetcher
  );

  const testimonials: AdminTestimonialItem[] = useMemo(() => {
    return data?.testimonials || [];
  }, [data]);

  const handleDelete = async (id: string, name: string) => {
    const isConfirmed = await showConfirm(
      "حذف نظر ورزشکار",
      `آیا از حذف نظر مربوط به "${name}" اطمینان دارید؟ این عملیات غیرقابل بازگشت است.`,
      "بله، حذف شود",
      "warning"
    );

    if (!isConfirmed) return;

    try {
      setDeletingId(id);

      const optimisticData = data
        ? {
            ...data,
            testimonials: data.testimonials.filter((t) => t._id !== id),
            total: Math.max(0, data.total - 1),
          }
        : undefined;

      await mutate(
        async () => {
          const res = await fetch(`/api/admin/testimonials?id=${id}`, {
            method: "DELETE",
          });

          const result = await res.json();
          if (!res.ok) {
            throw new Error(result.message || "خطا در حذف نظر");
          }

          showToast({ title: "نظر با موفقیت حذف شد", icon: "success" });
          if (testimonials.length === 1 && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
          }
          return optimisticData || { success: true, testimonials: [], total: 0 };
        },
        {
          optimisticData,
          rollbackOnError: true,
          revalidate: true,
        }
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "خطا در برقراری ارتباط با سرور";
      showAlert({
        title: "خطا",
        text: message,
        icon: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      setTogglingId(id);
      const nextStatus = !currentStatus;

      const optimisticData = data
        ? {
            ...data,
            testimonials: data.testimonials.map((t) =>
              t._id === id ? { ...t, isVisible: nextStatus } : t
            ),
          }
        : undefined;

      await mutate(
        async () => {
          const res = await fetch("/api/admin/testimonials", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, isVisible: nextStatus }),
          });

          const result = await res.json();
          if (!res.ok) {
            throw new Error(result.message || "خطا در تغییر وضعیت نمایش");
          }

          showToast({
            title: nextStatus
              ? "نظر در صفحه اصلی فعال شد"
              : "نظر در صفحه اصلی مخفی شد",
            icon: "success",
          });

          return optimisticData || { success: true, testimonials: [], total: 0 };
        },
        {
          optimisticData,
          rollbackOnError: true,
          revalidate: true,
        }
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "خطا در تغییر وضعیت نمایش";
      showAlert({
        title: "خطا",
        text: message,
        icon: "error",
      });
    } finally {
      setTogglingId(null);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("fa-IR");
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 font-semibold ml-1 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-amber-400" />
              <span>فیلتر وضعیت:</span>
            </span>

            <button
              type="button"
              onClick={() => {
                setStatusFilter("all");
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === "all"
                  ? "bg-amber-400 text-neutral-950 shadow-md font-bold"
                  : "bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-amber-400/40"
              }`}
            >
              همه نظرات
            </button>

            <button
              type="button"
              onClick={() => {
                setStatusFilter("visible");
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === "visible"
                  ? "bg-emerald-500 text-neutral-950 shadow-md font-bold"
                  : "bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-emerald-500/40"
              }`}
            >
              فقط فعال در صفحه اصلی
            </button>

            <button
              type="button"
              onClick={() => {
                setStatusFilter("hidden");
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === "hidden"
                  ? "bg-neutral-200 text-neutral-950 shadow-md font-bold"
                  : "bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-white/30"
              }`}
            >
              فقط مخفی‌شده
            </button>
          </div>

          <button
            type="button"
            onClick={() => mutate()}
            title="بروزرسانی جدول"
            className="p-2 rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-amber-400 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center gap-3 text-amber-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs text-neutral-400">
              در حال بارگذاری نظرات...
            </span>
          </div>
        ) : error ? (
          <div className="p-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <p className="text-sm text-red-400">{error.message}</p>
            <button
              type="button"
              onClick={() => mutate()}
              className="px-4 py-2 bg-amber-500 text-neutral-950 rounded-xl text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
            >
              تلاش مجدد
            </button>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <MessageSquare className="w-10 h-10 text-neutral-600 mx-auto" />
            <h4 className="text-base font-bold text-white font-morabbaReg">
              هیچ نظری یافت نشد
            </h4>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              با فیلتر انتخاب‌شده هیچ نظری در سیستم وجود ندارد.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-neutral-300 text-xs font-bold">
                  <th className="p-4">ورزشکار</th>
                  <th className="p-4">دسته‌بندی و نشان</th>
                  <th className="p-4">امتیاز</th>
                  <th className="p-4">متن نظر</th>
                  <th className="p-4">دستاورد</th>
                  <th className="p-4">وضعیت</th>
                  <th className="p-4">تاریخ ثبت</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                {testimonials.map((item) => {
                  const userObj =
                    typeof item.userId === "object"
                      ? (item.userId as PopulatedTestimonialUser)
                      : null;

                  const name =
                    userObj?.fullName ||
                    userObj?.username ||
                    item.name ||
                    "ورزشکار";

                  const avatar = userObj?.avatar || item.avatar;
                  const isDeleting = deletingId === item._id;
                  const isToggling = togglingId === item._id;

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt={name}
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-400/20 shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-neutral-950 font-bold flex items-center justify-center text-xs shrink-0">
                              {name.slice(0, 1)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="font-bold text-white block truncate">
                              {name}
                            </span>
                            <span className="text-[11px] text-neutral-400 truncate block">
                              {userObj?.email || item.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {item.badge}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-white">
                            {item.rating}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 max-w-xs">
                        <p className="text-neutral-300 line-clamp-2 leading-relaxed text-xs">
                          {item.comment}
                        </p>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {item.achievement ? (
                          <span className="inline-flex items-center gap-1 text-xs text-amber-300">
                            <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                            <span className="truncate max-w-[140px]">
                              {item.achievement}
                            </span>
                          </span>
                        ) : (
                          <span className="text-neutral-600">—</span>
                        )}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <button
                          type="button"
                          disabled={isToggling}
                          onClick={() =>
                            handleToggleVisibility(item._id, item.isVisible)
                          }
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                            item.isVisible
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                              : "bg-neutral-800 text-neutral-400 border border-neutral-700 hover:bg-neutral-700 hover:text-white"
                          }`}
                        >
                          {isToggling ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : item.isVisible ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          <span>{item.isVisible ? "فعال" : "مخفی"}</span>
                        </button>
                      </td>

                      <td className="p-4 whitespace-nowrap text-xs text-neutral-400">
                        {formatDate(item.createdAt)}
                      </td>

                      <td className="p-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onView(item)}
                            title="مشاهده جزئیات"
                            className="p-2 rounded-lg text-neutral-300 hover:text-amber-400 hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={() => handleDelete(item._id, name)}
                            title="حذف نظر"
                            className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {isDeleting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {Boolean(data?.totalPages && data.totalPages > 1) && (
          <div className="p-4 border-t border-white/10">
            <AppPagination
              currentPage={currentPage}
              totalPages={data?.totalPages || 1}
              totalItems={data?.total}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

    </>
  );
}
