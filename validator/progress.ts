import type { NewPRRecordInput } from "@/types/progress";

export const DEFAULT_CATEGORIES = [
  "قدرتی",
  "استقامت",
  "هوازی",
  "انعطاف پذیری",
  "سرعت",
  "توان",
  "وزن بدن",
  "سایر",
];

export const DEFAULT_UNITS = [
  "کیلوگرم",
  "تکرار",
  "دقیقه",
  "ثانیه",
  "متر",
  "کیلومتر",
  "سانتی‌متر",
  "درصد",
];

export function validateProgressRecordInput(
  formData: NewPRRecordInput
): string | null {
  const finalTestName = formData.testName.trim();

  if (!finalTestName) {
    return "لطفا نام حرکت یا تست را وارد کنید.";
  }

  if (!formData.value || isNaN(Number(formData.value))) {
    return "لطفا یک مقدار عددی معتبر وارد کنید.";
  }

  if (!formData.unit.trim()) {
    return "لطفا واحد اندازه‌گیری را مشخص کنید.";
  }

  return null;
}
