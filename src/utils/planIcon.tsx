import {
  Dumbbell,
  Activity,
  Package as LucidePackage,
  Zap,
  Flame,
  Trophy,
  Sparkles,
} from "lucide-react";

export function renderPlanIcon(icon?: string) {
  if (!icon) {
    return <Dumbbell className="w-12 h-12 text-amber-400" />;
  }

  const iconKey = icon.trim().toLowerCase();

  if (iconKey === "package" || iconKey === "lucidepackage") {
    return <LucidePackage className="w-12 h-12 text-amber-400" />;
  }
  if (iconKey === "activity") {
    return <Activity className="w-12 h-12 text-amber-400" />;
  }
  if (iconKey === "zap") {
    return <Zap className="w-12 h-12 text-amber-400" />;
  }
  if (iconKey === "flame" || iconKey === "fire") {
    return <Flame className="w-12 h-12 text-amber-400" />;
  }
  if (iconKey === "trophy" || iconKey === "award") {
    return <Trophy className="w-12 h-12 text-amber-400" />;
  }
  if (iconKey === "sparkles") {
    return <Sparkles className="w-12 h-12 text-amber-400" />;
  }
  if (iconKey === "dumbbell") {
    return <Dumbbell className="w-12 h-12 text-amber-400" />;
  }

  if (/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u.test(icon)) {
    return <span className="text-5xl">{icon}</span>;
  }

  return <Dumbbell className="w-12 h-12 text-amber-400" />;
}
