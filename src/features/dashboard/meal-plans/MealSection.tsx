import type { MealSectionProps } from "@/types/meal-plan";

export default function MealSection({
  title,
  icon: Icon,
  items = [],
  badgeColor,
}: MealSectionProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between font-danaMed" dir="rtl">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${badgeColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-morabbaReg">{title}</h3>
              <p className="text-xs text-neutral-400 mt-0.5">{items.length} آیتم غذایی</p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-xs text-neutral-500 py-6 text-center">آیتمی برای این وعده ثبت نشده است.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => {
              const foodName = item.name || (typeof item.foodId === "object" ? item.foodId?.name : "") || "ماده غذایی";
              const unit = item.unit || (typeof item.foodId === "object" ? item.foodId?.unit : "") || "";

              return (
                <div
                  key={index}
                  className="bg-white/[0.03] border border-white/5 hover:border-amber-500/20 p-3.5 rounded-xl flex items-center justify-between gap-3 transition-all min-w-0"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-semibold text-white truncate" title={foodName}>
                      {foodName}
                    </h4>
                  </div>

                  <div className="text-left shrink-0">
                    <span className="text-xs font-semibold text-amber-400 ss02 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl whitespace-nowrap">
                      {item.quantity} {unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
