"use client";

import { useState, useEffect } from "react";
import { showAlert } from "@/utils/alert";
import type { UserEditModalProps } from "@/types/user";

export default function UserEditModal({
  user,
  onClose,
  onSaveSuccess,
}: UserEditModalProps) {
  const [editUsername, setEditUsername] = useState(user.username || "");
  const [editEmail, setEditEmail] = useState(user.email || "");
  const [editPhone, setEditPhone] = useState(user.phone || "");
  const [editStatus, setEditStatus] = useState(() => {
    if (user.status === "مسدود" || user.status === "blocked") return "blocked";
    if (user.status === "منقضی" || user.status === "expired") return "expired";
    return "active";
  });
  const [editRole, setEditRole] = useState<"user" | "admin" | "coach">(
    user.role || "user",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("fa-IR").format(num || 0);

  const handleSaveEdit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (editRole === "coach" && user.role !== "coach") {
        await fetch("/api/admin/user/promote-coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        });
      }

      const res = await fetch(`/api/admin/user/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: editUsername.trim(),
          email: editEmail.trim(),
          phone: editPhone.trim(),
          role: editRole,
          status: editStatus,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || data.message || "خطا در بروزرسانی مشخصات کاربر");
      }

      showAlert({
        title: "موفقیت",
        text: "تغییرات با موفقیت ذخیره شد!",
        icon: "success",
      });

      onSaveSuccess();
      onClose();
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error ? err.message : "خطا در ذخیره تغییرات";
      showAlert({
        title: "خطا",
        text: errMessage,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-danaMed"
      dir="rtl"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-neutral-900/90 backdrop-blur-lg z-10">
          <h2 className="text-2xl text-white font-bold font-morabbaReg">
            ویرایش اطلاعات کاربر
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors text-2xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-white/10">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center text-4xl font-bold text-amber-400">
              {user.avatar || user.username?.[0]?.toUpperCase() || "👤"}
            </div>
            <div>
              <div className="text-white text-lg font-bold">
                {user.username}
              </div>
              <div className="text-white/60 text-sm">
                {user.email || "بدون ایمیل"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2 text-xs">
                نام کاربری
              </label>
              <input
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-white mb-2 text-xs">
                ایمیل
              </label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-white mb-2 text-xs">
                شماره تلفن
              </label>
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-white mb-2 text-xs">
                پکیج فعال
              </label>
              <input
                type="text"
                value={user.package || "—"}
                disabled
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/50 cursor-not-allowed text-sm"
              />
            </div>
            <div>
              <label className="block text-white mb-2 text-xs">
                وضعیت کاربر
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 text-sm cursor-pointer"
              >
                <option value="active">فعال</option>
                <option value="expired">منقضی</option>
                <option value="blocked">مسدود</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-2 text-xs">نقش کاربر</label>
              <select
                value={editRole}
                onChange={(e) =>
                  setEditRole(
                    e.target.value as "user" | "admin" | "coach"
                  )
                }
                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 text-sm cursor-pointer"
              >
                <option value="user">کاربر</option>
                <option value="coach">مربی</option>
                <option value="admin">ادمین</option>
              </select>
              {editRole === "coach" && user.role !== "coach" && (
                <p className="text-amber-400 text-xs mt-2 font-semibold">
                  ⚠️ با ذخیره، پروفایل مربی برای این کاربر ساخته می‌شود.
                </p>
              )}
            </div>
            <div>
              <label className="block text-white mb-2 text-xs">
                تاریخ عضویت
              </label>
              <input
                type="text"
                value={user.createdAt ? new Date(user.createdAt).toLocaleDateString("fa-IR") : "—"}
                disabled
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/55 cursor-not-allowed text-sm ss02 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-white/60 text-xs mb-1">آخرین ورود</div>
              <div className="text-white font-medium text-sm ss02 font-sans">
                {user.lastLogin || "—"}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-white/60 text-xs mb-1">
                کل پرداخت‌ها
              </div>
              <div className="text-white font-medium text-sm font-morabbaReg">
                {user.totalPayments ? formatNumber(user.totalPayments) : "۰"} تومان
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/10 flex gap-3">
          <button
            type="button"
            onClick={handleSaveEdit}
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors cursor-pointer text-sm font-bold"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}
