"use client";

import { useState, useMemo, useCallback } from "react";
import useSWR from "swr";
import {
  Salad,
  Flame,
  Utensils,
  Edit2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import type {
  FoodItem,
  MealData,
  MealItem,
  NutritionLog,
  NutritionTrackerProps,
} from "@/types/nutrition";
import WaterTracker from "./WaterTracker";
import AddFoodModal from "./AddFoodModal";
import EditTargetModal from "./EditTargetModal";
import MealsGrid from "./MealsGrid";
import { BeatLoader } from "react-spinners";
import { getLocalDateString, getPersianDateLabel } from "@/utils/date";

const fetcher = async (url: string): Promise<NutritionLog | null> => {
  const res = await fetch(url);
  if (!res.ok) {
    return null;
  }
  return res.json();
};

export default function NutritionTracker({ userId }: NutritionTrackerProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    getLocalDateString(0),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMealType, setActiveMealType] =
    useState<keyof MealData>("breakfast");
  const [isEditingTarget, setIsEditingTarget] = useState(false);

  const {
    data: logData,
    isLoading: isLoadingMeals,
    mutate,
  } = useSWR<NutritionLog | null>(
    `/api/nutrition?date=${selectedDate}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    },
  );

  const targetCalories = logData?.targetCalories ?? 2200;
  const targetMacros = useMemo(
    () => ({
      protein: logData?.targetProtein ?? 140,
      carbs: logData?.targetCarbs ?? 240,
      fat: logData?.targetFat ?? 70,
    }),
    [logData?.targetProtein, logData?.targetCarbs, logData?.targetFat],
  );
  const targetWater = logData?.targetWater ?? 2500;

  const currentMeals = useMemo<MealData>(() => {
    if (!logData || !logData.meals) {
      return {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      };
    }

    const mapItems = (items: MealItem[] = []): FoodItem[] =>
      items.map((item, idx) => ({
        id: item.id || item._id || `item-${idx}`,
        name: item.name || "",
        quantity: item.quantity || 1,
        unit: item.unit || "واحد",
        calories: item.calories || 0,
        protein: item.protein || 0,
        carbs: item.carbs || 0,
        fat: item.fat || 0,
      }));

    return {
      breakfast: mapItems(logData.meals.breakfast),
      lunch: mapItems(logData.meals.lunch),
      dinner: mapItems(logData.meals.dinner),
      snack: mapItems(logData.meals.snack),
    };
  }, [logData]);

  const currentWater = logData?.waterIntake ?? 0;
  const targetsLoaded = !isLoadingMeals;

  const changeDate = (direction: "next" | "prev") => {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + (direction === "next" ? 1 : -1));

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    setSelectedDate(`${y}-${m}-${d}`);
  };

  const dailyTotals = useMemo(() => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    Object.values(currentMeals).forEach((mealItems) => {
      (mealItems || []).forEach((item: FoodItem) => {
        calories += item.calories || 0;
        protein += item.protein || 0;
        carbs += item.carbs || 0;
        fat += item.fat || 0;
      });
    });

    return {
      calories: Math.round(calories),
      protein: Math.round(protein * 10) / 10,
      carbs: Math.round(carbs * 10) / 10,
      fat: Math.round(fat * 10) / 10,
    };
  }, [currentMeals]);

  const caloriesRemaining = Math.max(0, targetCalories - dailyTotals.calories);
  const calPercent =
    targetCalories > 0
      ? Math.min(100, Math.round((dailyTotals.calories / targetCalories) * 100))
      : 0;

  const handleDeleteFood = useCallback(
    async (mealType: keyof MealData, itemId: string) => {
      const updatedMeal = (currentMeals[mealType] || []).filter(
        (item) => item.id !== itemId,
      );

      const updatedMealsForDate = {
        ...currentMeals,
        [mealType]: updatedMeal,
      };

      const updatedLog: NutritionLog = {
        _id: logData?._id || "",
        userId,
        date: selectedDate,
        meals: updatedMealsForDate,
        waterIntake: currentWater,
        targetCalories,
        targetProtein: targetMacros.protein,
        targetCarbs: targetMacros.carbs,
        targetFat: targetMacros.fat,
        targetWater,
      };

      mutate(updatedLog, false);

      try {
        const response = await fetch("/api/nutrition", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: selectedDate,
            meals: updatedMealsForDate,
          }),
        });
        if (!response.ok) {
          mutate();
        } else {
          mutate();
        }
      } catch {
        mutate();
      }
    },
    [
      currentMeals,
      currentWater,
      targetCalories,
      targetMacros,
      targetWater,
      logData?._id,
      selectedDate,
      userId,
      mutate,
    ],
  );

  const handleSaveFood = useCallback(
    (newItem: FoodItem) => {
      const updatedMeals = {
        ...currentMeals,
        [activeMealType]: [...(currentMeals[activeMealType] || []), newItem],
      };

      const updatedLog: NutritionLog = {
        _id: logData?._id || "",
        userId,
        date: selectedDate,
        meals: updatedMeals,
        waterIntake: currentWater,
        targetCalories,
        targetProtein: targetMacros.protein,
        targetCarbs: targetMacros.carbs,
        targetFat: targetMacros.fat,
        targetWater,
      };

      mutate(updatedLog, false);
      setIsModalOpen(false);
    },
    [
      currentMeals,
      activeMealType,
      logData?._id,
      userId,
      selectedDate,
      currentWater,
      targetCalories,
      targetMacros,
      targetWater,
      mutate,
    ],
  );

  const handleWaterChange = useCallback(
    (newAmount: number) => {
      if (logData) {
        mutate({ ...logData, waterIntake: newAmount }, false);
      } else {
        mutate();
      }
    },
    [logData, mutate],
  );

  const handleAddFoodClick = useCallback((mealType: keyof MealData) => {
    setActiveMealType(mealType);
    setIsModalOpen(true);
  }, []);

  return (
    <div
      className="font-danaMed  pt-4 md:pt-8 bg-neutral-950 min-h-screen text-white"
      dir="rtl"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Salad className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl text-white font-bold font-morabbaReg">
                تغذیه و کالری‌شمار روزانه
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">
                رهگیری دقیق کالری، درشت‌مغذی‌ها و آب مصرفی
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto bg-white/5 border border-amber-500/15 rounded-2xl p-1 gap-1">
            <button
              onClick={() => changeDate("prev")}
              className="p-2 rounded-xl text-neutral-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer"
              title="دیروز"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 h-5" />
            </button>

            <button
              onClick={() => {
                const todayStr = getLocalDateString(0);
                if (selectedDate !== todayStr) {
                  setSelectedDate(todayStr);
                }
              }}
              className="px-3 sm:px-6 py-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white rounded-xl hover:bg-amber-500/10 transition-all cursor-pointer select-none flex-1 text-center"
            >
              <span className="ss02">{getPersianDateLabel(selectedDate)}</span>
            </button>

            <button
              onClick={() => changeDate("next")}
              className="p-2 rounded-xl text-neutral-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer"
              title="فردا"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8 bg-white/[0.03] border border-amber-500/15 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10" />

            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-base sm:text-lg text-white font-bold flex items-center gap-2 font-morabbaReg">
                  <Flame className="w-5 h-5 text-amber-400" />
                  وضعیت کالری روزانه
                </h3>
                <p className="text-neutral-400 text-[10px] sm:text-xs mt-1">
                  ترازو و تحلیل کالری‌های وارد شده
                </p>
              </div>
              <button
                onClick={() => {
                  if (targetsLoaded) setIsEditingTarget(true);
                }}
                disabled={!targetsLoaded}
                className="text-left flex flex-col items-end group hover:opacity-85 transition-all cursor-pointer border-none bg-transparent p-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-1">
                  {targetsLoaded ? (
                    <span className="text-xl sm:text-2xl font-extrabold text-amber-400 ss02">
                      {targetCalories}
                    </span>
                  ) : (
                    <BeatLoader color="#eab308" size={6} />
                  )}
                  <Edit2 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <span className="text-neutral-400 text-[10px] sm:text-xs">
                  کالری هدف (کلیک برای ویرایش)
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center rounded-full bg-amber-500/5 border-4 border-amber-500/20">
                  <div
                    className="absolute inset-0 rounded-full border-4 border-amber-400 transition-all duration-500"
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${calPercent >= 25 ? "100% 0%" : "50% 0%"}, ${calPercent >= 50 ? "100% 100%" : "50% 0%"}, ${calPercent >= 75 ? "0% 100%" : "50% 0%"}, ${calPercent >= 100 ? "0% 0%" : "50% 0%"}, 50% 0%)`,
                      transform: "rotate(-90deg)",
                    }}
                  />
                  <div className="text-center z-10">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 ss02">
                      {dailyTotals.calories}
                    </span>
                    <span className="text-neutral-400 text-[10px] sm:text-xs mt-0.5 block">
                      مصرف شده
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-neutral-400 text-xs sm:text-sm">
                    باقی‌مانده:
                  </span>
                  {targetsLoaded ? (
                    <span className="text-white font-bold text-sm sm:text-lg ss02">
                      {caloriesRemaining} kcal
                    </span>
                  ) : (
                    <BeatLoader color="#eab308" size={5} />
                  )}
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-neutral-400 text-xs sm:text-sm">
                    درصد تکمیل:
                  </span>
                  {targetsLoaded ? (
                    <span className="text-amber-400 font-bold text-xs sm:text-base ss02">
                      {calPercent}%
                    </span>
                  ) : (
                    <BeatLoader color="#eab308" size={4} />
                  )}
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-neutral-400 text-xs sm:text-sm">
                    رعایت رژیم:
                  </span>
                  {targetsLoaded ? (
                    <span
                      className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-semibold ${
                        calPercent > 105
                          ? "bg-amber-500/20 text-amber-400"
                          : calPercent >= 90
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                            : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {calPercent > 105
                        ? "فراتر از حد مجاز"
                        : calPercent >= 90
                          ? "عالی و متعادل"
                          : "کمتر از کالری مورد نیاز"}
                    </span>
                  ) : (
                    <BeatLoader color="#eab308" size={4} />
                  )}
                </div>
              </div>

              <div className="space-y-3 bg-white/5 border border-amber-500/10 rounded-2xl p-4">
                <h4 className="text-neutral-300 text-[10px] sm:text-xs font-semibold mb-2">
                  درشت‌مغذی‌ها (Macros)
                </h4>

                <div>
                  <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                    <span className="text-amber-300">پروتئین (عضله‌ساز)</span>
                    <span className="text-neutral-400 flex items-center gap-1 ss02">
                      {dailyTotals.protein} /{" "}
                      {targetsLoaded ? (
                        `${targetMacros.protein}g`
                      ) : (
                        <BeatLoader color="#eab308" size={4} />
                      )}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${targetMacros.protein > 0 ? Math.min(100, (dailyTotals.protein / targetMacros.protein) * 100) : 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                    <span className="text-amber-400">کربوهیدرات (انرژی)</span>
                    <span className="text-neutral-400 flex items-center gap-1 ss02">
                      {dailyTotals.carbs} /{" "}
                      {targetsLoaded ? (
                        `${targetMacros.carbs}g`
                      ) : (
                        <BeatLoader color="#eab308" size={4} />
                      )}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-300"
                      style={{
                        width: `${targetMacros.carbs > 0 ? Math.min(100, (dailyTotals.carbs / targetMacros.carbs) * 100) : 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                    <span className="text-yellow-400">چربی (هورمون‌ساز)</span>
                    <span className="text-neutral-400 flex items-center gap-1 ss02">
                      {dailyTotals.fat} /{" "}
                      {targetsLoaded ? (
                        `${targetMacros.fat}g`
                      ) : (
                        <BeatLoader color="#eab308" size={4} />
                      )}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-300"
                      style={{
                        width: `${targetMacros.fat > 0 ? Math.min(100, (dailyTotals.fat / targetMacros.fat) * 100) : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <WaterTracker
            selectedDate={selectedDate}
            targetWater={targetWater}
            userId={userId}
            waterIntake={currentWater}
            onWaterChange={handleWaterChange}
            isLoading={isLoadingMeals}
          />
        </div>

        <h3 className="text-lg sm:text-xl text-white font-bold mb-6 flex items-center gap-2 font-morabbaReg">
          <Utensils className="w-5 h-5 text-amber-400" />
          وعده‌های غذایی امروز
        </h3>

        <MealsGrid
          currentMeals={currentMeals}
          isLoadingMeals={isLoadingMeals}
          onDeleteFood={handleDeleteFood}
          onAddFoodClick={handleAddFoodClick}
        />
      </div>

      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeMealType={activeMealType}
        onSaveFood={handleSaveFood}
        userId={userId}
        selectedDate={selectedDate}
        currentMeals={currentMeals}
      />

      <EditTargetModal
        isOpen={isEditingTarget}
        onClose={() => setIsEditingTarget(false)}
        userId={userId}
        targetCalories={targetCalories}
        targetMacros={targetMacros}
        targetWater={targetWater}
        onSaveTargets={(calories, protein, carbs, fat, water) => {
          if (logData) {
            mutate(
              {
                ...logData,
                targetCalories: calories,
                targetProtein: protein,
                targetCarbs: carbs,
                targetFat: fat,
                targetWater: water,
              },
              false,
            );
          } else {
            mutate();
          }
          setIsEditingTarget(false);
        }}
      />
    </div>
  );
}
