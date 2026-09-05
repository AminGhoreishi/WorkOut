import { memo } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { getLocalDateString, getPersianDateLabel } from "@/utils/date";
import type { NutritionDateSelectorProps } from "@/types/nutrition";

function NutritionDateSelector({
  selectedDate,
  onDateChange,
  isPending = false,
}: NutritionDateSelectorProps) {
  const changeDate = (direction: "next" | "prev") => {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + (direction === "next" ? 1 : -1));

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    onDateChange(`${y}-${m}-${d}`);
  };

  return (
    <div className="flex items-center justify-between w-full sm:w-auto bg-white/5 border border-amber-500/15 rounded-2xl p-1 gap-1">
      <button
        type="button"
        onClick={() => changeDate("prev")}
        className="p-2 rounded-xl text-neutral-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer"
        title="دیروز"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => {
          const todayStr = getLocalDateString(0);
          if (selectedDate !== todayStr) {
            onDateChange(todayStr);
          }
        }}
        className="px-3 sm:px-6 py-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white rounded-xl hover:bg-amber-500/10 transition-all cursor-pointer select-none flex-1 text-center flex items-center justify-center gap-1.5"
      >
        {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400 shrink-0" />}
        <span className="ss02">{getPersianDateLabel(selectedDate)}</span>
      </button>

      <button
        type="button"
        onClick={() => changeDate("next")}
        className="p-2 rounded-xl text-neutral-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer"
        title="فردا"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 h-5" />
      </button>
    </div>
  );
}

export default memo(NutritionDateSelector);
