"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { BiUser, BiLogOut, BiCog, BiShieldAlt2 } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import Image from "next/image";
import type { UserDropdownProps } from "@/types/components";

export default function UserDropdown({
  username = "کاربر",
  avatar,
  email = "",
  role = "user",
}: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        portalRef.current &&
        !portalRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleToggle = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen((p) => !p);
  };

  const dropdown = (
    <div
      ref={portalRef}
      style={{ top: `${pos.top}px`, right: `${pos.right}px` }}
      className="fixed font-danaMed! w-60 bg-zinc-950/95 backdrop-blur-xl border border-amber-500/25 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] z-[9999] overflow-hidden"
      dir="rtl"
    >
      <div className="px-4 py-3.5 border-b border-amber-500/15 flex items-center gap-3">
        {avatar ? (
          <Image
            src={avatar}
            alt={username}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)] shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
            <BiUser className="w-5 h-5 text-zinc-950" />
          </div>
        )}
        <div className="overflow-hidden min-w-0">
          <p className="text-amber-100 text-sm font-bold truncate">{username}</p>
          {email && <p className="text-zinc-400 text-xs truncate">{email}</p>}
          <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1">
            <BiShieldAlt2 className="w-3 h-3" />
            {role === "admin" ? "مدیر کل" : role === "coach" ? "مربی" : "ورزشکار"}
          </span>
        </div>
      </div>

      <div className="py-1.5">
        {role === "admin" ? (
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-zinc-300 hover:bg-amber-500/10 hover:text-amber-300 transition-colors text-xs sm:text-sm font-medium"
          >
            <MdDashboard className="w-4 h-4 text-amber-400" />
            پنل ادمین
          </Link>
        ) : (
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-zinc-300 hover:bg-amber-500/10 hover:text-amber-300 transition-colors text-xs sm:text-sm font-medium"
          >
            <MdDashboard className="w-4 h-4 text-amber-400" />
            داشبورد کاربری
          </Link>
        )}

        <Link
          href="/dashboard/profile"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-4 py-2.5 text-zinc-300 hover:bg-amber-500/10 hover:text-amber-300 transition-colors text-xs sm:text-sm font-medium"
        >
          <BiCog className="w-4 h-4 text-amber-400" />
          تنظیمات پروفایل
        </Link>
      </div>

      <div className="border-t border-amber-500/15 py-1.5">
        <button
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: "https://starfitteam.ir/login",
            })
          }
          className="flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-colors text-xs sm:text-sm font-medium w-full cursor-pointer"
        >
          <BiLogOut className="w-4 h-4" />
          خروج از حساب
        </button>
      </div>
    </div>
  );

  return (
    <div ref={ref}>
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer group"
      >
        {avatar ? (
          <Image
            src={avatar}
            alt={username}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover border-2 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)] shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
            <BiUser className="w-5 h-5 text-zinc-950" />
          </div>
        )}
        <span className="text-amber-100 text-xs sm:text-sm font-medium hidden md:block group-hover:text-amber-300 transition-colors">
          {username}
        </span>
        <svg
          className={`w-4 h-4 text-amber-400/70 transition-transform duration-200 ${open ? "rotate-180 text-amber-400" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open &&
        typeof window !== "undefined" &&
        createPortal(dropdown, document.body)}
    </div>
  );
}
