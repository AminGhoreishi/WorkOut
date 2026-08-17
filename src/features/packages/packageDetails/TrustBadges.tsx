import { Shield, Award, Clock } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="relative z-10 pt-6 border-t border-amber-500/20 space-y-3.5 font-danaMed">
      <div className="flex items-center gap-3 text-neutral-300 text-sm">
        <div className="w-7 h-7 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center shrink-0">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <span>پرداخت کاملاً امن و رمزنگاری شده</span>
      </div>
      <div className="flex items-center gap-3 text-neutral-300 text-sm">
        <div className="w-7 h-7 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center shrink-0">
          <Award className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <span>۷ روز ضمانت بازگشت وجه کامل</span>
      </div>
      <div className="flex items-center gap-3 text-neutral-300 text-sm">
        <div className="w-7 h-7 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center shrink-0">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <span>فعال‌سازی آنی محتوای آموزشی</span>
      </div>
    </div>
  );
}
