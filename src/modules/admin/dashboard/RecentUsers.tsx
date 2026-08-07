"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MoreVertical } from "lucide-react";
import type { RecentUsersProps } from "@/types/admin";
import { gradients, statusMap, roleMap } from "./adminDashboardHelpers";

export default function RecentUsers({ users = [] }: RecentUsersProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const name = (user.fullName || user.username || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    return name.includes(q) || email.includes(q);
  });

  return (
    <div className="lg:col-span-2 min-w-0 bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.05)]">
      <div className="p-4 sm:p-6 border-b border-amber-500/20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-white font-morabbaReg">
            کاربران اخیر
          </h2>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="جستجو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-auto bg-neutral-950 border border-amber-500/20 rounded-xl pr-10 pl-4 py-2 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <Link
              href="/admin/users"
              className="text-amber-400 hover:text-amber-300 text-sm font-bold whitespace-nowrap transition-colors"
            >
              مشاهده همه
            </Link>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-6">
        <div className="space-y-2 sm:space-y-4">
          {filteredUsers.map((user, index) => {
            const displayName = user.fullName || user.username || "?";
            const initial = displayName.charAt(0).toUpperCase();
            const dateStr = new Date(user.createdAt).toLocaleDateString("fa-IR", {
              day: "numeric",
              month: "long",
            });
            const statusInfo = statusMap[user.status] || {
              text: "نامشخص",
              bg: "bg-neutral-800 text-neutral-400 border border-neutral-700",
              dot: "bg-neutral-500",
            };
            const roleInfo = roleMap[user.role];
            const gradientClass = gradients[index % gradients.length];

            return (
              <div
                key={user._id.toString()}
                className="flex items-center justify-between p-3 sm:p-4 bg-neutral-950/60 hover:bg-neutral-950 border border-amber-500/10 hover:border-amber-500/30 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                  <div
                    className={`w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br border rounded-full flex items-center justify-center font-bold text-sm sm:text-base shrink-0 ${gradientClass}`}
                  >
                    {initial}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                      <span className="text-white font-semibold text-sm sm:text-base truncate">
                        {displayName}
                      </span>
                      {roleInfo && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-medium leading-none ${roleInfo.bg}`}
                        >
                          {roleInfo.text}
                        </span>
                      )}
                    </div>
                    <div className="text-neutral-400 text-xs truncate font-mono tracking-wide">
                      {user.email || user.username}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                  <div className="text-left hidden md:block">
                    <div className="text-neutral-500 text-[10px] uppercase tracking-wider mb-0.5">
                      تاریخ عضویت
                    </div>
                    <div className="text-neutral-300 text-xs sm:text-sm font-medium">
                      {dateStr}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1.5 font-medium ${statusInfo.bg}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                    {statusInfo.text}
                  </span>
                  <Link
                    href="/admin/users"
                    className="text-neutral-400 hover:text-white transition-colors p-1.5 hover:bg-amber-500/10 rounded-lg hidden sm:block"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
