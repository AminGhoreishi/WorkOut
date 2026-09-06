import mongoose, { Schema } from "mongoose";
import type { IExerciseProgressDocument } from "@/types/progress";

const ExerciseProgressSchema = new Schema<IExerciseProgressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    exerciseId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.models.ExerciseProgress ||
  mongoose.model<IExerciseProgressDocument>(
    "ExerciseProgress",
    ExerciseProgressSchema,
  );
