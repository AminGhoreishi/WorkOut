import dbConnect from "@/lib/dbConnect";
import MealPlan from "@/model/MealPlan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { validateMealPlanUpdate } from "@/validator/meal-plan";
import mongoose from "mongoose";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user.role !== "admin" && session.user.role !== "coach")) {
      return NextResponse.json(
        { error: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const resolvedParams = await params;
    const planId = resolvedParams.planId;

    if (!planId || !mongoose.Types.ObjectId.isValid(planId)) {
      return NextResponse.json(
        { error: "شناسه برنامه غذایی معتبر نیست" },
        { status: 400 }
      );
    }

    const data = await req.json();

    const validationResult = validateMealPlanUpdate(data);
    if (validationResult !== true) {
      const detailMsgs = Array.isArray(validationResult)
        ? Array.from(new Set(validationResult.map((e: any) => e.message).filter(Boolean))).join(" | ")
        : "";
      return NextResponse.json(
        { error: detailMsgs ? `داده‌های ارسالی معتبر نیستند: ${detailMsgs}` : "داده‌های ارسالی معتبر نیستند.", details: validationResult },
        { status: 400 }
      );
    }

    const updatedPlan = await MealPlan.findByIdAndUpdate(
      planId,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedPlan) {
      return NextResponse.json({ error: "Meal plan not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, plan: updatedPlan }, { status: 200 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to update meal plan";
    return NextResponse.json(
      { error: errMessage },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user.role !== "admin" && session.user.role !== "coach")) {
      return NextResponse.json(
        { error: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const resolvedParams = await params;
    const planId = resolvedParams.planId;

    if (!planId || !mongoose.Types.ObjectId.isValid(planId)) {
      return NextResponse.json(
        { error: "شناسه برنامه غذایی معتبر نیست" },
        { status: 400 }
      );
    }

    const deletedPlan = await MealPlan.findByIdAndDelete(planId);

    if (!deletedPlan) {
      return NextResponse.json({ error: "Meal plan not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Meal plan deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to delete meal plan";
    return NextResponse.json(
      { error: errMessage },
      { status: 500 }
    );
  }
}
