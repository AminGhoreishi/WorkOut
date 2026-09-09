"use client";

import { useState, useMemo, useEffect, memo } from "react";
import useSWR from "swr";
import { X, Search, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import type {
  AddFoodModalProps,
  FoodItem,
  Food,
  FoodFormValues,
} from "@/types/nutrition";
import ManualFoodInput from "../ManualFoodInput";
import { useForm, FormProvider } from "react-hook-form";
import { parseFoodUnit, MANUAL_FOOD_UNITS } from "../nutritionHelpers";

const foodFetcher = async (url: string): Promise<Food[]> => {
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

function AddFoodModal({
  isOpen,
  onClose,
  activeMealType,
  onSaveFood,
}: AddFoodModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedPresetFood, setSelectedPresetFood] = useState<Food | null>(
    null
  );
  const [isManualInput, setIsManualInput] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const searchFoodsKey =
    isOpen && debouncedSearchQuery.trim()
      ? `/api/food?search=${encodeURIComponent(debouncedSearchQuery)}&isAddModal=true`
      : null;
  const { data: searchResultsData, isLoading: isSearching } = useSWR<Food[]>(
    searchFoodsKey,
    foodFetcher,
    { revalidateOnFocus: false, dedupingInterval: 5000 }
  );

  const searchResults = useMemo(
    () => searchResultsData || [],
    [searchResultsData]
  );

  const methods = useForm<FoodFormValues>({
    defaultValues: {
      manualName: "",
      manualCalories: "",
      foodQuantity: "1",
      manualUnit: "عدد",
      manualProtein: "",
      manualCarbs: "",
      manualFat: "",
    },
  });

  const { register, watch, setValue, handleSubmit, reset } = methods;

  const manualName = watch("manualName");
  const manualCalories = watch("manualCalories");

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setDebouncedSearchQuery("");
      setSelectedPresetFood(null);
      setIsManualInput(false);
      reset();
    }
  }, [isOpen, reset]);

  const handleSelectPreset = (food: Food) => {
    setSelectedPresetFood(food);
    setSearchQuery(food.name);
    const unitInfo = parseFoodUnit(food.unit);
    setValue("foodQuantity", String(unitInfo.baseQty));
  };

  const handleSave = async (values: FoodFormValues) => {
    let newItem: FoodItem;

    if (isManualInput) {
      if (!values.manualName || !values.manualCalories) return;
      const unitVal = values.manualUnit || "عدد";
      const unitConfig = MANUAL_FOOD_UNITS.find((u) => u.value === unitVal);
      const baseQty = unitConfig?.baseQty || 1;
      const minQty = unitConfig?.minQty || 0.1;
      const qty = Math.max(minQty, parseFloat(values.foodQuantity) || baseQty);
      const multiplier = baseQty > 0 ? qty / baseQty : 1;

      const cals = (parseFloat(values.manualCalories) || 0) * multiplier;
      const prot = (parseFloat(values.manualProtein) || 0) * multiplier;
      const crbs = (parseFloat(values.manualCarbs) || 0) * multiplier;
      const ft = (parseFloat(values.manualFat) || 0) * multiplier;

      newItem = {
        id: Date.now().toString(),
        name: values.manualName.trim(),
        quantity: qty,
        unit: unitVal,
        calories: Math.round(cals),
        protein: Math.round(prot * 10) / 10,
        carbs: Math.round(crbs * 10) / 10,
        fat: Math.round(ft * 10) / 10,
      };
    } else {
      if (!selectedPresetFood) return;
      const unitInfo = parseFoodUnit(selectedPresetFood.unit);
      const minQty = unitInfo.isWeight ? 1 : 0.1;
      const qty = Math.max(minQty, parseFloat(values.foodQuantity) || unitInfo.baseQty);
      const multiplier = unitInfo.baseQty > 0 ? qty / unitInfo.baseQty : 1;

      newItem = {
        id: Date.now().toString(),
        name: selectedPresetFood.name,
        quantity: qty,
        unit: unitInfo.unitLabel,
        calories: Math.round(selectedPresetFood.calories * multiplier),
        protein:
          Math.round((selectedPresetFood.protein || 0) * multiplier * 10) / 10,
        carbs:
          Math.round((selectedPresetFood.carbs || 0) * multiplier * 10) / 10,
        fat: Math.round((selectedPresetFood.fat || 0) * multiplier * 10) / 10,
      };
    }

    onSaveFood(newItem);
  };

  const translateMealName = (type: string) => {
    switch (type) {
      case "breakfast":
        return "صبحانه";
      case "lunch":
        return "ناهار";
      case "dinner":
        return "شام";
      case "snack":
        return "میان‌وعده";
      default:
        return type;
    }
  };

  const selectedUnitInfo = useMemo(() => {
    return parseFoodUnit(selectedPresetFood?.unit);
  }, [selectedPresetFood?.unit]);

  const watchedQuantity = watch("foodQuantity");
  const currentQuantityNum = parseFloat(watchedQuantity) || 0;
  const liveMultiplier =
    selectedUnitInfo.baseQty > 0 ? currentQuantityNum / selectedUnitInfo.baseQty : 1;
  const liveCalories = Math.round((selectedPresetFood?.calories || 0) * liveMultiplier);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-neutral-950 border border-amber-500/20 rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl shadow-amber-500/10 font-danaMed gap-0 max-h-[85dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain pb-[max(1.25rem,env(safe-area-inset-bottom))]"
        dir="rtl"
      >
        <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/10 space-y-0 text-right mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <DialogTitle className="text-xl text-white font-bold font-morabbaReg">
              ثبت غذا در وعده {translateMealName(activeMealType)}
            </DialogTitle>
          </div>
          <DialogClose
            render={
              <button
                type="button"
                className="p-1.5 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 text-white/60 hover:text-amber-400 transition-colors cursor-pointer"
              />
            }
          >
            <X className="w-5 h-5" />
            <span className="sr-only">بستن</span>
          </DialogClose>
          <DialogDescription className="sr-only">
            فرم ثبت غذا در پایگاه داده یا به صورت دستی
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-neutral-900 rounded-xl border border-amber-500/20">
          <button
            type="button"
            onClick={() => {
              setIsManualInput(false);
              if (selectedPresetFood) {
                const unitInfo = parseFoodUnit(selectedPresetFood.unit);
                setValue("foodQuantity", String(unitInfo.baseQty));
              }
            }}
            className={`py-2 text-xs rounded-lg transition-all cursor-pointer font-bold ${
              !isManualInput
                ? "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 shadow-md shadow-amber-500/20"
                : "text-white/60 hover:text-white"
            }`}
          >
            جستجو در پایگاه غذاها
          </button>
          <button
            type="button"
            onClick={() => {
              setIsManualInput(true);
              const currentUnit = watch("manualUnit") || "عدد";
              const unitConfig = MANUAL_FOOD_UNITS.find((u) => u.value === currentUnit);
              const currentQty = parseFloat(watch("foodQuantity"));
              if (!currentQty || (currentUnit === "عدد" && currentQty > 50)) {
                setValue("manualUnit", currentUnit);
                setValue("foodQuantity", String(unitConfig?.baseQty || 1));
              }
            }}
            className={`py-2 text-xs rounded-lg transition-all cursor-pointer font-bold ${
              isManualInput
                ? "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 shadow-md shadow-amber-500/20"
                : "text-white/60 hover:text-white"
            }`}
          >
            ثبت به صورت دستی
          </button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleSave)}>
            {!isManualInput ? (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedPresetFood(null);
                    }}
                    placeholder="مثلاً: سینه مرغ، تخم‌مرغ..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 text-sm"
                  />
                  <Search className="w-4 h-4 text-amber-400/60 absolute top-3.5 right-3.5" />
                </div>

                <div className="max-h-40 overflow-y-auto space-y-1">
                  {isSearching ? (
                    <div className="text-center py-4 text-white/40 text-xs">
                      در حال جستجو...
                    </div>
                  ) : searchQuery && searchResults.length > 0 ? (
                    searchResults.map((food) => (
                      <button
                        type="button"
                        key={food._id}
                        onClick={() => handleSelectPreset(food)}
                        className="w-full text-right text-xs text-white/80 hover:text-white bg-white/5 hover:bg-amber-500/20 border border-white/5 hover:border-amber-500/30 px-3 py-2 rounded-xl transition-all flex justify-between items-center cursor-pointer"
                      >
                        <span>{food.name}</span>
                        <span className="text-white/40">
                          {food.calories} کالری در {food.unit}
                        </span>
                      </button>
                    ))
                  ) : searchQuery && !selectedPresetFood ? (
                    <div className="text-center py-4 text-white/40 text-xs">
                      غذایی پیدا نشد. می‌توانید از تب «ثبت به صورت دستی» استفاده
                      کنید.
                    </div>
                  ) : null}
                </div>

                {selectedPresetFood && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-xs font-semibold">
                        {selectedPresetFood.name}
                      </span>
                      <span className="text-amber-400 text-xs bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
                        {currentQuantityNum > 0
                          ? `${liveCalories} کالری (${currentQuantityNum} ${selectedUnitInfo.unitLabel})`
                          : `${selectedPresetFood.calories} کالری در ${selectedPresetFood.unit || "واحد"}`}
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-white/80 text-xs">
                          مقدار مصرفی ({selectedUnitInfo.unitLabel}):
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const current = parseFloat(watch("foodQuantity")) || 0;
                            const step = selectedUnitInfo.isWeight
                              ? (selectedUnitInfo.baseQty >= 50 ? 25 : 5)
                              : 1;
                            const nextVal = Math.round((current + step) * 10) / 10;
                            setValue("foodQuantity", String(nextVal));
                          }}
                          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 text-white flex items-center justify-center text-lg font-bold transition-all cursor-pointer select-none"
                        >
                          +
                        </button>
                        <input
                          type="number"
                          step="any"
                          min="0.1"
                          {...register("foodQuantity")}
                          className="flex-1 text-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400 text-sm font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const current = parseFloat(watch("foodQuantity")) || 0;
                            const step = selectedUnitInfo.isWeight
                              ? (selectedUnitInfo.baseQty >= 50 ? 25 : 5)
                              : 1;
                            const minVal = selectedUnitInfo.isWeight
                              ? 5
                              : (selectedUnitInfo.baseQty <= 0.5 ? 0.25 : 0.5);
                            const nextVal = Math.max(minVal, Math.round((current - step) * 10) / 10);
                            setValue("foodQuantity", String(nextVal));
                          }}
                          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 text-white flex items-center justify-center text-lg font-bold transition-all cursor-pointer select-none"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <ManualFoodInput />
            )}

            <DialogFooter className="flex flex-row gap-4 mt-6 pt-4 border-t border-white/10 sm:justify-start">
              <button
                type="submit"
                disabled={
                  isManualInput
                    ? !manualName || !manualCalories
                    : !selectedPresetFood
                }
                className="flex-1 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-950 font-bold py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer text-xs"
              >
                ثبت وعده غذایی
              </button>
              <DialogClose
                render={
                  <button
                    type="button"
                    className="px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white py-3 rounded-xl transition-all cursor-pointer text-xs"
                  />
                }
              >
                انصراف
              </DialogClose>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default memo(AddFoodModal);
