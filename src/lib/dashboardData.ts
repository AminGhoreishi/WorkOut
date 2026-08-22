import WorkoutPlanModel from "@/models/WorkoutPlan";
import WorkoutDayModel from "@/models/WorkoutDay";
import WorkoutExerciseModel from "@/models/WorkoutExercise";
import type {
  DashboardUser,
  DashboardSubscription,
  DashboardWorkoutDay,
  DashboardTicket,
  DashboardWishlistItem,
} from "@/types/user-dashboard";

export interface DashboardDataResult {
  userProps: DashboardUser;
  subscriptionProps: DashboardSubscription | null;
  workoutDaysProps: DashboardWorkoutDay[];
  ticketsProps: DashboardTicket[];
  wishlistProps: DashboardWishlistItem[];
}

export async function processDashboardData(
  dbUser: any,
  activeSubscriptionDoc: any,
  dbTickets: any[],
  dbWishlist: any[]
): Promise<DashboardDataResult> {
  const activeSubscription = activeSubscriptionDoc as any;

  let subscriptionProps: DashboardSubscription | null = null;
  let workoutDaysProps: DashboardWorkoutDay[] = [];

  if (activeSubscription) {
    const startsAt = new Date(activeSubscription.startsAt);
    const endsAt = new Date(activeSubscription.endsAt);
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

    if (activeSubscription.packageId?._id) {
      const workoutPlan = await WorkoutPlanModel.findOne({
        packageId: activeSubscription.packageId._id,
        isActive: true,
      }).lean();

      if (workoutPlan) {
        const days = await WorkoutDayModel.find({ planId: workoutPlan._id })
          .sort({ sortOrder: 1 })
          .lean();

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
            (sum, ex) => sum + (ex.sets || 0),
            0
          );
          return {
            day: day.dayName || "",
            type: day.muscleGroup || "",
            duration: `${dayExercises.length * 10} دقیقه`,
            done: false,
            sets: totalSets,
          };
        });
      }
    }
  }

  const ticketsProps: DashboardTicket[] = (dbTickets || []).map((t: any) => {
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
    .map((w: any) => {
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
