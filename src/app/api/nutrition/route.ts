import dbConnect from "@/lib/dbConnect";
import NutritionLog from "@/models/NutritionLog";
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
      updateFields,
      { upsert: true, new: true, runValidators: true }
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

    const log = await NutritionLog.findOne({ userId, date }, "-__v -updatedAt");
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
