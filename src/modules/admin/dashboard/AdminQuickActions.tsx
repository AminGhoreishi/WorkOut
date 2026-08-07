import Link from "next/link";
import { Users, FileText, Calendar, MessageSquare } from "lucide-react";

export default function AdminQuickActions() {
  return (
    <div className="mt-4 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <Link
        href="/admin/users"
        className="bg-neutral-900/80 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-400/50 rounded-2xl p-4 sm:p-6 transition-all text-right group block"
      >
        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
        <div className="text-white font-bold text-sm sm:text-base mb-1">
          افزودن کاربر جدید
        </div>
        <div className="text-neutral-400 text-xs sm:text-sm hidden sm:block">
          ایجاد حساب کاربری جدید
        </div>
      </Link>

      <Link
        href="/admin/articles/createArticles"
        className="bg-neutral-900/80 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-400/50 rounded-2xl p-4 sm:p-6 transition-all text-right group block"
      >
        <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
        <div className="text-white font-bold text-sm sm:text-base mb-1">
          نوشتن مقاله جدید
        </div>
        <div className="text-neutral-400 text-xs sm:text-sm hidden sm:block">
          انتشار محتوای آموزشی
        </div>
      </Link>

      <Link
        href="/admin/workouts"
        className="bg-neutral-900/80 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-400/50 rounded-2xl p-4 sm:p-6 transition-all text-right group block"
      >
        <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
        <div className="text-white font-bold text-sm sm:text-base mb-1">
          ایجاد برنامه تمرینی
        </div>
        <div className="text-neutral-400 text-xs sm:text-sm hidden sm:block">
          طراحی برنامه اختصاصی
        </div>
      </Link>

      <Link
        href="/admin/tickets"
        className="bg-neutral-900/80 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-400/50 rounded-2xl p-4 sm:p-6 transition-all text-right group block"
      >
        <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
        <div className="text-white font-bold text-sm sm:text-base mb-1">
          مشاهده تیکت‌ها
        </div>
        <div className="text-neutral-400 text-xs sm:text-sm hidden sm:block">
          پاسخگویی به کاربران
        </div>
      </Link>
    </div>
  );
}
