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
