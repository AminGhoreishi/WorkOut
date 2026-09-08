import { MessageSquare, CheckCircle, EyeOff, Star } from "lucide-react";

export default function TestimonialStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-lg">
        <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
          <span>تعداد کل نظرات</span>
          <MessageSquare className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-2xl font-bold font-morabbaReg text-white">
          +۲,۵۰۰
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-lg">
        <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
          <span>فعال در صفحه اصلی</span>
          <CheckCircle className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-2xl font-bold font-morabbaReg text-emerald-400">
          ۳
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-lg">
        <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
          <span>نظرات مخفی‌شده</span>
          <EyeOff className="w-4 h-4 text-neutral-400" />
        </div>
        <div className="text-2xl font-bold font-morabbaReg text-neutral-300">
          ۰
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-lg">
        <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
          <span>میانگین امتیاز</span>
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        </div>
        <div className="text-2xl font-bold font-morabbaReg text-amber-400">
          ۴.۹ / ۵
        </div>
      </div>
    </div>
  );
}
