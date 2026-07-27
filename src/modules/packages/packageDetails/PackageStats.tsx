import type { PackageStatsProps } from "@/types/components";
import { Users, Star, MessageCircle } from "lucide-react";

export default function PackageStats({ studentCount, rating, reviewCount }: PackageStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 font-danaMed">
      <div className="bg-neutral-900/80 backdrop-blur-xl border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 rounded-2xl p-5 hover:-translate-y-1 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-morabbaReg">
            {studentCount.toLocaleString("fa-IR")}
          </div>
          <div className="text-neutral-400 text-xs mt-1">
            دانشجو فعال
          </div>
        </div>
      </div>

      <div className="bg-neutral-900/80 backdrop-blur-xl border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 rounded-2xl p-5 hover:-translate-y-1 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3">
            <Star className="w-6 h-6 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-morabbaReg">
            {rating}
          </div>
          <div className="text-neutral-400 text-xs mt-1">
            امتیاز پکیج
          </div>
        </div>
      </div>

      <div className="bg-neutral-900/80 backdrop-blur-xl border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 rounded-2xl p-5 hover:-translate-y-1 shadow-[0_0_20px_rgba(234,179,8,0.05)]">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3">
            <MessageCircle className="w-6 h-6 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-morabbaReg">
            {reviewCount.toLocaleString("fa-IR")}
          </div>
          <div className="text-neutral-400 text-xs mt-1">
            تعداد نظرات
          </div>
        </div>
      </div>
    </div>
  );
}
