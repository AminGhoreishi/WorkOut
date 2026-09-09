export const getLocalDateString = (offsetDays = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getPersianDateLabel = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const todayStr = getLocalDateString(0);
  const yesterdayStr = getLocalDateString(1);
  const tomorrowStr = getLocalDateString(-1);

  let relativeLabel = "";
  if (dateStr === todayStr) relativeLabel = "امروز - ";
  else if (dateStr === yesterdayStr) relativeLabel = "دیروز - ";
  else if (dateStr === tomorrowStr) relativeLabel = "فردا - ";

  const formatter = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return `${relativeLabel}${formatter.format(date)}`;
};

export const formatPersianDate = (
  dateString?: string | Date | null,
): string => {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

export const formatDate = formatPersianDate;

export const getStartOfShamsiMonth = (): Date => {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US-u-ca-persian", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const pDay = parseInt(
    parts.find((p) => p.type === "day")?.value || "1",
    10,
  );
  const start = new Date(now);
  start.setDate(start.getDate() - (pDay - 1));
  start.setHours(0, 0, 0, 0);
  return start;
};
