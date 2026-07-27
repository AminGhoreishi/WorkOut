import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Calendar,
  DollarSign,
  Search,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import type { AdminDashboardAdminProps } from "@/types/admin";
import RecentComments from "./RecentComments";

const gradients = [
  "from-amber-500/20 to-yellow-600/10 text-amber-300 border-amber-500/30",
  "from-yellow-500/20 to-amber-600/10 text-yellow-300 border-amber-500/30",
  "from-amber-400/20 to-amber-600/10 text-amber-200 border-amber-500/30",
];

const statusMap: Record<string, { text: string; bg: string; dot: string }> = {
  active: {
    text: "فعال",
    bg: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
    dot: "bg-amber-400 animate-pulse",
  },
  expired: {
    text: "منقضی شده",
    bg: "bg-neutral-800 text-neutral-400 border border-neutral-700",
    dot: "bg-neutral-500",
  },
  blocked: {
    text: "مسدود شده",
    bg: "bg-red-500/10 text-red-400 border border-red-500/30",
    dot: "bg-red-400",
  },
};

const roleMap: Record<string, { text: string; bg: string }> = {
  admin: {
    text: "مدیر",
    bg: "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold",
  },
  coach: {
    text: "مربی",
    bg: "bg-yellow-500/10 text-yellow-300 border border-yellow-500/30",
  },
};

export default async function AdminDashboardAdmin({
  usersCount = 0,
  publishedBlogsCount = 0,
  openTicketsCount = 0,
}: AdminDashboardAdminProps) {
  await dbConnect();

  const users = await User.find({}, "username email fullName role status createdAt")
    .sort({ createdAt: -1 })
    .limit(5);

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden font-danaMed">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-4 sm:p-6 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-1 sm:mb-2 font-morabbaReg">
            {usersCount.toLocaleString("fa-IR")}
          </div>
          <div className="text-neutral-400 text-xs sm:text-sm">کاربران فعال</div>
          <div className="text-amber-300 text-xs mt-1 sm:mt-2 hidden sm:block font-semibold">
            +۱۲% نسبت به ماه قبل
          </div>
          <div className="text-amber-300 text-xs mt-1 sm:hidden">+۱۲%</div>
        </div>

        <div className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-4 sm:p-6 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          </div>
          <div className="text-xl sm:text-3xl font-bold text-amber-400 mb-1 sm:mb-2 font-morabbaReg">
            ۱۲۵ <span className="text-base sm:text-xl font-normal">م</span>
          </div>
          <div className="text-neutral-400 text-xs sm:text-sm">درآمد ماهانه</div>
          <div className="text-amber-300 text-xs mt-1 sm:mt-2 hidden sm:block font-semibold">
            +۸% نسبت به ماه قبل
          </div>
          <div className="text-amber-300 text-xs mt-1 sm:hidden">+۸%</div>
        </div>

        <div className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-4 sm:p-6 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-1 sm:mb-2 font-morabbaReg">
            {publishedBlogsCount.toLocaleString("fa-IR")}
          </div>
          <div className="text-neutral-400 text-xs sm:text-sm">
            مقالات منتشر شده
          </div>
          <div className="text-amber-300 text-xs mt-1 sm:mt-2 hidden sm:block font-semibold">
            +۴ مقاله این ماه
          </div>
          <div className="text-amber-300 text-xs mt-1 sm:hidden">+۴ مقاله</div>
        </div>

        <div className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl p-4 sm:p-6 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <span className="text-amber-400 text-xs bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-full font-bold">
              ۳ جدید
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-1 sm:mb-2 font-morabbaReg">
            {openTicketsCount.toLocaleString("fa-IR")}
          </div>
          <div className="text-neutral-400 text-xs sm:text-sm">تیکت‌های باز</div>
          <div className="text-amber-300/80 text-xs mt-1 sm:mt-2 hidden sm:block">
            نیاز به پاسخگویی
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
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
              {users.map((user, index) => {
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
                      <div className={`w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br border rounded-full flex items-center justify-center font-bold text-sm sm:text-base shrink-0 ${gradientClass}`}>
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                          <span className="text-white font-semibold text-sm sm:text-base truncate">
                            {displayName}
                          </span>
                          {roleInfo && (
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium leading-none ${roleInfo.bg}`}>
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
                      <span className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1.5 font-medium ${statusInfo.bg}`}>
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

        <RecentComments />
      </div>

      <div className="mt-4 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <button className="bg-neutral-900/80 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-400/50 rounded-2xl p-4 sm:p-6 transition-all text-right group">
          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-white font-bold text-sm sm:text-base mb-1">
            افزودن کاربر جدید
          </div>
          <div className="text-neutral-400 text-xs sm:text-sm hidden sm:block">
            ایجاد حساب کاربری جدید
          </div>
        </button>
        <button className="bg-neutral-900/80 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-400/50 rounded-2xl p-4 sm:p-6 transition-all text-right group">
          <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-white font-bold text-sm sm:text-base mb-1">
            نوشتن مقاله جدید
          </div>
          <div className="text-neutral-400 text-xs sm:text-sm hidden sm:block">
            انتشار محتوای آموزشی
          </div>
        </button>
        <button className="bg-neutral-900/80 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-400/50 rounded-2xl p-4 sm:p-6 transition-all text-right group">
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-white font-bold text-sm sm:text-base mb-1">
            ایجاد برنامه تمرینی
          </div>
          <div className="text-neutral-400 text-xs sm:text-sm hidden sm:block">
            طراحی برنامه اختصاصی
          </div>
        </button>
        <button className="bg-neutral-900/80 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-400/50 rounded-2xl p-4 sm:p-6 transition-all text-right group">
          <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-white font-bold text-sm sm:text-base mb-1">
            مشاهده تیکت‌ها
          </div>
          <div className="text-neutral-400 text-xs sm:text-sm hidden sm:block">
            پاسخگویی به کاربران
          </div>
        </button>
      </div>
    </div>
  );
}
