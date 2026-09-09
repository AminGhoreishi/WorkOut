"use client";

import { memo, useMemo } from "react";
import { Package as PackageIcon, Users, DollarSign, TrendingUp, Award } from "lucide-react";
import type { PackageStatsProps, PackageStats as IPackageStats } from "@/types/package";

const PackageStats = memo(function PackageStats({
  packages = [],
  formatNumber,
}: PackageStatsProps) {
  const stats = useMemo<IPackageStats>(() => {
    const validPackages = Array.isArray(packages) ? packages.filter(Boolean) : [];

    const totalUsers = validPackages.reduce((sum, pkg) => {
      const count = Number(pkg.studentCount);
      return sum + (Number.isFinite(count) ? count : 0);
    }, 0);

    const totalRevenue = validPackages.reduce((sum, pkg) => {
      const price = Number(pkg.price?.monthly);
      const count = Number(pkg.studentCount);
      const safePrice = Number.isFinite(price) ? price : 0;
      const safeCount = Number.isFinite(count) ? count : 0;
      return sum + safePrice * safeCount;
    }, 0);

    const activeCount = validPackages.filter((p) => p.isActive).length;
    const mostPopularPackage =
      validPackages.find((p) => p.isPopular) || validPackages[0];

    const popularCount = Number(mostPopularPackage?.studentCount);

    return {
      totalCount: validPackages.length,
      activeCount,
      totalUsers,
      totalRevenue,
      mostPopularName: mostPopularPackage?.name || "—",
      mostPopularCount: Number.isFinite(popularCount) ? popularCount : 0,
    };
  }, [packages]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 font-danaMed">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white/60 text-sm">کل پکیج‌ها</div>
          <PackageIcon className="w-5 h-5 text-blue-400" />
        </div>
        <div className="text-3xl text-white mb-1 font-morabbaReg font-bold ss02">
          {formatNumber(stats.totalCount)}
        </div>
        <div className="text-emerald-400 text-sm font-semibold">
          {formatNumber(stats.activeCount)} پکیج فعال
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white/60 text-sm">کل کاربران</div>
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        <div className="text-3xl text-white mb-1 font-morabbaReg font-bold ss02">
          {formatNumber(stats.totalUsers)}
        </div>
        <div className="text-purple-400 text-sm font-semibold">در تمام پکیج‌ها</div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white/60 text-sm">درآمد کل تخمینی</div>
          <DollarSign className="w-5 h-5 text-amber-400" />
        </div>
        <div className="text-2xl text-white mb-1 font-morabbaReg font-bold ss02">
          {formatNumber(stats.totalRevenue)} تومان
        </div>
        <div className="text-amber-400 text-sm flex items-center gap-1 font-semibold">
          <TrendingUp className="w-4 h-4" />
          ماهانه
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white/60 text-sm">محبوب‌ترین بسته</div>
          <Award className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="text-xl text-white mb-1 truncate font-morabbaReg font-bold">
          {stats.mostPopularName || "—"}
        </div>
        <div className="text-emerald-400 text-sm font-semibold">
          {formatNumber(stats.mostPopularCount)} کاربر فعال
        </div>
      </div>
    </div>
  );
});

export default PackageStats;
