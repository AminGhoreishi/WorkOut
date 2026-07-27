"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import UserDropdown from "./UserDropdown";
import type { MobileMenuProps } from "@/types/components";

export default function MobileMenu({
  isOpen,
  onClose,
  session,
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
          isOpen ? "left-0" : "-left-64"
        } bottom-0 h-screen w-64 bg-neutral-950 border-r border-amber-500/20 p-6 z-[101] font-danaMed flex flex-col justify-between overflow-y-auto shadow-2xl transition-all duration-300 ease-in-out`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-amber-500/20">
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

        <div className="pt-6 border-t border-amber-500/20 mt-6">
          {session ? (
            <UserDropdown
              username={session.user?.username || ""}
              avatar={session.user?.avatar || ""}
              email={session.user?.email || ""}
              role={session.user?.role || ""}
            />
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="block text-center bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            >
              ورود / ثبت نام
            </Link>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
