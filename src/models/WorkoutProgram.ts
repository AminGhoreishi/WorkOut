import mongoose, { Schema } from "mongoose";
import type { IWorkoutProgram } from "@/types/workout";

const WorkoutProgramSchema = new Schema<IWorkoutProgram>(
  {
    planId: { type: Schema.Types.ObjectId, ref: "WorkoutPlan", required: true },
    programs: [
      {
        day: { type: String, required: true },
        muscleGroup: { type: String, default: "" },
        exercises: [
          {
            name: { type: String, required: true },
            videoId: { type: Schema.Types.ObjectId, ref: "Video", default: null },
            videoId2: { type: Schema.Types.ObjectId, ref: "Video", default: null },
            sets: { type: Number, default: 3 },
            reps: { type: String, default: "" },
            weight: { type: Number, default: 0 },
            restSec: { type: Number, default: 60 },
            isComplete : {type: Boolean, default: false}
          },
        ],
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.WorkoutProgram ||
  mongoose.model<IWorkoutProgram>("WorkoutProgram", WorkoutProgramSchema);
