export const getReadTime = (content?: string): string => {
  if (!content) return "۱ دقیقه";
  const words = content
    ? content
        .replace(/<[^>]+>/g, "")
        .split(/\s+/)
        .filter(Boolean).length
    : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return new Intl.NumberFormat("fa-IR").format(minutes) + " دقیقه";
};

export const isImageUrl = (url?: string): boolean =>
  Boolean(
    url &&
      (url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("/") ||
        url.startsWith("data:image")),
  );

export const ALLOWED_ARTICLE_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const MAX_ARTICLE_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

export const validateArticleImage = (file: File): boolean => {
  if (!ALLOWED_ARTICLE_IMAGE_TYPES.includes(file.type)) {
    import("@/utils/alert").then(({ showAlert }) => {
      showAlert({
        title: "فرمت نامعتبر",
        text: "لطفاً تصویر شاخص را با فرمت JPG، PNG یا WEBP انتخاب کنید.",
        icon: "error",
      });
    });
    return false;
  }

  if (file.size > MAX_ARTICLE_IMAGE_SIZE_BYTES) {
    import("@/utils/alert").then(({ showAlert }) => {
      showAlert({
        title: "حجم بالای تصویر",
        text: "حداکثر حجم مجاز برای تصویر شاخص ۲ مگابایت است.",
        icon: "error",
      });
    });
    return false;
  }

  return true;
};
