"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Shield, LayoutDashboard, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import type { HeaderSession } from "@/types/components";

interface MobileAuthClientProps {
  session?: HeaderSession | null;
  onClose?: () => void;
}

export default function MobileAuthClient({
  session,
  onClose,
}: MobileAuthClientProps) {
  const role = session?.user?.role;
  const username = session?.user?.username;
  const email = session?.user?.email;
  const avatar = session?.user?.avatar;

  if (session) {
    return (
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
              <p className="text-neutral-400 text-xs truncate">{email}</p>
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
            if (onClose) onClose();
            signOut({ redirect: true, callbackUrl: "/login" });
          }}
          className="flex items-center gap-2.5 w-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold py-2.5 px-4 rounded-xl transition-all text-sm"
        >
          <LogOut className="w-4 h-4" />
          خروج
        </button>
      </>
    );
  }

  return (
    <Link
      href="/login"
      onClick={onClose}
      className="block text-center bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.3)] text-sm"
    >
      ورود / ثبت نام
    </Link>
  );
}
