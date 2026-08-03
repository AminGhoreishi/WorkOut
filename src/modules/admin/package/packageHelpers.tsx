import React from "react";
import { Package as PackageIcon, Award, Crown } from "lucide-react";

export const getPackageIcon = (tier?: string) => {
  switch (tier) {
    case "basic":
      return <PackageIcon className="w-8 h-8 text-blue-400" />;
    case "professional":
      return <Award className="w-8 h-8 text-purple-400" />;
    case "vip":
      return <Crown className="w-8 h-8 text-amber-400" />;
    default:
      return <PackageIcon className="w-8 h-8 text-gray-400" />;
  }
};

export const getPackageBadge = (tier?: string) => {
  if (!tier) return null;
  const styles: Record<string, string> = {
    basic: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    professional: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    vip: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  };
  const labels: Record<string, string> = {
    basic: "پایه",
    professional: "حرفه‌ای",
    vip: "VIP 👑",
  };
  return (
    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${styles[tier] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
      {labels[tier] || tier}
    </span>
  );
};

export const getStatusBadge = (active: boolean) =>
  active ? (
    <span className="px-3 py-1 rounded-full border text-xs font-semibold bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
      فعال
    </span>
  ) : (
    <span className="px-3 py-1 rounded-full border text-xs font-semibold bg-gray-500/20 text-gray-400 border-gray-500/30">
      غیرفعال
    </span>
  );
