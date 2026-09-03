import dbConnect from "@/lib/dbConnect";
import MealPlan from "@/models/MealPlan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { validateMealPlan } from "@/validators/meal-plan";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user.role !== "admin" && session.user.role !== "coach")) {
      return NextResponse.json(
        { error: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.max(1, Number(searchParams.get("limit") || 10));
    const skip = (page - 1) * limit;

    const total = await MealPlan.countDocuments({});
    const totalPages = Math.ceil(total / limit) || 1;

    const plans = await MealPlan.find({})
      .populate("userId", "username fullName email avatar")
      .populate("packageId")
      .populate("breakfast.foodId")
      .populate("lunch.foodId")
      .populate("dinner.foodId")
      .populate("snack.foodId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ plans, total, totalPages, page }, { status: 200 });
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
        ? Array.from(new Set(validationResult.map((e: any) => e.message).filter(Boolean))).join(" | ")
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
