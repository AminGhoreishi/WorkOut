import { AlertCircle } from "lucide-react";
import type { MealPlansErrorProps } from "@/types/meal-plan";

export default function MealPlansError({ message }: MealPlansErrorProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 font-danaMed flex items-center justify-center" dir="rtl">
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl max-w-md text-center">
        <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
        <h3 className="text-base font-bold mb-1">خطا در دریافت برنامه غذایی</h3>
        <p className="text-xs opacity-80">{message || "خطایی در دریافت اطلاعات رخ داد."}</p>
      </div>
    </div>
  );
}
