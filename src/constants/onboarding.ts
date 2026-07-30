import { TrendingUp, Dumbbell, Zap, Award, Heart } from "lucide-react";
import type {
  GoalOptionItem,
  ExperienceOptionItem,
  EquipmentOptionItem,
} from "@/types/fitness-profile";

export const GOAL_OPTIONS: GoalOptionItem[] = [
  { val: "weight_loss", label: "کاهش وزن و چربی‌سوزی", icon: TrendingUp },
  { val: "muscle_gain", label: "عضله‌سازی و افزایش حجم", icon: Dumbbell },
  { val: "endurance", label: "افزایش استقامت و کاردیو", icon: Zap },
  { val: "general_fitness", label: "آمادگی جسمانی عمومی", icon: Award },
  { val: "rehabilitation", label: "توان‌بخشی و بهبود آسیب", icon: Heart },
];

export const EXPERIENCE_OPTIONS: ExperienceOptionItem[] = [
  { val: "beginner", label: "مبتدی", desc: "زیر ۶ ماه" },
  { val: "intermediate", label: "متوسط", desc: "۶ تا ۲۴ ماه" },
  { val: "advanced", label: "حرفه‌ای", desc: "بیش از ۲ سال" },
];

export const EQUIPMENT_OPTIONS: EquipmentOptionItem[] = [
  { val: "none", label: "بدون تجهیزات (فقط وزن بدن)", desc: "مناسب برای تمرین در خانه بدون وسیله" },
  { val: "home_basic", label: "تجهیزات پایه خانگی", desc: "دمبل، کش ورزشی، مت یا ملزومات ساده" },
  { val: "gym_full", label: "باشگاه ورزشی مجهز", desc: "دسترسی کامل به دستگاه‌ها و هالترها" },
];

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
