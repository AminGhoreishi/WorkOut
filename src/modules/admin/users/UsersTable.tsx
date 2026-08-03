"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Pagination from "@/components/AdminPagination";
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  Package,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import type { IAdminUser, AdminUsersApiResponse } from "@/types/user";
import { showAlert, showConfirm } from "@/utils/alert";
import { getStatusBadge, getRoleBadge, getRoleLabel } from "@/utils/user";
import UserEditModal from "./UserEditModal";
import UsersStats from "./UsersStats";

const fetcher = async (url: string): Promise<AdminUsersApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در دریافت لیست کاربران");
  }
  return res.json();
};

export default function UsersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<IAdminUser | null>(null);

  const cleanSearch = searchQuery.trim();
  const apiUrl = cleanSearch
    ? `/api/admin/search?query=${encodeURIComponent(cleanSearch)}`
    : `/api/admin/user?page=${currentPage}`;

  const {
    data,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<AdminUsersApiResponse>(apiUrl, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });

  const rawUsers = data?.users || data?.userFind || [];
  const totalPages = data?.totalPage || 1;
  const totalUsers = data?.totalUsers || rawUsers.length;
  const activeUsers = data?.activeUsers || 0;
  const expiredUsers = data?.expiredUsers || 0;
  const blockedUsers = data?.blockedUsers || 0;

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

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleEdit = (user: IAdminUser) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleToggleBlock = async (user: IAdminUser) => {
    const isBlocked = user.status === "مسدود" || user.status === "blocked";
    const title = isBlocked ? "رفع مسدودیت کاربر" : "مسدود کردن کاربر";
    const text = isBlocked
      ? `آیا مطمئن هستید که می‌خواهید دسترسی کاربر «${user.username}» را فعال کنید؟`
      : `آیا مطمئن هستید که می‌خواهید دسترسی کاربر «${user.username}» را مسدود کنید؟`;
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
            ? "کاربر با موفقیت فعال شد."
            : "کاربر با موفقیت مسدود شد.",
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

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("fa-IR").format(num || 0);

  const filteredUsers = users.filter((u) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return u.status === "فعال" || u.status === "active";
    if (filterStatus === "expired") return u.status === "منقضی" || u.status === "expired";
    if (filterStatus === "blocked") return u.status === "مسدود" || u.status === "blocked";
    return true;
  });

  return (
    <>
      <UsersStats
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        expiredUsers={expiredUsers}
        blockedUsers={blockedUsers}
      />

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6 font-danaMed">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="جستجو براساس نام کاربری، ایمیل یا شماره تلفن..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-lg pr-12 pl-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 text-sm cursor-pointer"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="expired">منقضی</option>
              <option value="blocked">مسدود</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-2xl font-danaMed">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 text-right">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 cursor-pointer"
                    checked={
                      filteredUsers.length > 0 &&
                      selectedUsers.length === filteredUsers.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map((u) => u._id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </th>
                <th className="p-4 text-right text-white/80 text-sm font-medium">
                  کاربر
                </th>
                <th className="p-4 text-right text-white/80 text-sm font-medium">
                  تماس
                </th>
                <th className="p-4 text-right text-white/80 text-sm font-medium">
                  پکیج فعال
                </th>
                <th className="p-4 text-right text-white/80 text-sm font-medium">
                  وضعیت
                </th>
                <th className="p-4 text-right text-white/80 text-sm font-medium">
                  نقش
                </th>
                <th className="p-4 text-right text-white/80 text-sm font-medium">
                  تاریخ عضویت
                </th>
                <th className="p-4 text-right text-white/80 text-sm font-medium">
                  آخرین ورود
                </th>
                <th className="p-4 text-right text-white/80 text-sm font-medium">
                  کل پرداخت
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
                    colSpan={10}
                    className="p-12 text-center text-white/50 text-sm"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                      در حال بارگذاری اطلاعات کاربران...
                    </div>
                  </td>
                </tr>
              ) : swrError ? (
                <tr>
                  <td
                    colSpan={10}
                    className="p-12 text-center text-red-400 text-sm"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <p>{swrError.message || "خطا در دریافت لیست کاربران"}</p>
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
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3 text-white/50">
                      <Users className="w-12 h-12 opacity-30" />
                      <p className="text-lg">کاربری پیدا نشد</p>
                      {searchQuery && (
                        <p className="text-sm">
                          نتیجه‌ای برای جستجوی «{searchQuery}» یافت نشد
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-white/5 transition-colors text-white"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => toggleUserSelection(user._id)}
                        className="w-4 h-4 rounded border-white/20 cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center text-xl font-bold text-amber-400">
                          {user.avatar ||
                            user.username[0]?.toUpperCase() ||
                            "👤"}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">
                            {user.username}
                          </div>
                          <div className="text-white/60 text-xs mt-0.5">
                            {user.email || "بدون ایمیل"}
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
                        <div className="flex items-center gap-2 text-white/70 text-xs ss02 font-sans">
                          <Phone className="w-3 h-3 text-amber-400" />
                          <span>{user.phone || "—"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Package className="w-4 h-4 text-amber-400" />
                        {user.package || "—"}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold border ${getStatusBadge(user.status)}`}
                      >
                        {user.status === "فعال" && (
                          <CheckCircle className="w-3 h-3" />
                        )}
                        {user.status === "منقضی" && (
                          <Calendar className="w-3 h-3" />
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
                    <td className="p-4 text-white/70 text-sm ss02 font-sans">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("fa-IR") : "—"}
                    </td>
                    <td className="p-4 text-white/70 text-sm ss02 font-sans">
                      {user.lastLogin || "—"}
                    </td>
                    <td className="p-4">
                      <span className="text-white font-medium font-morabbaReg">
                        {user.totalPayments
                          ? formatNumber(user.totalPayments)
                          : "۰"}
                      </span>
                      <span className="text-white/60 text-xs mr-1">تومان</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(user)}
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
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-white/60 text-sm ss02 font-sans">
            نمایش {Math.max(0, (currentPage - 1) * 10 + 1)} تا{" "}
            {Math.min(currentPage * 10, totalUsers)} از{" "}
            {formatNumber(totalUsers)} کاربر
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      {selectedUsers.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold backdrop-blur-lg border border-amber-400 rounded-xl p-4 shadow-2xl z-50 font-danaMed">
          <div className="flex items-center gap-4">
            <span className="text-neutral-950 font-bold text-sm">
              {formatNumber(selectedUsers.length)} کاربر انتخاب شده
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedUsers([])}
                className="bg-neutral-950/20 hover:bg-neutral-950/30 text-neutral-950 px-4 py-2 rounded-lg transition-colors text-xs font-bold cursor-pointer"
              >
                لغو انتخاب‌ها
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingUser && (
        <UserEditModal
          user={editingUser}
          onClose={() => {
            setShowEditModal(false);
            setEditingUser(null);
          }}
          onSaveSuccess={() => mutate()}
        />
      )}
    </>
  );
}
