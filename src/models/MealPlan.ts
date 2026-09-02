import mongoose, { Schema } from "mongoose";
import { IMealPlan } from "@/types/nutrition";

const MealPlanItemSchema = new Schema(
  {
    foodId: { type: Schema.Types.ObjectId, ref: "Food", required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true, default: "گرم" },
  },
  { _id: false }
);

const MealPlanSchema = new Schema<IMealPlan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    packageId: { type: Schema.Types.ObjectId, ref: "Package", required: false },
    title: {
      type: String,
      required: [true, "عنوان برنامه الزامی است."],
      minlength: [2, "عنوان برنامه باید حداقل ۲ کاراکتر باشد."],
      trim: true,
    },
    description: { type: String, default: "" },
    breakfast: { type: [MealPlanItemSchema], default: [] },
    lunch: { type: [MealPlanItemSchema], default: [] },
    dinner: { type: [MealPlanItemSchema], default: [] },
    snack: { type: [MealPlanItemSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.MealPlan ||
  mongoose.model<IMealPlan>("MealPlan", MealPlanSchema);
