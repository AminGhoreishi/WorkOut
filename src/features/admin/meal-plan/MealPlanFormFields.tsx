"use client";

import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Plus, Search, Trash2, Salad, Sparkles } from "lucide-react";
import { showAlert } from "@/utils/alert";
import type { MealPlanFormFieldsProps, MealPlanFormInputs } from "@/types/meal-plan";

export default function MealPlanFormFields({
  register,
  errors,
  control,
  watch,
  packages = [],
  users = [],
  foods = [],
  isSubmitting,
  onCancel,
  onSubmit,
}: MealPlanFormFieldsProps) {
  const [activeMealTab, setActiveMealTab] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  const [foodSearchText, setFoodSearchText] = useState("");
  const [selectedFoodIdToAdd, setSelectedFoodIdToAdd] = useState("");

  const { fields: breakfastFields, append: appendBreakfast, remove: removeBreakfast } = useFieldArray({
    control,
    name: "breakfast",
  });
  const { fields: lunchFields, append: appendLunch, remove: removeLunch } = useFieldArray({
    control,
    name: "lunch",
  });
  const { fields: dinnerFields, append: appendDinner, remove: removeDinner } = useFieldArray({
    control,
    name: "dinner",
  });
  const { fields: snackFields, append: appendSnack, remove: removeSnack } = useFieldArray({
    control,
    name: "snack",
  });

  const watchBreakfast: MealPlanFormInputs["breakfast"] = watch("breakfast") || [];
  const watchLunch: MealPlanFormInputs["lunch"] = watch("lunch") || [];
  const watchDinner: MealPlanFormInputs["dinner"] = watch("dinner") || [];
  const watchSnack: MealPlanFormInputs["snack"] = watch("snack") || [];

  const handleAddFoodToTab = () => {
    if (!selectedFoodIdToAdd) return;
    const food = foods.find((f) => String(f._id) === String(selectedFoodIdToAdd));
    if (!food) return;

    const getActiveTabWatchItems = () => {
      if (activeMealTab === "breakfast") return watchBreakfast;
      if (activeMealTab === "lunch") return watchLunch;
      if (activeMealTab === "dinner") return watchDinner;
      return watchSnack;
    };

    if (getActiveTabWatchItems().some((item) => item.foodId === food._id)) {
      showAlert({
        title: "هشدار",
        text: "این غذا قبلاً به این وعده اضافه شده است.",
        icon: "warning",
      });
      return;
    }

    const newItem = {
      foodId: food._id,
      name: food.name,
      quantity: "100 گرم",
      unit: food.unit || "",
    };

    if (activeMealTab === "breakfast") appendBreakfast(newItem);
    else if (activeMealTab === "lunch") appendLunch(newItem);
    else if (activeMealTab === "dinner") appendDinner(newItem);
    else appendSnack(newItem);

    setSelectedFoodIdToAdd("");
    setFoodSearchText("");
  };

  const filteredFoodsForSelect = foods.filter((food) =>
    food.name.toLowerCase().includes(foodSearchText.toLowerCase())
  );

  const mealTabs = [
    { key: "breakfast", label: "صبحانه", fields: breakfastFields, watchItems: watchBreakfast, removeFn: removeBreakfast },
    { key: "lunch", label: "ناهار", fields: lunchFields, watchItems: watchLunch, removeFn: removeLunch },
    { key: "dinner", label: "شام", fields: dinnerFields, watchItems: watchDinner, removeFn: removeDinner },
    { key: "snack", label: "میان وعده", fields: snackFields, watchItems: watchSnack, removeFn: removeSnack },
  ] as const;

  return (
    <form onSubmit={onSubmit} className="space-y-6 font-danaMed" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-400">عنوان برنامه</label>
          <input
            type="text"
            {...register("title", {
              required: "وارد کردن عنوان برنامه الزامی است.",
              minLength: {
                value: 2,
                message: "عنوان برنامه باید حداقل ۲ کاراکتر باشد.",
              },
            })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-500"
            placeholder="مثال: رژیم کاهش وزن پکیج طلایی"
          />
          {errors.title && (
            <span className="text-[10px] text-red-400">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-400">مربوط به کاربر</label>
          {users.length > 0 ? (
            <select
              {...register("userId")}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="">انتخاب کاربر...</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.fullName || u.username || u.email || u._id}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              {...register("userId")}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-500 font-mono text-left"
              dir="ltr"
              placeholder="شناسه کاربر (ObjectId)..."
            />
          )}
          {errors.userId && (
            <span className="text-[10px] text-red-400">{errors.userId.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5 justify-center">
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="isActive"
              {...register("isActive")}
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-emerald-500 cursor-pointer"
            />
            <label htmlFor="isActive" className="text-xs text-gray-300 cursor-pointer">
              برنامه غذایی فعال باشد (نمایش به کاربر دارای اشتراک)
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-gray-400">توضیحات و توصیههای عمومی</label>
        <textarea
          rows={2}
          {...register("description")}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-500 resize-none leading-relaxed"
          placeholder="توصیههایی مانند زمان مصرف آب، میزان نمک یا روغن و..."
        />
      </div>

      <div className="border-t border-white/10 pt-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2 font-morabbaReg">
            <Salad className="w-4.5 h-4.5 text-emerald-400" />
            تنظیم وعدههای غذایی روزانه
          </h3>

          <div className="flex flex-wrap border-b border-white/10 gap-2 mb-6">
            {mealTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveMealTab(tab.key);
                  setSelectedFoodIdToAdd("");
                }}
                className={`px-5 py-2.5 text-sm font-bold rounded-t-xl transition-all border-b-2 cursor-pointer ${ activeMealTab === tab.key ? "border-emerald-500 text-emerald-400 bg-white/5" : "border-transparent text-gray-400 hover:text-white" }`}
              >
                {tab.label} ({tab.watchItems.length})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="lg:col-span-1 space-y-4">
              <h4 className="text-xs font-bold text-gray-400">افزودن غذا به این وعده</h4>

              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={foodSearchText}
                    onChange={(e) => {
                      setFoodSearchText(e.target.value);
                      if (selectedFoodIdToAdd) setSelectedFoodIdToAdd("");
                    }}
                    placeholder="جستجوی غذا از بانک اطلاعاتی..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 pr-8 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-500"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-500 absolute top-1/2 right-2.5 -translate-y-1/2" />

                  {foodSearchText.trim() && !selectedFoodIdToAdd && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-neutral-900 border border-white/15 rounded-xl shadow-2xl z-20 max-h-48 overflow-y-auto py-1 font-danaMed">
                      {filteredFoodsForSelect.length === 0 ? (
                        <div className="px-3 py-2 text-[11px] text-gray-400 text-center">
                          هیچ غذایی یافت نشد
                        </div>
                      ) : (
                        filteredFoodsForSelect.map((food) => (
                          <button
                            key={food._id}
                            type="button"
                            onClick={() => {
                              setSelectedFoodIdToAdd(food._id);
                              setFoodSearchText(food.name);
                            }}
                            className="w-full text-right px-3 py-2 text-xs text-white hover:bg-emerald-500/20 flex justify-between items-center transition-colors cursor-pointer border-b border-white/5 last:border-0"
                          >
                            <span className="font-semibold">{food.name}</span>
                            {food.unit ? (
                              <span className="text-[10px] text-emerald-400 ss02 shrink-0">({food.unit})</span>
                            ) : null}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAddFoodToTab}
                  disabled={!selectedFoodIdToAdd}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  <Plus className="w-4 h-4" />
                  افزودن به این وعده
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-gray-400">غذاهای انتخاب شده</h4>

              {mealTabs.map((tab) => {
                const isTabActive = activeMealTab === tab.key;
                return (
                  <div key={tab.key} className={isTabActive ? "block" : "hidden"}>
                    {tab.fields.length === 0 ? (
                      <div className="text-center py-10 border border-dashed border-white/10 rounded-xl text-gray-500 text-xs">
                        هیچ غذایی برای این وعده انتخاب نشده است. از منوی سمت راست غذا اضافه کنید.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {tab.fields.map((item, index) => {
                          const typedItem = item as { id: string; name?: string; unit?: string; foodId?: string };
                          const matchedFood = foods.find((f) => String(f._id) === String(typedItem.foodId));
                          const displayName = typedItem.name || matchedFood?.name || "غذا";

                          return (
                            <div
                              key={typedItem.id}
                              className="flex items-center justify-between bg-white/5 border border-white/10 px-3 py-2 rounded-xl text-xs gap-4"
                            >
                              <span className="font-semibold text-white flex-1">{displayName}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">مقدار:</span>
                                <input
                                  type="text"
                                  {...register(`${tab.key}.${index}.quantity` as const)}
                                  placeholder="مثال: ۱۰۰ گرم یا ۲ عدد"
                                  className="w-36 bg-neutral-950 border border-white/10 rounded-lg px-2.5 py-1 text-center text-white text-xs focus:outline-none focus:border-emerald-500 placeholder:text-white/30"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => tab.removeFn(index)}
                                className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl border border-white/10 transition-all text-xs font-semibold cursor-pointer"
        >
          انصراف
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-neutral-950 font-bold px-8 py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs"
        >
          <Sparkles className="w-4 h-4" />
          {isSubmitting ? "در حال ذخیره..." : "ذخیره و ثبت برنامه"}
        </button>
      </div>
    </form>
  );
}
