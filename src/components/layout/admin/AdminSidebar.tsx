"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, Menu, LogOut } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAdminMenuItems, getUserMenuItems } from "./sidebarItems";

export default function AdminSidebar({ isAdmin = false }) {
  const { isOpen, onToggle } = useSidebar();
  const pathname = usePathname();

  const [counts, setCounts] = useState({
    users: 0,
    subscriptions: 0,
    articles: 0,
    comments: 0,
    wishlist: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/sidebar-stats");
        if (res.ok) {
          const data = await res.json();
          setCounts((prev) => ({
            ...prev,
            users: data.usersCount || 0,
            subscriptions: data.subscriptionsCount || 0,
            articles: data.articlesCount || 0,
            comments: data.commentsCount ?? data.pendingCommentsCount ?? 0,
          }));
        }
      } catch (err) {
        console.error("Failed to load sidebar stats:", err);
      }
    }

    async function loadUserStats() {
      try {
        const res = await fetch("/api/user/wishlist-count");
        if (res.ok) {
          const data = await res.json();
          setCounts((prev) => ({
            ...prev,
            wishlist: data.count || 0,
          }));
        }
      } catch (err) {
        console.error("Failed to load user wishlist count:", err);
      }
    }

    if (isAdmin) {
      loadStats();
    } else {
      loadUserStats();
    }
  }, [isAdmin, pathname]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  const menuItems = isAdmin
    ? getAdminMenuItems(counts, formatNumber)
    : getUserMenuItems(counts, formatNumber);

  const sidebarStyle = "bg-neutral-950/95 border-l border-amber-500/20";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[90] lg:hidden backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 h-full backdrop-blur-xl transition-all duration-300 z-[100] overflow-hidden
          w-64
          ${sidebarStyle}
          ${isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full shadow-none"}
          lg:translate-x-0
          ${isOpen ? "lg:w-64" : "lg:w-18"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-amber-500/20 font-danaMed">
          {isOpen ? (
            <>
              <Link href="/" className="flex items-center gap-2 group">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="استار فیت"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
                />
                <span className="font-bold text-lg text-white font-morabbaReg">
                  استار فیت
                </span>
              </Link>
              <button
                onClick={onToggle}
                className="w-8 h-8 bg-neutral-900 hover:bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-amber-400" />
              </button>
            </>
          ) : (
            <button onClick={onToggle} className="w-full flex justify-center cursor-pointer">
              <Menu className="w-6 h-6 text-amber-400" />
            </button>
          )}
        </div>

        <div className="h-[calc(100vh-8rem)] overflow-y-auto py-4 px-3 font-danaMed">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {isOpen && (
                <h3 className="text-amber-400/70 text-xs font-semibold mb-3 px-3">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    item.href === "/dashboard" || item.href === "/admin"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        if (
                          typeof window !== "undefined" &&
                          window.innerWidth < 1024
                        ) {
                          onToggle();
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold shadow-md"
                          : "text-neutral-300 hover:bg-amber-500/10 hover:text-amber-300"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-neutral-950" : "text-amber-400"}`} />
                      {isOpen && (
                        <>
                          <span className="flex-1 text-right text-sm">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                isActive
                                  ? "bg-neutral-950/20 text-neutral-950 font-bold"
                                  : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 bg-neutral-950 left-0 right-0 p-3 border-t border-amber-500/20 font-danaMed">
          <Link
            href="/logout"
            className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isOpen && <span className="flex-1 text-right text-sm">خروج</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
