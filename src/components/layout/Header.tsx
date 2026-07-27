"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UserDropdown from "./UserDropdown";

export default function Header({ session }: { session: any }) {
  const pathname = usePathname();

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
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/android-chrome-192x192.png"
                alt="لوگوی استارفیت"
                width={36}
                height={36}
                className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
              />
              <span className="font-bold text-xl text-white font-morabbaReg">
                استارفیت
              </span>
            </Link>
            <div className="hidden md:flex gap-8">
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
                href="/dashboard/tickets"
                className={getLinkClass("/tickets")}
              >
                پشتیبانی
              </Link>
            </div>

            {session ? (
              <UserDropdown
                username={session.user.username}
                avatar={session.user.avatar}
                email={session.user.email}
                role={session.user.role}
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
        </div>
      </div>
    </nav>
  );
}
