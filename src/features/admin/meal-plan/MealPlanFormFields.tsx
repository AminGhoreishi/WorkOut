"use client";

import { useState, useEffect, useRef } from "react";
import { useFieldArray } from "react-hook-form";
import useSWR from "swr";
import {
  Plus,
  Trash2,
  Salad,
  Sparkles,
  AlertCircle,
  Search,
  Users,
  UserCheck,
  X,
  Loader2,
} from "lucide-react";
import { showAlert } from "@/utils/alert";
import type { MealPlanFormFieldsProps } from "@/types/meal-plan";

export default function MealPlanFormFields({
  register,
  errors,
  control,
  setValue,
  initialUser,
  isSubmitting,
  onCancel,
  onSubmit,
}: MealPlanFormFieldsProps) {
  const [activeMealTab, setActiveMealTab] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  const [manualFoodName, setManualFoodName] = useState("");
  const [manualFoodQuantity, setManualFoodQuantity] = useState("");

  const [selectedUser, setSelectedUser] = useState<{ _id: string; fullName?: string; username?: string } | null>(
    initialUser || null
  );
  const [userSearchText, setUserSearchText] = useState("");
  const [debouncedUserSearch, setDebouncedUserSearch] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

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

  const mealTabs = [
    { key: "breakfast", label: "صبحانه", fields: breakfastFields, removeFn: removeBreakfast, appendFn: appendBreakfast },
    { key: "lunch", label: "ناهار", fields: lunchFields, removeFn: removeLunch, appendFn: appendLunch },
    { key: "dinner", label: "شام", fields: dinnerFields, removeFn: removeDinner, appendFn: appendDinner },
    { key: "snack", label: "میان وعده", fields: snackFields, removeFn: removeSnack, appendFn: appendSnack },
  ] as const;

  const currentTabInfo = mealTabs.find((tab) => tab.key === activeMealTab) || mealTabs[0];

  useEffect(() => {
    if (initialUser) {
      setSelectedUser(initialUser);
      if (setValue) {
        setValue("userId", initialUser._id, { shouldValidate: true });
      }
    }
  }, [initialUser, setValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUserSearch(userSearchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [userSearchText]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchUrl =
    debouncedUserSearch.trim() && isUserDropdownOpen
      ? `/api/admin/subscription/users/search?query=${encodeURIComponent(debouncedUserSearch.trim())}`
      : null;

  const { data: searchData, isLoading: isSearchingUsers } = useSWR<{
    users: { _id: string; fullName?: string; username?: string }[];
  }>(searchUrl, async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    return res.json();
  });

  const searchUsers = searchData?.users || [];

  const handleSelectUser = (u: { _id: string; fullName?: string; username?: string }) => {
    setSelectedUser(u);
    if (setValue) {
      setValue("userId", u._id, { shouldValidate: true, shouldDirty: true });
    }
    setIsUserDropdownOpen(false);
    setUserSearchText("");
  };

  const handleClearUser = () => {
    setSelectedUser(null);
    if (setValue) {
      setValue("userId", "", { shouldValidate: true, shouldDirty: true });
    }
    setUserSearchText("");
  };

  const handleAddManualFood = () => {
    const cleanedName = manualFoodName.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
    if (!cleanedName) {
      showAlert({
        title: "خطا",
        text: "لطفاً نام غذا را وارد کنید.",
        icon: "warning",
      });
      return;
    }

    if (cleanedName.length > 100) {
      showAlert({
        title: "خطا",
        text: "نام غذا نمی‌تواند بیش از ۱۰۰ کاراکتر باشد.",
        icon: "warning",
      });
      return;
    }

    if (currentTabInfo.fields.length >= 50) {
      showAlert({
        title: "محدودیت تعداد",
        text: "حداکثر ۵۰ غذا در هر وعده قابل ثبت است.",
        icon: "warning",
      });
      return;
    }

    const cleanedQty = manualFoodQuantity.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
    const newItem = {
      name: cleanedName,
      quantity: cleanedQty || "۱ واحد",
      unit: "",
    };

    currentTabInfo.appendFn(newItem);
    setManualFoodName("");
    setManualFoodQuantity("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing) return;
      e.preventDefault();
      handleAddManualFood();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 font-danaMed" dir="rtl" noValidate>
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
              maxLength: {
                value: 120,
                message: "عنوان برنامه نباید بیش از ۱۲۰ کاراکتر باشد.",
              },
            })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-500"
            placeholder="مثال: رژیم کاهش وزن پکیج طلایی"
          />
          {errors.title && (
            <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5" ref={userDropdownRef}>
          <label className="text-xs text-gray-400 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            مربوط به کاربر دارای اشتراک
          </label>

          <input type="hidden" {...register("userId")} />

          {selectedUser ? (
            <div className="w-full bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-2 text-sm text-white flex items-center justify-between transition-all">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="font-semibold text-xs text-white">
                    {selectedUser.fullName || selectedUser.username || "کاربر انتخاب‌شده"}
                  </span>
                  {selectedUser.username && selectedUser.fullName && (
                    <span className="text-[10px] text-gray-400 mr-2 font-mono" dir="ltr">
                      @{selectedUser.username}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearUser}
                className="p-1 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
                title="تغییر کاربر"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                value={userSearchText}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserSearchText(val);
                  if (val.trim()) {
                    setIsUserDropdownOpen(true);
                  } else {
                    setIsUserDropdownOpen(false);
                  }
                }}
                placeholder="جستجوی نام یا شماره کاربر..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-9 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-500"
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-gray-400">
                {isSearchingUsers ? (
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </div>

              {isUserDropdownOpen && debouncedUserSearch.trim() && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-neutral-900 border border-white/15 rounded-xl shadow-2xl z-30 max-h-56 overflow-y-auto py-1 font-danaMed divide-y divide-white/5">
                  {isSearchingUsers && searchUsers.length === 0 ? (
                    <div className="px-4 py-3 text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      در حال جستجو بین کاربران دارای اشتراک...
                    </div>
                  ) : searchUsers.length === 0 ? (
                    <div className="px-4 py-3 text-xs text-gray-400 text-center">
                      کاربر دارای اشتراکی با این مشخصات یافت نشد.
                    </div>
                  ) : (
                    searchUsers.map((u) => (
                      <button
                        key={u._id}
                        type="button"
                        onClick={() => handleSelectUser(u)}
                        className="w-full text-right px-4 py-2.5 text-xs text-white hover:bg-emerald-500/20 flex justify-between items-center transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-semibold text-white">
                            {u.fullName || u.username || "بدون نام"}
                          </span>
                        </div>
                        {u.username && u.fullName && (
                          <span className="text-[10px] text-gray-400 font-mono shrink-0" dir="ltr">
                            @{u.username}
                          </span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {errors.userId && (
            <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.userId.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5 justify-center">
          <div className="flex items-center gap-2 mt-4 bg-white/[0.02] border border-white/5 p-3 rounded-xl">
            <input
              type="checkbox"
              id="isActive"
              {...register("isActive")}
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-emerald-500 cursor-pointer accent-emerald-500"
            />
            <label htmlFor="isActive" className="text-xs text-gray-300 cursor-pointer select-none">
              برنامه غذایی فعال باشد (نمایش به کاربر)
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-gray-400">توضیحات و توصیه‌های عمومی</label>
        <textarea
          rows={2}
          {...register("description", {
            maxLength: {
              value: 1000,
              message: "توضیحات نباید بیش از ۱۰۰۰ کاراکتر باشد.",
            },
          })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-500 resize-none leading-relaxed"
          placeholder="توصیه‌هایی مانند زمان مصرف آب، میزان نمک یا روغن و..."
        />
        {errors.description && (
          <span className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="border-t border-white/10 pt-6 space-y-6">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2 font-morabbaReg">
              <Salad className="w-4.5 h-4.5 text-emerald-400" />
              تنظیم وعده‌های غذایی روزانه
            </h3>
            <span className="text-[11px] text-gray-400">
              مجموع اقلام ثبت شده: {mealTabs.reduce((sum, t) => sum + t.fields.length, 0)} مورد
            </span>
          </div>

          <div className="flex flex-wrap border-b border-white/10 gap-2 mb-6">
            {mealTabs.map((tab) => {
              const tabErrors = errors[tab.key];
              const hasErrors = Boolean(tabErrors);
              const isActive = activeMealTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveMealTab(tab.key)}
                  className={`px-5 py-2.5 text-sm font-bold rounded-t-xl transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "border-emerald-500 text-emerald-400 bg-white/5"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-white/5 text-gray-400"
                    }`}
                  >
                    {tab.fields.length}
                  </span>
                  {hasErrors && (
                    <span
                      className="w-2 h-2 rounded-full bg-red-500 animate-pulse"
                      title="این وعده دارای خطای ورودی است"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="lg:col-span-1 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                افزودن دستی غذا به {currentTabInfo.label}
              </h4>

              <div className="space-y-3 bg-neutral-900/60 p-4 rounded-xl border border-white/5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-gray-400">نام غذا</label>
                  <input
                    type="text"
                    value={manualFoodName}
                    onChange={(e) => setManualFoodName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={100}
                    placeholder="مثال: فیله مرغ گریل، تخم‌مرغ، جو دوسر..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-gray-400">مقدار و واحد</label>
                  <input
                    type="text"
                    value={manualFoodQuantity}
                    onChange={(e) => setManualFoodQuantity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={60}
                    placeholder="مثال: ۲۰۰ گرم، ۲ عدد، ۱ لیوان..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddManualFood}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/10 mt-1"
                >
                  <Plus className="w-4 h-4" />
                  افزودن به {currentTabInfo.label}
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-400">
                  غذاهای ثبت شده ({currentTabInfo.label})
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    if (currentTabInfo.fields.length >= 50) {
                      showAlert({
                        title: "محدودیت تعداد",
                        text: "حداکثر ۵۰ غذا در هر وعده قابل ثبت است.",
                        icon: "warning",
                      });
                      return;
                    }
                    currentTabInfo.appendFn({ name: "", quantity: "۱ واحد", unit: "" });
                  }}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  افزودن ردیف خالی
                </button>
              </div>

              {mealTabs.map((tab) => {
                const isTabActive = activeMealTab === tab.key;
                const tabFieldErrors = errors[tab.key] as any;

                return (
                  <div key={tab.key} className={isTabActive ? "block" : "hidden"}>
                    {tab.fields.length === 0 ? (
                      <div className="text-center py-12 border border-dashed border-white/10 rounded-xl text-gray-500 text-xs">
                        هنوز غذایی برای وعده {tab.label} ثبت نشده است. از کادر روبرو نام و مقدار غذا را وارد کنید.
                      </div>
                    ) : (
                      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                        {tab.fields.map((item, index) => {
                          const typedItem = item as { id: string; name?: string; quantity?: string | number; unit?: string };
                          const itemError = tabFieldErrors?.[index];

                          return (
                            <div key={typedItem.id} className="space-y-1">
                              <div
                                className={`flex items-center justify-between bg-white/5 border rounded-xl p-2 text-xs gap-3 transition-colors ${
                                  itemError ? "border-red-500/40 bg-red-500/[0.03]" : "border-white/10"
                                }`}
                              >
                                <div className="flex-1">
                                  <input
                                    type="text"
                                    {...register(`${tab.key}.${index}.name` as const, {
                                      required: "نام غذا الزامی است.",
                                      minLength: {
                                        value: 2,
                                        message: "نام غذا باید حداقل ۲ کاراکتر باشد.",
                                      },
                                      maxLength: {
                                        value: 100,
                                        message: "نام غذا نباید بیش از ۱۰۰ کاراکتر باشد.",
                                      },
                                    })}
                                    placeholder="نام غذا (مثلاً سینه مرغ)"
                                    className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-emerald-500 placeholder:text-white/30"
                                  />
                                </div>
                                <div className="w-36">
                                  <input
                                    type="text"
                                    {...register(`${tab.key}.${index}.quantity` as const, {
                                      maxLength: {
                                        value: 60,
                                        message: "مقدار نباید بیش از ۶۰ کاراکتر باشد.",
                                      },
                                    })}
                                    placeholder="مقدار (مثلاً ۲۰۰ گرم)"
                                    className="w-full bg-neutral-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-center text-white text-xs focus:outline-none focus:border-emerald-500 placeholder:text-white/30"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => tab.removeFn(index)}
                                  className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-red-400 transition-colors cursor-pointer shrink-0"
                                  title="حذف این مورد"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              {itemError?.name && (
                                <span className="text-[10px] text-red-400 flex items-center gap-1 px-2">
                                  <AlertCircle className="w-2.5 h-2.5" />
                                  {itemError.name.message}
                                </span>
                              )}
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
