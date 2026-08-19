"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  LogOut,
  LayoutDashboard,
  Shield,
  User,
  Home,
  Package,
  Utensils,
  Newspaper,
  Headset,
  LogIn,
  ChevronLeft,
} from "lucide-react";
import { signOut } from "next-auth/react";
import type { MobileMenuProps } from "@/types/components";

export default function MobileMenu({
  isOpen,
  onClose,
  session,
  mobileAuthSlot,
  getLinkClass,
}: MobileMenuProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const role = session?.user?.role;
  const username = session?.user?.username;
  const email = session?.user?.email;
  const avatar = session?.user?.avatar;

  const navItems = [
    { href: "/", label: "خانه", icon: Home },
    { href: "/packages", label: "پکیج‌ها", icon: Package },
    { href: "/nutrition", label: "کالری شمار", icon: Utensils },
    { href: "/articles", label: "مقالات", icon: Newspaper },
    { href: "/introduce", label: "درباره ما", icon: User },
    { href: "/dashboard/tickets", label: "پشتیبانی", icon: Headset },
  ];

  return createPortal(
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 h-full w-[290px] max-w-[85vw] bg-neutral-950/95 backdrop-blur-2xl border-l border-amber-500/20 p-5 z-[101] font-danaMed shadow-[0_0_50px_rgba(0,0,0,0.9)] transition-transform duration-300 ease-out flex flex-col justify-between overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between pb-5 border-b border-amber-500/20">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2.5 group"
            >
              <Image
                src="/android-chrome-192x192.png"
                alt="لوگوی استارفیت"
                width={34}
                height={34}
                className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
              />
              <span className="font-bold text-lg text-white font-morabbaReg tracking-wide">
                استارفیت
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-amber-400 hover:bg-neutral-900 rounded-xl transition-all border border-transparent hover:border-amber-500/20 active:scale-95"
              aria-label="بستن منو"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const linkClasses = getLinkClass(item.href);
              const isActive = linkClasses.includes("text-amber-400");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 text-amber-400 font-bold shadow-[0_0_15px_rgba(234,179,8,0.08)]"
                      : "text-neutral-300 hover:text-amber-300 hover:bg-neutral-900/80 border border-transparent hover:border-amber-500/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-amber-500/20 text-amber-400"
                          : "text-neutral-400 group-hover:text-amber-400 group-hover:bg-neutral-800/60"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronLeft
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive
                        ? "text-amber-400 translate-x-0"
                        : "text-neutral-600 group-hover:text-amber-400 group-hover:-translate-x-1"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-5 border-t border-amber-500/20 space-y-3.5 mt-6">
          {mobileAuthSlot ? (
            mobileAuthSlot
          ) : session ? (
            <>
              <div className="bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-amber-500/20 p-3.5 rounded-2xl flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="تصویر کاربر"
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-500 shrink-0 shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 shadow-[0_0_10px_rgba(234,179,8,0.15)]">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div className="overflow-hidden flex-1 min-w-0">
                  <p className="text-white text-sm font-bold truncate">
                    {username || "کاربر استارفیت"}
                  </p>
                  {email ? (
                    <p className="text-neutral-400 text-xs truncate dir-ltr text-right">
                      {email}
                    </p>
                  ) : (
                    <p className="text-amber-400/80 text-[11px]">
                      {role === "admin" ? "مدیر سیستم" : "ورزشکار استارفیت"}
                    </p>
                  )}
                </div>
              </div>

              {role === "admin" ? (
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center justify-between w-full bg-gradient-to-r from-amber-500/20 via-amber-500/15 to-yellow-500/10 hover:from-amber-500/30 hover:to-yellow-500/20 border border-amber-500/40 text-amber-300 font-bold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.1)] text-sm active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>پنل ادمین</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-amber-400" />
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="flex items-center justify-between w-full bg-gradient-to-r from-amber-500/20 via-amber-500/15 to-yellow-500/10 hover:from-amber-500/30 hover:to-yellow-500/20 border border-amber-500/40 text-amber-300 font-bold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.1)] text-sm active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4 text-amber-400" />
                    <span>داشبورد کاربر</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-amber-400" />
                </Link>
              )}

              <button
                onClick={() => {
                  onClose();
                  signOut({ redirect: true, callbackUrl: "/login" });
                }}
                className="flex items-center justify-between w-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold py-2.5 px-4 rounded-xl transition-all text-sm active:scale-[0.98] group"
              >
                <div className="flex items-center gap-2.5">
                  <LogOut className="w-4 h-4 text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
                  <span>خروج از حساب</span>
                </div>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2.5 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] active:scale-[0.98] transition-all text-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>ورود / ثبت نام</span>
            </Link>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}

