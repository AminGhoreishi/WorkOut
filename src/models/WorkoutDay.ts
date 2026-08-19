import mongoose, { Schema } from "mongoose";
import { IWorkoutDay } from "@/types/workout";

const WorkoutDaySchema = new Schema<IWorkoutDay>(
  {
    planId: { type: Schema.Types.ObjectId, ref: "WorkoutPlan", required: true },
    weekId: { type: Schema.Types.ObjectId, ref: "Workoutweek", default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    dayName: { type: String, required: true },
    muscleGroup: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.models.WorkoutDay ||
  mongoose.model<IWorkoutDay>("WorkoutDay", WorkoutDaySchema);