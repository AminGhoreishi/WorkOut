import mongoose, { Schema } from "mongoose";
import { IWorkoutmonth } from "@/types/workout";

const WorkoutmonthSchema = new Schema<IWorkoutmonth>(
  {
    packageId: { type: Schema.Types.ObjectId, ref: "Package", required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

export default mongoose.models.Workoutmonth ||
  mongoose.model<IWorkoutmonth>("Workoutmonth", WorkoutmonthSchema);
