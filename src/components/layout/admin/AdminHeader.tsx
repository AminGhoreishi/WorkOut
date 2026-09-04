"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import NotificationDropdown from "../NotificationDropdown";
import type { AdminHeaderProps } from "@/types/admin";

export default function AdminHeader({
  username = "کاربر",
  role,
  avatar = "ک",
  newTicketsCount = 0,
  unreadNotificationsCount = 0,
}: AdminHeaderProps) {
  const { onToggle } = useSidebar();
  const pathname = usePathname();
  const isAdminPanel = pathname?.startsWith("/admin");

  return (
    <nav className="bg-neutral-950/80 backdrop-blur-lg border-b border-amber-500/20 sticky top-0 z-40 font-danaMed">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggle}
              className="lg:hidden w-10 h-10 bg-neutral-900 hover:bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6 text-amber-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white font-morabbaReg">
                {isAdminPanel ? "داشبورد مدیریت" : "داشبورد کاربری"}
              </h1>
              <p className="text-neutral-400 text-xs">خوش آمدید، {username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAdminPanel ? (
              <Link
                href="/admin/tickets"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all shadow-[0_0_10px_rgba(234,179,8,0.1)] hover:border-amber-400/50 cursor-pointer"
                title="تیکت‌های جدید"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">تیکت‌های جدید</span>
                {newTicketsCount > 0 && (
                  <span className="min-w-[18px] h-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold rounded-full text-[10px] flex items-center justify-center px-1 shadow-md animate-pulse">
                    {newTicketsCount.toLocaleString("fa-IR")}
                  </span>
                )}
              </Link>
            ) : (
              <NotificationDropdown initialUnreadCount={unreadNotificationsCount} />
            )}

            <div className="hidden lg:flex items-center gap-3 pr-4 border-r border-amber-500/20">
              <div className="text-left">
                <div className="text-white text-sm font-semibold">
                  {username}
                </div>
                <div className="text-amber-400/80 text-xs">
                  {role === "admin" ? "مدیر سیستم" : "شاگرد"}
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold rounded-full flex items-center justify-center shadow-md border border-amber-400">
                {avatar}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
