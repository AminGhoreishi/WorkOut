"use client";

import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import type { FoodFormValues } from "@/types/nutrition";
import { MANUAL_FOOD_UNITS } from "./nutritionHelpers";

function ManualFoodInput() {
  const { register, control, setValue } = useFormContext<FoodFormValues>();

  const selectedUnit =
    useWatch({ control, name: "manualUnit" }) || "عدد";
  const currentQuantity =
    useWatch({ control, name: "foodQuantity" }) || "1";
  const manualCalories =
    useWatch({ control, name: "manualCalories" }) || "";

  const currentUnitConfig =
    MANUAL_FOOD_UNITS.find((u) => u.value === selectedUnit) ||
    MANUAL_FOOD_UNITS[0];

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value;
    setValue("manualUnit", newUnit, { shouldValidate: true, shouldDirty: true });
    const unitConfig = MANUAL_FOOD_UNITS.find((u) => u.value === newUnit);
    if (unitConfig) {
      setValue("foodQuantity", String(unitConfig.baseQty), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleIncrement = () => {
    const current = parseFloat(currentQuantity) || 0;
    const step = currentUnitConfig.step;
    const nextVal = Math.round((current + step) * 10) / 10;
    setValue("foodQuantity", String(nextVal), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDecrement = () => {
    const current = parseFloat(currentQuantity) || 0;
    const step = currentUnitConfig.step;
    const minVal = currentUnitConfig.minQty;
    const nextVal = Math.max(minVal, Math.round((current - step) * 10) / 10);
    setValue("foodQuantity", String(nextVal), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const qtyNum = parseFloat(currentQuantity) || currentUnitConfig.baseQty;
  const calsNum = parseFloat(manualCalories) || 0;
  const totalCalories = Math.round(
    calsNum *
      (currentUnitConfig.baseQty > 0 ? qtyNum / currentUnitConfig.baseQty : 1)
  );

  const calorieLabel =
    currentUnitConfig.baseQty > 1
      ? `هر ${currentUnitConfig.baseQty} ${currentUnitConfig.label}`
      : `هر ${currentUnitConfig.label}`;

  return (
    <div className="space-y-4 font-danaMed" dir="rtl">
      <div>
        <label className="block text-white/80 mb-2 text-xs font-medium">
          نام غذا / مکمل:
        </label>
        <input
          type="text"
          {...register("manualName", { required: true })}
          placeholder={
            currentUnitConfig.placeholderName || "مثال: فیله بوقلمون"
          }
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-white/80 mb-2 text-xs font-medium">
            واحد سنجش:
          </label>
          <div className="relative">
            <select
              value={selectedUnit}
              onChange={handleUnitChange}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 pr-3 pl-8 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer appearance-none"
            >
              {MANUAL_FOOD_UNITS.map((unit) => (
                <option
                  key={unit.value}
                  value={unit.value}
                  className="bg-neutral-900 text-white"
                >
                  {unit.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-white/40 absolute left-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-white/80 mb-2 text-xs font-medium">
            کالری ({calorieLabel}):
          </label>
          <input
            type="number"
            step="any"
            {...register("manualCalories", { required: true })}
            placeholder={
              currentUnitConfig.placeholderCal || "مثال: ۷۵"
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-sm"
          />
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-white/80 text-xs font-medium">
            مقدار مصرفی ({currentUnitConfig.label}):
          </label>
          {calsNum > 0 && (
            <span className="text-amber-400 text-[11px] bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold">
              مجموع: {totalCalories} کالری
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleIncrement}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 text-white flex items-center justify-center text-lg font-bold transition-all cursor-pointer select-none"
          >
            +
          </button>
          <input
            type="number"
            step="any"
            min={currentUnitConfig.minQty}
            {...register("foodQuantity", { required: true })}
            placeholder={String(currentUnitConfig.baseQty)}
            className="flex-1 text-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400 text-sm font-bold"
          />
          <button
            type="button"
            onClick={handleDecrement}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 text-white flex items-center justify-center text-lg font-bold transition-all cursor-pointer select-none"
          >
            -
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 pt-3">
        <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-wider mb-2">
          درشت‌مغذی‌ها به ازای {calorieLabel} (اختیاری):
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          <div>
            <label className="block text-amber-300 mb-1 text-[10px]">
              پروتئین (g):
            </label>
            <input
              type="number"
              step="any"
              {...register("manualProtein")}
              placeholder="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-xs"
            />
          </div>
          <div>
            <label className="block text-amber-400 mb-1 text-[10px]">
              کربوهیدرات (g):
            </label>
            <input
              type="number"
              step="any"
              {...register("manualCarbs")}
              placeholder="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-xs"
            />
          </div>
          <div>
            <label className="block text-yellow-400 mb-1 text-[10px]">
              چربی (g):
            </label>
            <input
              type="number"
              step="any"
              {...register("manualFat")}
              placeholder="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ManualFoodInput);
