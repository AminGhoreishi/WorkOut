"use client";

import { MessageSquareQuote } from "lucide-react";
import AdminTestimonialsTable from "./AdminTestimonialsTable";

export default function AdminTestimonials() {
  return (
    <div className="overflow-hidden font-danaMed" dir="rtl">
      <div className="container mx-auto pt-6 sm:pt-8 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-morabbaReg flex items-center gap-2.5">
              <MessageSquareQuote className="w-7 h-7 text-amber-400" />
              <span>مدیریت نظرات و تجربیات شاگردان</span>
            </h1>
            <p className="text-white/60 text-xs sm:text-sm">
              بررسی، مدیریت، تغییر وضعیت نمایش در صفحه اصلی و حذف نظرات ثبت‌شده توسط ورزشکاران
            </p>
          </div>
        </div>

        <AdminTestimonialsTable />
      </div>
    </div>
  );
}
