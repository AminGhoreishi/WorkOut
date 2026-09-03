"use client";

import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import useSWR from "swr";
import {
  Loader2,
  Edit,
  Trash2,
  Search,
  Trophy,
  Activity,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import type {
  SubscriptionItem,
  SubscriptionsTableRef,
  SubscriptionsTableProps,
  SubscriptionsApiResponse,
} from "@/types/workout";
import { showAlert, showConfirm } from "@/utils/alert";
import AppPagination from "@/components/common/AppPagination";
import UserFitnessProfileModal from "./UserFitnessProfileModal";

const fetcher = async (url: string): Promise<SubscriptionsApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در بارگذاری لیست اشتراک‌ها");
  }
  return res.json();
};

const SubscriptionsTable = forwardRef<SubscriptionsTableRef, SubscriptionsTableProps>(
  function SubscriptionsTable({ onOpenPlanModal, onOpenMealPlanModal, onEdit, onStatsUpdate }, ref) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [fitnessProfileUser, setFitnessProfileUser] = useState<{
      id: string;
      name: string;
    } | null>(null);

    const apiUrl = `/api/admin/subscription?page=${currentPage}&limit=8&status=${statusFilter}&search=${encodeURIComponent(debouncedSearch)}`;

    const {
      data,
      error,
      isLoading,
      mutate,
    } = useSWR<SubscriptionsApiResponse>(apiUrl, fetcher, {
      revalidateOnFocus: false,
      keepPreviousData: true,
    });

    useImperativeHandle(
      ref,
      () => ({
        refresh() {
          mutate();
        },
      }),
      [mutate]
    );

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(searchTerm);
        setCurrentPage(1);
      }, 500);
      return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
      if (error) {
        showAlert({
          title: "خطا",
          text: error.message || "خطا در بارگذاری اشتراک‌ها",
          icon: "error",
        });
      }
    }, [error]);

 

    const formatDate = (dateString?: string) => {
      if (!dateString) return "-";
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString("fa-IR");
      } catch {
        return dateString;
      }
    };

    const getStatusBadge = (status: SubscriptionItem["status"]) => {
      const styles = {
        active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        trial: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        expired: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
      };

      const labels = {
        active: "فعال",
        trial: "تست (Trial)",
        expired: "منقضی شده",
        cancelled: "لغو شده",
      };

      return (
        <span
          className={`px-2.5 py-1 rounded-full border text-sm font-medium ${styles[status]}`}
        >
          {labels[status]}
        </span>
      );
    };

    const handleDeleteSubscription = async (id: string) => {
      const confirmed = await showConfirm({
        title: "حذف اشتراک",
        text: "آیا از حذف این اشتراک اطمینان دارید؟",
        confirmButtonText: "بله، حذف شود",
        icon: "warning",
      });

      if (!confirmed) return;

      try {
        const res = await fetch(`/api/admin/subscription?id=${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          showAlert({
            title: "موفقیت",
            text: "اشتراک با موفقیت حذف شد",
            icon: "success",
          });
          mutate();
        } else {
          const err = await res.json().catch(() => ({}));
          showAlert({
            title: "خطا",
            text: err.message || "خطا در حذف اشتراک",
            icon: "error",
          });
        }
      } catch {
        showAlert({
          title: "خطا",
          text: "خطا در برقراری ارتباط با سرور",
          icon: "error",
        });
      }
    };

    return (
      <div className="space-y-6 font-danaMed" dir="rtl">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="جستجو در نام، یوزرنیم، ایمیل یا شماره..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pr-10 pl-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/30 transition-colors text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto py-1">
            <span className="text-white/60 text-sm whitespace-nowrap ml-2">
              وضعیت:
            </span>
            {["all", "active", "trial", "expired", "cancelled"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-lg border text-sm sm:text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${ statusFilter === st ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold border-amber-400" : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10" }`}
              >
                {st === "all"
                  ? "همه"
                  : st === "active"
                    ? "فعال"
                    : st === "trial"
                      ? "آزمایشی"
                      : st === "expired"
                        ? "منقضی شده"
                        : "لغو شده"}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl">
          <div className="overflow-x-auto min-h-[360px] pb-28">
            <table className="w-full min-w-[650px] text-right border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-white/60 text-sm whitespace-nowrap">
                  <th className="p-4 font-semibold">کاربر</th>
                  <th className="p-4 font-semibold">پکیج</th>
                  <th className="p-4 font-semibold">شروع</th>
                  <th className="p-4 font-semibold">پایان</th>
                  <th className="p-4 font-semibold">وضعیت</th>
                  <th className="p-4 font-semibold text-center">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      <div className="flex items-center justify-center gap-2 text-white/60">
                        <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                        <span>در حال بارگذاری اطلاعات...</span>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-red-400">
                      خطا در بارگذاری اطلاعات اشتراک‌ها
                    </td>
                  </tr>
                ) : !data?.subscriptions || data.subscriptions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-white/40">
                      هیچ اشتراکی پیدا نشد
                    </td>
                  </tr>
                ) : (
                  data.subscriptions.map((sub) => (
                    <tr
                      key={sub._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors text-white text-sm"
                    >
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold rounded-full flex items-center justify-center shadow-md shrink-0">
                            {sub.userId?.fullName?.charAt(0) ||
                              sub.userId?.username?.charAt(0) ||
                              "U"}
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              {sub.userId?.fullName || "کاربر ناشناس"}
                            </div>
                            <div className="text-white/50 text-sm">
                              @{sub.userId?.username || "username"} |{" "}
                              {sub.userId?.phone || sub.userId?.email || "-"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="font-semibold text-amber-400">
                          {sub.packageId?.name || "پکیج حذف شده"}
                        </span>
                      </td>
                      <td className="p-4 text-white/80 whitespace-nowrap ss02">
                        {formatDate(sub.startsAt)}
                      </td>
                      <td className="p-4 text-white/80 whitespace-nowrap ss02">
                        {formatDate(sub.endsAt)}
                      </td>
                      <td className="p-4 whitespace-nowrap">{getStatusBadge(sub.status)}</td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <div className="relative inline-block text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenDropdownId(
                                openDropdownId === sub._id ? null : sub._id
                              )
                            }
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 text-sm transition-colors cursor-pointer"
                          >
                            <span>عملیات</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${ openDropdownId === sub._id ? "rotate-180" : "" }`}
                            />
                          </button>

                          {openDropdownId === sub._id && (
                            <>
                              <div
                                className="fixed inset-0 z-20"
                                onClick={() => setOpenDropdownId(null)}
                              />
                              <div className="absolute left-0 top-full mt-1.5 w-48 bg-neutral-900/95 border border-white/15 rounded-xl shadow-2xl z-30 overflow-hidden py-1.5 backdrop-blur-xl">

                                <Link
                                  href={`/admin/pr?userId=${encodeURIComponent(
                                    (typeof sub.userId === "object"
                                      ? sub.userId?._id
                                      : sub.userId) || ""
                                  )}`}
                                  onClick={() => setOpenDropdownId(null)}
                                  className="w-full text-right px-3.5 py-2 text-sm text-amber-300 hover:bg-amber-500/15 flex items-center gap-2.5 transition-colors cursor-pointer"
                                >
                                  <Trophy className="w-4 h-4 text-amber-400" />
                                  <span>رکوردهای شخصی (PR)</span>
                                </Link>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    const id =
                                      typeof sub.userId === "object"
                                        ? sub.userId?._id
                                        : sub.userId;
                                    const name =
                                      typeof sub.userId === "object"
                                        ? sub.userId?.fullName ||
                                          sub.userId?.username ||
                                          "کاربر"
                                        : "کاربر";
                                    if (id) {
                                      setFitnessProfileUser({ id, name });
                                    }
                                  }}
                                  className="w-full text-right px-3.5 py-2 text-sm text-emerald-300 hover:bg-emerald-500/15 flex items-center gap-2.5 transition-colors cursor-pointer"
                                >
                                  <Activity className="w-4 h-4 text-emerald-400" />
                                  <span>پروفایل ورزشی</span>
                                </button>

                                <div className="my-1 border-t border-white/10" />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    onEdit(sub);
                                  }}
                                  className="w-full text-right px-3.5 py-2 text-sm text-blue-300 hover:bg-blue-500/15 flex items-center gap-2.5 transition-colors cursor-pointer"
                                >
                                  <Edit className="w-4 h-4 text-blue-400" />
                                  <span>ویرایش</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    handleDeleteSubscription(sub._id);
                                  }}
                                  className="w-full text-right px-3.5 py-2 text-sm text-rose-400 hover:bg-rose-500/15 flex items-center gap-2.5 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4 text-rose-400" />
                                  <span>حذف اشتراک</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {((data?.totalPages ?? 0) > 1) && (
            <div className="p-4">
              <AppPagination
                currentPage={currentPage}
                totalPages={data?.totalPages || 1}
                totalItems={data?.total}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        {fitnessProfileUser && (
          <UserFitnessProfileModal
            userId={fitnessProfileUser.id}
            userName={fitnessProfileUser.name}
            onClose={() => setFitnessProfileUser(null)}
          />
        )}
      </div>
    );
  }
);

export default SubscriptionsTable;
