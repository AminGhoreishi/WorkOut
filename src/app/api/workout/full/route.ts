import dbConnect from "@/lib/dbConnect";
import WorkoutPlan from "@/models/WorkoutPlan";
import WorkoutProgram from "@/models/WorkoutProgram";
import Subscription from "@/models/Subscription";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import "@/models/Video";

import type { IProgramDay } from "@/types/workout";

export async function GET(_req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "لاگین نیستی" }, { status: 401 });

    const subscription = await Subscription.findOne({
      userId: session.user.id,
      status: { $in: ["active", "trial"] },
      endsAt: { $gt: new Date() },
    });

    if (!subscription)
      return NextResponse.json(
        { message: "اشتراک فعال نداری" },
        { status: 403 },
      );

    let plan = await WorkoutPlan.findOne({
      packageId: subscription.packageId,
      userId: session.user.id,
      isActive: true,
    });

    if (!plan) {
      plan = await WorkoutPlan.findOne({
        packageId: subscription.packageId,
        userId: null,
        isActive: true,
      });
    }

    if (!plan)
      return NextResponse.json(
        { message: "برنامه تمرینی پیدا نشد" },
        { status: 404 },
      );

    const programDoc = await WorkoutProgram.findOne({ planId: plan._id })
      .populate({
        path: "programs.exercises.videoId",
        select: "url thumbnailUrl title",
      })
      .populate({
        path: "programs.exercises.videoId2",
        select: "url thumbnailUrl title",
      })
      .lean();

    const daysWithExercises = (programDoc?.programs || []).map((p: IProgramDay, idx: number) => ({
      _id: p._id ? String(p._id) : `day-${idx}`,
      dayName: p.day,
      muscleGroup: p.muscleGroup,
      sortOrder: idx + 1,
      exercises: p.exercises || [],
    }));

    return NextResponse.json({
      plan: {
        _id: plan._id,
        title: plan.title,
        description: plan.description,
        weeklyAdvice: plan.weeklyAdvice,
      },
      days: daysWithExercises,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "خطا در سرور";
    return NextResponse.json({ message }, { status: 500 });
  }
}
