"use client";
import Link from "next/link";
import { Bell, Menu, Settings } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import type { AdminHeaderProps } from "@/types/admin";

export default function AdminHeader({
  username = "مدیر",
  role = "admin",
  avatar = "م",
  newTicketsCount = 0,
}: AdminHeaderProps) {
  const { onToggle } = useSidebar();

  return (
    <nav className="bg-neutral-950/80 backdrop-blur-lg border-b border-amber-500/20 sticky top-0 z-40 font-danaMed">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggle}
              className="lg:hidden w-10 h-10 bg-neutral-900 hover:bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center transition-colors"
            >
              <Menu className="w-6 h-6 text-amber-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white font-morabbaReg">
                داشبورد مدیریت
              </h1>
              <p className="text-neutral-400 text-xs">خوش آمدید، {username}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/tickets"
              className="relative text-neutral-300 hover:text-amber-400 transition-colors p-1.5 flex items-center justify-center"
              title="تیکت‌های جدید"
            >
              <Bell className="w-6 h-6" />
              {newTicketsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold rounded-full text-xs flex items-center justify-center px-1 shadow-md animate-pulse">
                  {newTicketsCount.toLocaleString("fa-IR")}
                </span>
              )}
            </Link>

            <div className="hidden md:flex items-center gap-3 pr-4 border-r border-amber-500/20">
              <div className="text-left">
                <div className="text-white text-sm font-semibold">
                  {username}
                </div>
                <div className="text-amber-400/80 text-xs">
                  {role === "admin" ? "مدیر سیستم" : "مربی"}
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
