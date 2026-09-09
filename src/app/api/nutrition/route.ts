import dbConnect from "@/lib/dbConnect";
import NutritionLog from "@/models/NutritionLog";
import FitnessProfile from "@/models/Fitnessprofile";
import { calculateNutritionTargets } from "@/utils/fitnessProfile";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await req.json();
    const {
      date,
      meals,
      waterIntake,
      targetCalories,
      targetProtein,
      targetCarbs,
      targetFat,
    } = body;

    if (!date) {
      return NextResponse.json(
        { message: "ارسال تاریخ الزامی است." },
        { status: 400 }
      );
    }

    const updateFields: Record<string, unknown> = {};
    if (meals !== undefined) updateFields.meals = meals;
    if (waterIntake !== undefined) updateFields.waterIntake = waterIntake;
    if (targetCalories !== undefined) updateFields.targetCalories = targetCalories;
    if (targetProtein !== undefined) updateFields.targetProtein = targetProtein;
    if (targetCarbs !== undefined) updateFields.targetCarbs = targetCarbs;
    if (targetFat !== undefined) updateFields.targetFat = targetFat;

    const log = await NutritionLog.findOneAndUpdate(
      { userId, date },
      { $set: updateFields },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(log, { status: 200 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "خطای سرور در ثبت اطلاعات تغذیه.";
    return NextResponse.json(
      { message: errMessage },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { searchParams } = req.nextUrl;
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { message: "ارسال تاریخ الزامی است." },
        { status: 400 }
      );
    }

    let log = await NutritionLog.findOne({ userId, date }, "-__v -updatedAt").lean();

    if (!log) {
      const latestLog = await NutritionLog.findOne(
        { userId, targetCalories: { $gt: 0 } },
        "targetCalories targetProtein targetCarbs targetFat targetWater"
      )
        .sort({ updatedAt: -1, date: -1 })
        .lean();

      let targetCalories = latestLog?.targetCalories;
      let targetProtein = latestLog?.targetProtein;
      let targetCarbs = latestLog?.targetCarbs;
      let targetFat = latestLog?.targetFat;
      let targetWater = latestLog?.targetWater;

      if (!targetCalories) {
        const profile = await FitnessProfile.findOne({ userId }).lean();
        if (
          profile &&
          profile.weightKg &&
          profile.heightCm &&
          profile.ageYears
        ) {
          const calculated = calculateNutritionTargets(
            Number(profile.weightKg),
            Number(profile.heightCm),
            Number(profile.ageYears),
            profile.sessionsPerWeek || 4,
            profile.goal || "muscle_gain",
            profile.gender || "male"
          );
          targetCalories = calculated.targetCalories;
          targetProtein = calculated.proteinGrams;
          targetCarbs = calculated.carbsGrams;
          targetFat = calculated.fatGrams;
          targetWater = 2500;
        }
      }

      if (targetCalories) {
        log = {
          userId,
          date,
          meals: {
            breakfast: [],
            lunch: [],
            dinner: [],
            snack: [],
          },
          waterIntake: 0,
          targetCalories: targetCalories || 2000,
          targetProtein: targetProtein || 120,
          targetCarbs: targetCarbs || 220,
          targetFat: targetFat || 65,
          targetWater: targetWater || 2500,
        };
      }
    }

    return NextResponse.json(log || null, { status: 200 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "خطای سرور در دریافت اطلاعات تغذیه.";
    return NextResponse.json(
      { message: errMessage },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await req.json();
    const {
      tempTargetCalories,
      tempTargetProtein,
      tempTargetCarbs,
      tempTargetFat,
      tempTargetWater,
      date,
    } = body;

    const targetDate =
      date ||
      new Date().toISOString().split("T")[0];

    const targetFields = {
      targetCalories: Number(tempTargetCalories) || 2000,
      targetProtein: Number(tempTargetProtein) || 120,
      targetCarbs: Number(tempTargetCarbs) || 220,
      targetFat: Number(tempTargetFat) || 65,
      targetWater: Number(tempTargetWater) || 2500,
    };

    await NutritionLog.findOneAndUpdate(
      { userId, date: targetDate },
      { $set: targetFields },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await NutritionLog.updateMany(
      { userId },
      { $set: targetFields }
    );

    return NextResponse.json(
      { message: "اطلاعات تغذیه با موفقیت بروزرسانی شد." },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "خطای سرور در بروزرسانی اطلاعات تغذیه.";
    return NextResponse.json(
      { message: errMessage },
      { status: 500 }
    );
  }
}
