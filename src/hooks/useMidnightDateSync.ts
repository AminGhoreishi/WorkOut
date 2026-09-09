import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { getLocalDateString } from "@/utils/date";

export default function useMidnightDateSync(
  setSelectedDate: Dispatch<SetStateAction<string>>,
) {
  useEffect(() => {
    const handleSyncToday = () => {
      if (document.visibilityState === "visible") {
        const currentToday = getLocalDateString(0);
        setSelectedDate((prev) => {
          const [py, pm, pd] = prev.split("-").map(Number);
          const prevDate = new Date(Date.UTC(py, pm - 1, pd));
          const [ty, tm, td] = currentToday.split("-").map(Number);
          const todayDate = new Date(Date.UTC(ty, tm - 1, td));
          const diffDays = Math.round(
            (todayDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          if (diffDays === 1) {
            return currentToday;
          }
          return prev;
        });
      }
    };

    document.addEventListener("visibilitychange", handleSyncToday);
    window.addEventListener("focus", handleSyncToday);
    return () => {
      document.removeEventListener("visibilitychange", handleSyncToday);
      window.removeEventListener("focus", handleSyncToday);
    };
  }, [setSelectedDate]);
}
