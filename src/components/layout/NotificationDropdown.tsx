"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import {
  Bell,
  MessageSquare,
  Dumbbell,
  CreditCard,
  Info,
  Check,
  CheckCheck,
} from "lucide-react";
import type {
  NotificationsApiResponse,
  NotificationDropdownProps,
  IClientNotification,
} from "@/types/notification";

const fetcher = async (url: string): Promise<NotificationsApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("خطا در دریافت اعلان‌ها");
  }
  return res.json();
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "ticket":
      return <MessageSquare className="w-4 h-4 text-amber-400 shrink-0" />;
    case "workout_plan":
      return <Dumbbell className="w-4 h-4 text-blue-400 shrink-0" />;
    case "subscription":
      return <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />;
    default:
      return <Info className="w-4 h-4 text-purple-400 shrink-0" />;
  }
};

export default function NotificationDropdown({
  initialUnreadCount = 0,
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, mutate } = useSWR<NotificationsApiResponse>(
    "/api/user/notifications",
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 5000,
      fallbackData: {
        success: true,
        notifications: [],
        unreadCount: initialUnreadCount,
      },
    }
  );

  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount ?? initialUnreadCount;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMarkAsRead = async (notificationId?: string) => {
    try {
      mutate(
        (current) => {
          if (!current) return current;
          if (notificationId) {
            return {
              ...current,
              unreadCount: Math.max(0, current.unreadCount - 1),
              notifications: current.notifications.map((n) =>
                n._id === notificationId ? { ...n, isRead: true } : n
              ),
            };
          }
          return {
            ...current,
            unreadCount: 0,
            notifications: current.notifications.map((n) => ({
              ...n,
              isRead: true,
            })),
          };
        },
        false
      );

      await fetch("/api/user/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationId ? { notificationId } : { markAll: true }),
      });

      mutate();
    } catch {}
  };

  const handleNotificationClick = (notification: IClientNotification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification._id);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-white/80 hover:text-white transition-all cursor-pointer"
        title="اعلان‌ها"
        aria-label="اعلان‌ها"
      >
        <Bell className="w-5 h-5 text-amber-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold rounded-full text-[10px] flex items-center justify-center px-1 shadow-md animate-pulse">
            {unreadCount > 9 ? "۹+" : unreadCount.toLocaleString("fa-IR")}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-3 w-80 sm:w-96 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden font-danaMed text-right">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-morabbaReg">
                اعلان‌های جدید
              </span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-semibold">
                  {unreadCount.toLocaleString("fa-IR")} خوانده نشده
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => handleMarkAsRead()}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>خواندن همه</span>
              </button>
            )}
          </div>

          <div className="max-h-[380px] overflow-y-auto custom-scrollbar divide-y divide-white/5">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-white/40 space-y-2">
                <Bell className="w-8 h-8 mx-auto opacity-30 text-amber-400" />
                <p className="text-xs">هیچ اعلانی برای نمایش وجود ندارد.</p>
              </div>
            ) : (
              notifications.map((item) => (
                <Link
                  key={item._id}
                  href={item.link || "/dashboard/tickets"}
                  onClick={() => handleNotificationClick(item)}
                  className={`block p-3.5 transition-colors cursor-pointer hover:bg-white/5 ${
                    !item.isRead ? "bg-amber-500/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      {getNotificationIcon(item.type)}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.title}
                        </h4>
                        {!item.isRead && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        )}
                      </div>

                      <p className="text-[11px] text-white/60 line-clamp-2 leading-relaxed">
                        {item.message}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-white/40 pt-1">
                        <span className="ss02">
                          {new Date(item.createdAt).toLocaleDateString("fa-IR", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {!item.isRead && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleMarkAsRead(item._id);
                            }}
                            className="text-white/40 hover:text-amber-400 p-1 rounded transition-colors"
                            title="علامت به عنوان خوانده شده"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="p-3 border-t border-white/10 bg-black/40 text-center">
            <Link
              href="/dashboard/tickets"
              onClick={() => setIsOpen(false)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              مشاهده همه تیکت‌ها و پیام‌ها &larr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
