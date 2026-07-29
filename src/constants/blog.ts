export const ARTICLE_CATEGORIES = [
  "همه",
  "بدنسازی",
  "تغذیه",
  "کاهش وزن",
  "سلامت",
  "مکمل",
  "تکنیک",
] as const;

export const ARTICLE_STATUSES = [
  "همه",
  "منتشر شده",
  "پیش‌نویس",
  "زمان‌بندی شده",
] as const;

export function mapStatusToEnglish(status: string): string {
  switch (status) {
    case "منتشر شده":
      return "published";
    case "پیش‌نویس":
      return "draft";
    case "زمان‌بندی شده":
      return "scheduled";
    default:
      return "all";
  }
}
