import Subscription from "@/models/Subscription";
import Package from "@/models/Package";
import Coach from "@/models/Coach";
import Order from "@/models/Order";
import User from "@/models/User";
import WorkoutPlan from "@/models/WorkoutPlan";
import WorkoutProgram from "@/models/WorkoutProgram";
import WorkoutDay from "@/models/WorkoutDay";
import WorkoutExercise from "@/models/WorkoutExercise";
import Video from "@/models/Video";
import Workoutmonth from "@/models/Workoutmonth";
import Ban from "@/models/Ban";

export default function registerModels() {
  return [
    Subscription,
    Package,
    Coach,
    Order,
    User,
    WorkoutPlan,
    WorkoutProgram,
    WorkoutDay,
    WorkoutExercise,
    Video,
    Workoutmonth,
    Ban,
  ];
}
