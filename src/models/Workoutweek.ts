import mongoose, { Schema } from "mongoose";
import { IWorkoutweek } from "@/types/workout";

const WorkoutweekSchema = new Schema<IWorkoutweek>(
  {
    packageId: { type: Schema.Types.ObjectId, ref: "Package", required: true },
    planId: { type: Schema.Types.ObjectId, ref: "WorkoutPlan", default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    title: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

WorkoutweekSchema.pre("save", async function () {
  if (!this.title) {
    const query: Record<string, unknown> = { packageId: this.packageId };
    if (this.planId) query.planId = this.planId;
    else if (this.userId) query.userId = this.userId;
    const count = await (this.constructor as any).countDocuments(query);
    const persianWords = [
      "اول",
      "دوم",
      "سوم",
      "چهارم",
      "پنجم",
      "ششم",
      "هفتم",
      "هشتم",
      "نهم",
      "دهم",
    ];
    const ordinal = persianWords[count] || `${count + 1}`;
    this.title = `هفته ${ordinal}`;
  }
});

WorkoutweekSchema.virtual("workoutdays", {
  ref: "WorkoutDay",
  localField: "_id",
  foreignField: "weekId",
});

WorkoutweekSchema.virtual("workoutexcersice", {
  ref: "WorkoutExercise",
  localField: "_id",
  foreignField: "weekId",
});

export default mongoose.models.Workoutweek ||
  mongoose.model<IWorkoutweek>("Workoutweek", WorkoutweekSchema);
