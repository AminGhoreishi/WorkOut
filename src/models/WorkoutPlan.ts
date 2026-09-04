import mongoose, { Schema } from "mongoose";
import { IWorkoutPlan } from "@/types/workout";

const WeeklyAdviceSchema = new Schema(
  {
    title: { type: String, default: "توصیه عمومی هفته" },
    description: { type: String, default: "" },
    tips: { type: [String], default: [] },
  },
  { _id: false }
);

const WorkoutPlanSchema = new Schema<IWorkoutPlan>(
  {
    packageId: { type: Schema.Types.ObjectId, ref: "Package", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    subscriptionId: { type: Schema.Types.ObjectId, ref: "Subscription", default: null },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    weeklyAdvice: { type: WeeklyAdviceSchema, default: () => ({}) },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

WorkoutPlanSchema.virtual("programm", {
  ref: "WorkoutProgram",
  localField: "_id",
  foreignField: "planId",
  justOne: true,
});

export default mongoose.models.WorkoutPlan ||
  mongoose.model<IWorkoutPlan>("WorkoutPlan", WorkoutPlanSchema);