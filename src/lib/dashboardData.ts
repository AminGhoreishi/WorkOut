import WorkoutPlanModel from "@/models/WorkoutPlan";
import WorkoutProgramModel from "@/models/WorkoutProgram";
import WorkoutDayModel from "@/models/WorkoutDay";
import WorkoutExerciseModel from "@/models/WorkoutExercise";
import type {
  DashboardUser,
  DashboardSubscription,
  DashboardWorkoutDay,
  DashboardTicket,
  DashboardWishlistItem,
  RawDbUser,
  RawDbSubscription,
  RawDbTicket,
  RawDbWishlist,
} from "@/types/user-dashboard";

export interface DashboardDataResult {
  userProps: DashboardUser;
  subscriptionProps: DashboardSubscription | null;
  workoutDaysProps: DashboardWorkoutDay[];
  ticketsProps: DashboardTicket[];
  wishlistProps: DashboardWishlistItem[];
}

export async function processDashboardData(
  dbUser: RawDbUser,
  activeSubscriptionDoc: RawDbSubscription | null,
  dbTickets: RawDbTicket[],
  dbWishlist: RawDbWishlist[]
): Promise<DashboardDataResult> {
  const activeSubscription = activeSubscriptionDoc;

  let subscriptionProps: DashboardSubscription | null = null;
  let workoutDaysProps: DashboardWorkoutDay[] = [];

  if (activeSubscription) {
    const startsAt = new Date(activeSubscription.startsAt || Date.now());
    const endsAt = new Date(activeSubscription.endsAt || Date.now());
    const now = new Date();
    const totalTime = endsAt.getTime() - startsAt.getTime();
    const remainingTime = endsAt.getTime() - now.getTime();
    const daysRemaining = Math.max(
      0,
      Math.ceil(remainingTime / (1000 * 60 * 60 * 24))
    );
    const totalDays = Math.max(
      1,
      Math.ceil(totalTime / (1000 * 60 * 60 * 24))
    );

    const endDateString = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(endsAt);

    const priceNum = activeSubscription.packageId?.price || 0;
    const formattedPrice = new Intl.NumberFormat("fa-IR").format(priceNum);

    subscriptionProps = {
      packageName: activeSubscription.packageId?.name || "پکیج اختصاصی",
      status: activeSubscription.status || "active",
      daysRemaining,
      totalDays,
      endDate: endDateString,
      nextPayment: formattedPrice,
    };
  }

  const weekOrder: Record<string, number> = {
    "شنبه": 0,
    "یکشنبه": 1,
    "یک‌شنبه": 1,
    "دوشنبه": 2,
    "دو‌شنبه": 2,
    "سه‌شنبه": 3,
    "سه شنبه": 3,
    "چهارشنبه": 4,
    "چهار‌شنبه": 4,
    "پنج‌شنبه": 5,
    "پنج شنبه": 5,
    "جمعه": 6,
  };

  let workoutPlan = null;
  if (activeSubscription?.packageId?._id) {
    workoutPlan = await WorkoutPlanModel.findOne({
      packageId: activeSubscription.packageId._id,
      userId: dbUser._id,
      isActive: true,
    }).lean();

    if (!workoutPlan) {
      workoutPlan = await WorkoutPlanModel.findOne({
        packageId: activeSubscription.packageId._id,
        isActive: true,
      }).lean();
    }
  }

  if (!workoutPlan && dbUser?._id) {
    workoutPlan = await WorkoutPlanModel.findOne({
      userId: dbUser._id,
      isActive: true,
    }).lean();
  }

  if (workoutPlan) {
    const workoutProgram = await WorkoutProgramModel.findOne({
      planId: workoutPlan._id,
    }).lean();

    if (
      workoutProgram &&
      Array.isArray(workoutProgram.programs) &&
      workoutProgram.programs.length > 0
    ) {
      const sortedPrograms = [...workoutProgram.programs].sort((a, b) => {
        const orderA = weekOrder[a.day?.trim() || ""] ?? 99;
        const orderB = weekOrder[b.day?.trim() || ""] ?? 99;
        return orderA - orderB;
      });

      workoutDaysProps = sortedPrograms.map((p) => {
        const exercises = p.exercises || [];
        const totalSets = exercises.reduce(
          (sum: number, ex: { sets?: number }) => sum + (ex.sets || 0),
          0
        );
        const isComplete =
          exercises.length > 0 &&
          exercises.every((ex: { isComplete?: boolean }) => !!ex.isComplete);
        return {
          day: p.day || "",
          type: p.muscleGroup || "تمرین عمومی",
          duration: `${Math.max(exercises.length * 10, 20)} دقیقه`,
          done: isComplete,
          sets: totalSets,
        };
      });
    } else {
      const days = await WorkoutDayModel.find({ planId: workoutPlan._id })
        .sort({ sortOrder: 1 })
        .lean();

      if (days.length > 0) {
        const dayIds = days.map((d) => d._id);
        const exercises = await WorkoutExerciseModel.find({
          dayId: { $in: dayIds },
        })
          .sort({ sortOrder: 1 })
          .lean();

        workoutDaysProps = days.map((day) => {
          const dayExercises = exercises.filter(
            (e) => e.dayId.toString() === day._id.toString()
          );
          const totalSets = dayExercises.reduce(
            (sum: number, ex: { sets?: number }) => sum + (ex.sets || 0),
            0
          );
          return {
            day: day.dayName || "",
            type: day.muscleGroup || "تمرین عمومی",
            duration: `${Math.max(dayExercises.length * 10, 20)} دقیقه`,
            done: false,
            sets: totalSets,
          };
        });
      }
    }
  }

  const ticketsProps: DashboardTicket[] = (dbTickets || []).map((t) => {
    let persianStatus = "در حال بررسی";
    if (t.status === "answered") persianStatus = "پاسخ داده شده";
    if (t.status === "closed") persianStatus = "بسته شده";

    const formattedTime = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(t.updatedAt || t.createdAt || Date.now()));

    return {
      id: t._id.toString(),
      subject: t.subject || "بدون عنوان",
      status: persianStatus,
      rawStatus: t.status || "pending",
      time: formattedTime,
    };
  });

  const joinDateString = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
  }).format(new Date(dbUser.createdAt || Date.now()));

  const userName = dbUser.fullName || dbUser.username || "کاربر ورزشکار";
  const userProps: DashboardUser = {
    name: userName,
    avatar: userName.substring(0, 1).toUpperCase(),
    email: dbUser.email || "",
    level: dbUser.role === "admin" ? "مدیر سیستم" : "کاربر ورزشکار",
    joinDate: joinDateString,
    coachName: activeSubscription?.coachId?.fullName || "بدون مربی اختصاصی",
  };

  const wishlistProps: DashboardWishlistItem[] = (dbWishlist || [])
    .map((w) => {
      const b = w.blogId;
      if (!b) return null;
      return {
        id: b._id?.toString() || "",
        title: b.title || "",
        slug: b.slug || "",
        image: b.image || "",
        category: b.category || "",
        views: b.views || 0,
      };
    })
    .filter((item): item is DashboardWishlistItem => item !== null);

  return {
    userProps,
    subscriptionProps,
    workoutDaysProps,
    ticketsProps,
    wishlistProps,
  };
}
