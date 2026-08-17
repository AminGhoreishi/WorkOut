"use client";

import { useState } from "react";
import useSWR from "swr";
import Pagination from "@/components/common/Pagination";
import {
  Users,
  Search,
  Mail,
  Phone,
  Edit,
  Ban,
  Trash2,
  CheckCircle,
  XCircle,
  RefreshCw,
  UserCheck,
  ShieldAlert,
} from "lucide-react";
import type { IAdminUser, AdminUsersApiResponse } from "@/types/user";
import { showAlert, showConfirm } from "@/utils/alert";
import { getStatusBadge, getRoleBadge, getRoleLabel } from "@/utils/user";
import { formatNumber } from "@/utils/numbers";
import UserEditModal from "../users/UserEditModal";

const fetcher = async (url: string): Promise<AdminUsersApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت لیست مدیران");
  }
  return res.json();
};

export default function AdminAdminsContainer({
  initialAdmins = [],
}: {
  initialAdmins?: IAdminUser[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState<IAdminUser | null>(null);

  const cleanSearch = searchQuery.trim();
  let apiUrl = `/api/admin/user?page=${currentPage}&role=admin`;
  if (filterStatus !== "all") {
    apiUrl += `&status=${filterStatus}`;
  }
  if (cleanSearch) {
    apiUrl += `&search=${encodeURIComponent(cleanSearch)}`;
  }

  const {
    data,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<AdminUsersApiResponse>(apiUrl, fetcher, {
    fallbackData: { users: initialAdmins, totalUsers: initialAdmins.length, totalPage: 1 },
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });

  const rawUsers = (data?.users || data?.userFind || initialAdmins).filter(
    (u) => u.role === "admin"
  );
  const totalPages = data?.totalPage || 1;
  const totalUsers = data?.totalUsers ?? rawUsers.length;
  const activeUsers = rawUsers.filter((u) => u.status === "active" || u.status === "فعال").length;
  const blockedUsers = rawUsers.filter((u) => u.status === "blocked" || u.status === "مسدود").length;

  const users: IAdminUser[] = rawUsers.map((u) => {
    let persianStatus = u.status;
    if (u.status === "active") persianStatus = "فعال";
    else if (u.status === "blocked") persianStatus = "مسدود";
    else if (u.status === "expired") persianStatus = "منقضی";
    return {
      ...u,
      status: persianStatus,
    };
  });

  const handleToggleBlock = async (user: IAdminUser) => {
    const isBlocked = user.status === "مسدود" || user.status === "blocked";
    const title = isBlocked ? "رفع مسدودیت مدیر" : "مسدود کردن مدیر";
    const text = isBlocked
      ? `آیا مطمئن هستید که می‌خواهید دسترسی مدیر «${user.username}» را فعال کنید؟`
      : `آیا مطمئن هستید که می‌خواهید دسترسی مدیر «${user.username}» را مسدود کنید؟`;
    const confirmButtonText = isBlocked ? "بله، فعال شود" : "بله، مسدود شود";
    const confirmButtonColor = isBlocked ? "#10b981" : "#ef4444";

    const confirmed = await showConfirm({
      title,
      text,
      confirmButtonText,
      confirmButtonColor,
      icon: "warning",
    });

    if (confirmed) {
      try {
        const newStatus = isBlocked ? "active" : "blocked";
        const res = await fetch(`/api/admin/user/${user._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });

        const resData = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(resData.error || resData.message || "خطا در انجام عملیات");
        }

        showAlert({
          title: "موفقیت",
          text: isBlocked
            ? "حساب مدیر با موفقیت فعال شد."
            : "حساب مدیر با موفقیت مسدود شد.",
          icon: "success",
        });

        mutate();
      } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : "انجام عملیات با خطا مواجه شد";
        showAlert({
          title: "خطا",
          text: errMessage,
          icon: "error",
        });
      }
    }
  };

  const handleDeleteUser = async (user: IAdminUser) => {
    const confirmed = await showConfirm({
      title: "حذف مدیر",
      text: `آیا مطمئن هستید که می‌خواهید مدیر «${user.username}» را به طور کامل حذف کنید؟`,
      confirmButtonText: "بله، حذف شود",
      confirmButtonColor: "#ef4444",
      icon: "warning",
    });

    if (confirmed) {
      try {
        const res = await fetch(`/api/admin/user/${user._id}`, {
          method: "DELETE",
        });

        const resData = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(resData.message || resData.error || "خطا در حذف مدیر");
        }

        showAlert({
          title: "موفقیت",
          text: "حساب مدیر با موفقیت حذف شد.",
          icon: "success",
        });

        mutate();
      } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : "انجام عملیات با خطا مواجه شد";
        showAlert({
          title: "خطا",
          text: errMessage,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="overflow-hidden font-danaMed" dir="rtl">
      <div className="container mx-auto pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-morabbaReg">
            مدیریت مدیران
          </h1>
          <p className="text-white/60 text-sm">
            مشاهده، ویرایش و مدیریت حساب‌های کاربری با نقش مدیر در سامانه استار فیت
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-4 text-right text-white/80 text-sm font-medium">
                    مدیر
                  </th>
                  <th className="p-4 text-right text-white/80 text-sm font-medium">
                    اطلاعات تماس
                  </th>
                  <th className="p-4 text-right text-white/80 text-sm font-medium">
                    وضعیت
                  </th>
                  <th className="p-4 text-right text-white/80 text-sm font-medium">
                    نقش
                  </th>
                  <th className="p-4 text-right text-white/80 text-sm font-medium">
                    تاریخ ثبت‌نام
                  </th>
                  <th className="p-4 text-right text-white/80 text-sm font-medium">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-12 text-center text-white/50 text-sm"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                        در حال بارگذاری لیست مدیران...
                      </div>
                    </td>
                  </tr>
                ) : swrError ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-12 text-center text-red-400 text-sm"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <p>{swrError.message || "خطا در دریافت لیست مدیران"}</p>
                        <button
                          type="button"
                          onClick={() => mutate()}
                          className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg text-xs hover:bg-white/20 transition-all cursor-pointer font-bold"
                        >
                          <RefreshCw className="w-4 h-4" />
                          تلاش مجدد
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3 text-white/50">
                        <Users className="w-12 h-12 opacity-30" />
                        <p className="text-lg">هیچ مدیری یافت نشد</p>
                        {searchQuery && (
                          <p className="text-sm">
                            نتیجه‌ای برای عبارت «{searchQuery}» پیدا نشد
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-white/5 transition-colors text-white"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center text-xl font-bold text-amber-400 overflow-hidden shrink-0">
                            {user.avatar &&
                            (user.avatar.startsWith("http://") ||
                              user.avatar.startsWith("https://") ||
                              user.avatar.startsWith("/") ||
                              user.avatar.startsWith("data:image")) ? (
                              <img
                                src={user.avatar}
                                alt={user.username || "مدیر"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              user.avatar ||
                              user.username[0]?.toUpperCase() ||
                              "👤"
                            )}
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">
                              {user.username}
                            </div>
                            <div className="text-white/60 text-xs mt-0.5">
                              {user.fullName || user.email || "بدون نام"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-white/70 text-xs">
                            <Mail className="w-3 h-3 text-amber-400" />
                            <span>{user.email || "—"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/70 text-xs ss02">
                            <Phone className="w-3 h-3 text-amber-400" />
                            <span>{user.phone || "—"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold border ${getStatusBadge(user.status)}`}
                        >
                          {user.status === "فعال" && (
                            <CheckCircle className="w-3 h-3" />
                          )}
                          {user.status === "مسدود" && (
                            <XCircle className="w-3 h-3" />
                          )}
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold border ${getRoleBadge(user.role)}`}
                        >
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="p-4 text-white/70 text-sm ss02">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString("fa-IR") : "—"}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingUser(user)}
                            className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                            title="ویرایش"
                          >
                            <Edit className="w-4 h-4 text-white/70" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleBlock(user)}
                            className="w-8 h-8 bg-white/5 hover:bg-red-500/20 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                            title={
                              user.status === "مسدود" || user.status === "blocked"
                                ? "رفع مسدودیت"
                                : "مسدود کردن"
                            }
                          >
                            <Ban
                              className={`w-4 h-4 ${user.status === "مسدود" || user.status === "blocked" ? "text-emerald-400" : "text-red-400"}`}
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user)}
                            className="w-8 h-8 bg-white/5 hover:bg-red-500/20 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                            title="حذف مدیر"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalUsers}
              pageSize={10}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {editingUser && (
          <UserEditModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSaveSuccess={() => {
              setEditingUser(null);
              mutate();
            }}
          />
        )}
      </div>
    </div>
  );
}
