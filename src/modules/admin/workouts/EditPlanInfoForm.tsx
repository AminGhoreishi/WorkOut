"use client";

import { useState } from "react";
import type { EditPlanInfoFormProps } from "@/types/workout";
import { showAlert } from "@/utils/alert";

export default function EditPlanInfoForm({
  workoutPlan,
  onSuccess,
  onCancel,
}: EditPlanInfoFormProps) {
  const [planForm, setPlanForm] = useState({
    title: workoutPlan.title,
    description: workoutPlan.description || "",
  });

  const handleUpdatePlan = async () => {
    try {
      const res = await fetch("/api/admin/subscription/workout-month", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: workoutPlan._id,
          title: planForm.title,
          description: planForm.description,
        }),
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        onSuccess(data.plan);
        showAlert({
          title: "موفقیت",
          text: "برنامه تمرینی با موفقیت بروزرسانی شد",
          icon: "success",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        showAlert({
          title: "خطا",
          text: err.message || "خطا در بروزرسانی برنامه",
          icon: "error",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در بروزرسانی برنامه تمرینی",
        icon: "error",
      });
    }
  };

  return (
    <div className="space-y-4 font-danaMed" dir="rtl">
      <div>
        <label className="block text-white/70 text-xs mb-2">
          عنوان برنامه
        </label>
        <input
          type="text"
          value={planForm.title}
          onChange={(e) =>
            setPlanForm({
              ...planForm,
              title: e.target.value,
            })
          }
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
          required
        />
      </div>
      <div>
        <label className="block text-white/70 text-xs mb-2">
          توضیحات
        </label>
        <textarea
          value={planForm.description}
          onChange={(e) =>
            setPlanForm({
              ...planForm,
              description: e.target.value,
            })
          }
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 resize-none h-24"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={handleUpdatePlan}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-xs transition-colors cursor-pointer"
        >
          ذخیره تغییرات
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-white/10 hover:bg-white/15 text-white px-5 py-2 rounded-lg text-xs transition-colors cursor-pointer"
        >
          انصراف
        </button>
      </div>
    </div>
  );
}
