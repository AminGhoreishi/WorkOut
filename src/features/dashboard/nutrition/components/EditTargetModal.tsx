import { useState, useEffect, memo } from "react";
import { useSWRConfig } from "swr";
import { Flame, Plus } from "lucide-react";
import type { EditTargetModalProps } from "@/types/nutrition";
import FitnessCalorieCalculator from "../FitnessCalorieCalculator";

const EditTargetModal: React.FC<EditTargetModalProps> = ({
  isOpen,
  onClose,
  userId,
  selectedDate,
  targetCalories,
  requiredCalories = 2200,
  targetMacros,
  targetWater,
  onSaveTargets,
}) => {
  const { mutate } = useSWRConfig();
  const [tempTargetCalories, setTempTargetCalories] = useState(
    targetCalories.toString(),
  );
  const [tempRequiredCalories, setTempRequiredCalories] = useState(
    requiredCalories.toString(),
  );
  const [tempTargetProtein, setTempTargetProtein] = useState(
    targetMacros.protein.toString(),
  );
  const [tempTargetCarbs, setTempTargetCarbs] = useState(
    targetMacros.carbs.toString(),
  );
  const [tempTargetFat, setTempTargetFat] = useState(
    targetMacros.fat.toString(),
  );
  const [tempTargetWater, setTempTargetWater] = useState(
    targetWater.toString(),
  );

  useEffect(() => {
    if (isOpen) {
      setTempTargetCalories(targetCalories.toString());
      setTempRequiredCalories((requiredCalories ?? 2200).toString());
      setTempTargetProtein(targetMacros.protein.toString());
      setTempTargetCarbs(targetMacros.carbs.toString());
      setTempTargetFat(targetMacros.fat.toString());
      setTempTargetWater(targetWater.toString());
    }
  }, [isOpen, targetCalories, requiredCalories, targetMacros, targetWater]);

  if (!isOpen) return null;

  const handleSave = async () => {
    const calories = Math.max(0, parseInt(tempTargetCalories) || 2200);
    const reqCalories = Math.max(0, parseInt(tempRequiredCalories) || 2200);
    const protein = Math.max(0, parseInt(tempTargetProtein) || 140);
    const carbs = Math.max(0, parseInt(tempTargetCarbs) || 240);
    const fat = Math.max(0, parseInt(tempTargetFat) || 70);
    const water = Math.max(0, parseInt(tempTargetWater) || 2500);

    onSaveTargets(calories, protein, carbs, fat, water, reqCalories);

    try {
      const response = await fetch("/api/nutrition", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tempTargetCalories: calories,
          tempRequiredCalories: reqCalories,
          tempTargetProtein: protein,
          tempTargetCarbs: carbs,
          tempTargetFat: fat,
          tempTargetWater: water,
          date: selectedDate,
        }),
      });

      if (response.ok) {
        mutate((key: unknown) => typeof key === "string" && key.startsWith("/api/nutrition"));
      }
    } catch {
      mutate((key: unknown) => typeof key === "string" && key.startsWith("/api/nutrition"));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm font-danaMed"
      dir="rtl"
    >
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/80"></div>
      <div className="bg-neutral-900 border z-50 border-amber-500/20 rounded-3xl w-full max-w-md p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1 rounded-lg bg-white/5 hover:bg-amber-500/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5 rotate-45" />
        </button>

        <h3 className="text-lg text-white font-bold mb-4 flex items-center gap-2 font-morabbaReg">
          <Flame className="w-5 h-5 text-amber-400" />
          تنظیم اهداف کالری و درشت‌مغذی‌ها
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-neutral-300 mb-2 text-xs font-medium">
              کالری هدف روزانه:
            </label>
            <input
              type="number"
              value={tempTargetCalories}
              onChange={(e) => setTempTargetCalories(e.target.value)}
              placeholder="مثال: ۲۲۰۰"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500/50 text-sm ss02"
            />
          </div>

          <div>
            <label className="block text-neutral-300 mb-2 text-xs font-medium">
              کالری مورد نیاز:
            </label>
            <input
              type="number"
              value={tempRequiredCalories}
              onChange={(e) => setTempRequiredCalories(e.target.value)}
              placeholder="مثال: ۲۲۰۰"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500/50 text-sm ss02"
            />
          </div>

          <FitnessCalorieCalculator
            isOpen={isOpen}
            onApplyCalorie={(cal, macros) => {
              setTempTargetCalories(cal.toString());
              setTempRequiredCalories(cal.toString());
              if (macros) {
                setTempTargetProtein(macros.protein.toString());
                setTempTargetCarbs(macros.carbs.toString());
                setTempTargetFat(macros.fat.toString());
              }
            }}
          />

          <div>
            <label className="block text-neutral-300 mb-2 text-xs font-medium">
              آب هدف روزانه (میلی‌لیتر):
            </label>
            <input
              type="number"
              value={tempTargetWater}
              onChange={(e) => setTempTargetWater(e.target.value)}
              placeholder="مثال: ۲۵۰۰"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500/50 text-sm ss02"
            />
          </div>

          <div className="border-t border-white/5 pt-4">
            <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-wider mb-3">
              اهداف درشت‌مغذی‌ها:
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-amber-300 mb-1 text-[10px]">
                  پروتئین (g):
                </label>
                <input
                  type="number"
                  value={tempTargetProtein}
                  onChange={(e) => setTempTargetProtein(e.target.value)}
                  placeholder="140"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500/50 text-xs ss02"
                />
              </div>
              <div>
                <label className="block text-amber-400 mb-1 text-[10px]">
                  کربوهیدرات (g):
                </label>
                <input
                  type="number"
                  value={tempTargetCarbs}
                  onChange={(e) => setTempTargetCarbs(e.target.value)}
                  placeholder="240"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500/50 text-xs ss02"
                />
              </div>
              <div>
                <label className="block text-yellow-400 mb-1 text-[10px]">
                  چربی (g):
                </label>
                <input
                  type="number"
                  value={tempTargetFat}
                  onChange={(e) => setTempTargetFat(e.target.value)}
                  placeholder="70"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500/50 text-xs ss02"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:opacity-95 text-neutral-950 font-bold py-2.5 rounded-xl shadow-lg transition-all cursor-pointer text-xs"
          >
            ثبت اهداف
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white py-2.5 rounded-xl transition-all cursor-pointer text-xs"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(EditTargetModal);
