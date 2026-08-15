"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Dumbbell } from "lucide-react";
import UserDropdown from "./UserDropdown";
import MobileMenu from "./MobileMenu";
import type { HeaderProps } from "@/types/components";

export default function Header({
  session,
  authSlot,
  mobileAuthSlot,
}: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? "text-amber-400 font-bold transition-colors"
      : "text-neutral-300 hover:text-amber-400 transition-colors";
  };

  return (
    <nav className="bg-neutral-950/80 backdrop-blur-lg border-b border-amber-500/20 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="font-danaMed">
          <div className="flex justify-between items-center h-16 relative">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-amber-400 focus:outline-none transition-colors"
              aria-label="منوی اصلی"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7 text-amber-400" />
              ) : (
                <Menu className="w-7 h-7 text-amber-400" />
              )}
            </button>

            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-2 group"
            >
              <Image
                src="/android-chrome-192x192.png"
                alt="لوگوی استارفیت"
                width={36}
                height={36}
                className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
              />
              <span className="font-bold max-sm:hidden text-xl text-white font-morabbaReg">
                استارفیت
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <Link href="/" className={getLinkClass("/")}>
                خانه
              </Link>
              <Link href="/packages" className={getLinkClass("/packages")}>
                پکیج‌ها
              </Link>
              <Link href="/nutrition" className={getLinkClass("/nutrition")}>
                کالری شمار
              </Link>
              <Link href="/articles" className={getLinkClass("/articles")}>
                مقالات
              </Link>
              <Link
                href="/introduce"
                className={`${getLinkClass("/introduce")} max-lg:hidden`}
              >
                درباره ما
              </Link>
            </div>

            <div className="hidden md:flex items-center">
              {authSlot ? (
                authSlot
              ) : session ? (
                <UserDropdown
                  username={session.user?.username || ""}
                  avatar={session.user?.avatar || ""}
                  email={session.user?.email || ""}
                  role={session.user?.role || ""}
                />
              ) : (
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold px-6 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                >
                  ورود / ثبت نام
                </Link>
              )}
            </div>

            <Link
              href="/dashboard/workout"
              className="md:hidden p-2 text-neutral-300 hover:text-amber-400 transition-colors"
              aria-label="پکیج‌های ورزشی"
            >
              <Dumbbell className="w-7 h-7 text-amber-400" />
            </Link>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        session={session}
        mobileAuthSlot={mobileAuthSlot}
        getLinkClass={getLinkClass}
      />
    </nav>
  );
}
