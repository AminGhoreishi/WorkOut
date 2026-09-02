"use client";

import { useState, useMemo, useEffect, memo } from "react";
import useSWR, { useSWRConfig } from "swr";
import { X, Search, Zap } from "lucide-react";
import type {
  AddFoodModalProps,
  FoodItem,
  Food,
  FoodFormValues,
} from "@/types/nutrition";
import ManualFoodInput from "./ManualFoodInput";
import { useForm, FormProvider } from "react-hook-form";

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
  selectedDate,
  currentMeals,
}: AddFoodModalProps) {
  const { mutate } = useSWRConfig();
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

  const popularFoodsKey = isOpen
    ? `/api/food?isAddModal=true&type=${activeMealType}`
    : null;
  const { data: dbFoodsData, isLoading: isFetchingPopular } = useSWR<Food[]>(
    popularFoodsKey,
    foodFetcher,
    { revalidateOnFocus: false, dedupingInterval: 10000 }
  );

  const searchFoodsKey =
    isOpen && debouncedSearchQuery.trim()
      ? `/api/food?search=${encodeURIComponent(debouncedSearchQuery)}&isAddModal=true&type=${activeMealType}`
      : null;
  const { data: searchResultsData, isLoading: isSearching } = useSWR<Food[]>(
    searchFoodsKey,
    foodFetcher,
    { revalidateOnFocus: false, dedupingInterval: 5000 }
  );

  const dbFoods = useMemo(() => dbFoodsData || [], [dbFoodsData]);
  const searchResults = useMemo(
    () => searchResultsData || [],
    [searchResultsData]
  );

  const methods = useForm<FoodFormValues>({
    defaultValues: {
      manualName: "",
      manualCalories: "",
      foodQuantity: "100",
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

  const popularFoods = useMemo(() => {
    return dbFoods.filter(
      (f) => f.type === activeMealType || f.type === "all"
    );
  }, [dbFoods, activeMealType]);

  const handleSelectPreset = (food: Food) => {
    setSelectedPresetFood(food);
    setSearchQuery(food.name);
    const unit = food.unit || "";
    if (
      unit.includes("عدد") ||
      unit.includes("پیمانه") ||
      unit.includes("سیخ")
    ) {
      setValue("foodQuantity", "1");
    } else {
      setValue("foodQuantity", "100");
    }
  };

  const handleSave = async (values: FoodFormValues) => {
    let newItem: FoodItem;

    if (isManualInput) {
      if (!values.manualName || !values.manualCalories) return;
      const qty = Math.max(0.1, parseFloat(values.foodQuantity) || 1);
      const cals = (parseFloat(values.manualCalories) || 0) * qty;
      const prot = (parseFloat(values.manualProtein) || 0) * qty;
      const crbs = (parseFloat(values.manualCarbs) || 0) * qty;
      const ft = (parseFloat(values.manualFat) || 0) * qty;

      newItem = {
        id: Date.now().toString(),
        name: values.manualName.trim(),
        quantity: qty,
        unit: "واحد",
        calories: Math.round(cals),
        protein: Math.round(prot * 10) / 10,
        carbs: Math.round(crbs * 10) / 10,
        fat: Math.round(ft * 10) / 10,
      };
    } else {
      if (!selectedPresetFood) return;
      const qty = Math.max(0.1, parseFloat(values.foodQuantity) || 100);

      let multiplier = 1;
      let unitStr = "گرم";
      const presetUnit = selectedPresetFood.unit || "";

      if (presetUnit.includes("عدد")) {
        multiplier = qty;
        unitStr = "عدد";
      } else if (presetUnit.includes("پیمانه")) {
        multiplier = qty;
        unitStr = "پیمانه";
      } else if (presetUnit.includes("سیخ")) {
        multiplier = qty;
        unitStr = "سیخ";
      } else {
        multiplier = qty / 100;
        unitStr = "گرم";
      }

      newItem = {
        id: Date.now().toString(),
        name: selectedPresetFood.name,
        quantity: qty,
        unit: unitStr,
        calories: Math.round(selectedPresetFood.calories * multiplier),
        protein:
          Math.round((selectedPresetFood.protein || 0) * multiplier * 10) / 10,
        carbs:
          Math.round((selectedPresetFood.carbs || 0) * multiplier * 10) / 10,
        fat: Math.round((selectedPresetFood.fat || 0) * multiplier * 10) / 10,
      };
    }

    onSaveFood(newItem);

    const updatedMeals = {
      ...currentMeals,
      [activeMealType]: [...(currentMeals[activeMealType] || []), newItem],
    };

    try {
      const response = await fetch("/api/nutrition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate,
          meals: updatedMeals,
        }),
      });
      if (response.ok) {
        mutate(`/api/nutrition?date=${selectedDate}`);
      }
    } catch {
      mutate(`/api/nutrition?date=${selectedDate}`);
    }
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md font-danaMed"
      dir="rtl"
    >
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/80"></div>
      <div className="bg-neutral-950 border z-50 border-amber-500/20 rounded-3xl w-full max-w-lg p-6 shadow-2xl shadow-amber-500/10 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 text-white/60 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl text-white font-bold mb-4 flex items-center gap-2 font-morabbaReg">
          <Zap className="w-5 h-5 text-amber-400" />
          ثبت غذا در وعده {translateMealName(activeMealType)}
        </h3>

        <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-neutral-900 rounded-xl border border-amber-500/20">
          <button
            type="button"
            onClick={() => setIsManualInput(false)}
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
            onClick={() => setIsManualInput(true)}
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
                  ) : !selectedPresetFood ? (
                    <div className="space-y-2">
                      <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-wider mb-2">
                        غذاهای پر مصرف:
                      </p>
                      {isFetchingPopular ? (
                        <div className="text-center py-4 text-white/30 text-xs">
                          در حال بارگذاری غذاها...
                        </div>
                      ) : popularFoods.length === 0 ? (
                        <div className="text-center py-4 text-white/30 text-xs">
                          غذایی برای این وعده یافت نشد.
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {popularFoods.slice(0, 6).map((food) => (
                            <button
                              type="button"
                              key={food._id}
                              onClick={() => handleSelectPreset(food)}
                              className="text-right text-xs bg-white/5 hover:bg-white/10 hover:text-white text-white/70 border border-white/5 px-3 py-2.5 rounded-xl transition-all cursor-pointer"
                            >
                              <span className="block font-medium">
                                {food.name}
                              </span>
                              <span className="block text-[9px] text-white/40 mt-0.5 ss02">
                                {food.calories} kcal / {food.unit}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
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
                        {selectedPresetFood.calories} کالری پایه
                      </span>
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 text-xs">
                        مقدار مصرفی (
                        {(selectedPresetFood.unit || "").includes("عدد")
                          ? "عدد"
                          : (selectedPresetFood.unit || "").includes("پیمانه")
                            ? "پیمانه"
                            : (selectedPresetFood.unit || "").includes("سیخ")
                              ? "سیخ"
                              : "گرم"}
                        ):
                      </label>
                      <input
                        type="number"
                        {...register("foodQuantity")}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <ManualFoodInput />
            )}

            <div className="flex gap-4 mt-6 pt-4 border-t border-white/10">
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
              <button
                type="button"
                onClick={onClose}
                className="px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white py-3 rounded-xl transition-all cursor-pointer text-xs"
              >
                انصراف
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default memo(AddFoodModal);
