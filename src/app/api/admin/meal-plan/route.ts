import dbConnect from "@/lib/dbConnect";
import MealPlan from "@/model/MealPlan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { validateMealPlan } from "@/validator/meal-plan";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user.role !== "admin" && session.user.role !== "coach")) {
      return NextResponse.json(
        { error: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const plans = await MealPlan.find({})
      .populate("userId", "username fullName email avatar")
      .populate("packageId")
      .populate("breakfast.foodId")
      .populate("lunch.foodId")
      .populate("dinner.foodId")
      .populate("snack.foodId")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ plans }, { status: 200 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to fetch meal plans";
    return NextResponse.json(
      { error: errMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user.role !== "admin" && session.user.role !== "coach")) {
      return NextResponse.json(
        { error: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const body = await req.json();

    const validationResult = validateMealPlan(body);
    if (validationResult !== true) {
      const detailMsgs = Array.isArray(validationResult)
        ? validationResult.map((e: any) => e.message).join(" | ")
        : "";
      return NextResponse.json(
        { error: detailMsgs ? `داده‌های ارسالی معتبر نیستند: ${detailMsgs}` : "داده‌های ارسالی معتبر نیستند.", details: validationResult },
        { status: 400 }
      );
    }

    const { userId, packageId, title, description, breakfast, lunch, dinner, snack, isActive } = body;

    const newPlan = await MealPlan.create({
      userId: userId || null,
      packageId: packageId || null,
      title,
      description: description || "",
      breakfast: breakfast || [],
      lunch: lunch || [],
      dinner: dinner || [],
      snack: snack || [],
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json({ success: true, plan: newPlan }, { status: 201 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to create meal plan";
    return NextResponse.json(
      { error: errMessage },
      { status: 500 }
    );
  }
}
