"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { X, LogOut, LayoutDashboard, Shield, User } from "lucide-react";
import { signOut } from "next-auth/react";
import type { MobileMenuProps } from "@/types/components";

export default function MobileMenu({
  isOpen,
  onClose,
  session,
  mobileAuthSlot,
  getLinkClass,
}: MobileMenuProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return createPortal(
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 ${
          isOpen ? "right-0" : "-right-64"
        } bottom-0 h-screen w-64 bg-neutral-950 border-l border-amber-500/20 p-6 z-[101] font-danaMed overflow-y-auto shadow-2xl transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col justify-between h-full min-h-full">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-amber-500/20">
              <Link href="/" onClick={onClose} className="flex items-center gap-2">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="لوگوی استارفیت"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span className="font-bold text-lg text-white font-morabbaReg">
                  استارفیت
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-amber-400 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={onClose}
                className={`text-base ${getLinkClass("/")}`}
              >
                خانه
              </Link>
              <Link
                href="/packages"
                onClick={onClose}
                className={`text-base ${getLinkClass("/packages")}`}
              >
                پکیج‌ها
              </Link>
              <Link
                href="/nutrition"
                onClick={onClose}
                className={`text-base ${getLinkClass("/nutrition")}`}
              >
                کالری شمار
              </Link>
              <Link
                href="/articles"
                onClick={onClose}
                className={`text-base ${getLinkClass("/articles")}`}
              >
                مقالات
              </Link>
              <Link
                href="/dashboard/tickets"
                onClick={onClose}
                className={`text-base ${getLinkClass("/tickets")}`}
              >
                پشتیبانی
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-amber-500/20 space-y-3">
            {mobileAuthSlot ? (
              mobileAuthSlot
            ) : session ? (
              <>
                <div className="flex items-center gap-3 pb-3 border-b border-amber-500/10">
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt="تصویر کاربر"
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-500 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-white text-sm font-bold truncate">
                      {username || "کاربر استارفیت"}
                    </p>
                    {email && (
                      <p className="text-neutral-400 text-xs truncate">
                        {email}
                      </p>
                    )}
                  </div>
                </div>

                {role === "admin" ? (
                  <Link
                    href="/admin"
                    onClick={onClose}
                    className="flex items-center gap-2.5 w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold py-2.5 px-4 rounded-xl transition-all text-sm"
                  >
                    <Shield className="w-4 h-4" />
                    پنل ادمین
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={onClose}
                    className="flex items-center gap-2.5 w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold py-2.5 px-4 rounded-xl transition-all text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    داشبورد
                  </Link>
                )}

                <button
                  onClick={() => {
                    onClose();
                    signOut({ redirect: true, callbackUrl: "/login" });
                  }}
                  className="flex items-center gap-2.5 w-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold py-2.5 px-4 rounded-xl transition-all text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  خروج
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={onClose}
                className="block text-center bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.3)] text-sm"
              >
                ورود / ثبت نام
              </Link>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
