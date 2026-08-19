import mongoose, { Schema } from "mongoose";
import { IWorkoutPlan } from "@/types/workout";

const WorkoutPlanSchema = new Schema<IWorkoutPlan>(
  {
    packageId: { type: Schema.Types.ObjectId, ref: "Package", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    subscriptionId: { type: Schema.Types.ObjectId, ref: "Subscription", default: null },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.models.WorkoutPlan ||
  mongoose.model<IWorkoutPlan>("WorkoutPlan", WorkoutPlanSchema);