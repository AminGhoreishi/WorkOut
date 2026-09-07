import dbConnect from "@/lib/dbConnect";
import MealPlan from "@/models/MealPlan";
import Subscription from "@/models/Subscription";
import "@/models/Food";
import "@/models/Package";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "لطفاً ابتدا وارد حساب کاربری خود شوید." },
        { status: 401 }
      );
    }

    let plan = await MealPlan.findOne({
      userId: session.user.id,
      isActive: true,
    })
      .populate("packageId")
      .populate("breakfast.foodId")
      .populate("lunch.foodId")
      .populate("dinner.foodId")
      .populate("snack.foodId")
      .sort({ createdAt: -1 })
      .lean();

    if (!plan) {
      const activeSub = await Subscription.findOne({
        userId: session.user.id,
        status: { $in: ["active", "trial"] },
        endsAt: { $gt: new Date() },
      }).lean();

      if (activeSub?.packageId) {
        plan = await MealPlan.findOne({
          packageId: activeSub.packageId,
          isActive: true,
        })
          .populate("packageId")
          .populate("breakfast.foodId")
          .populate("lunch.foodId")
          .populate("dinner.foodId")
          .populate("snack.foodId")
          .sort({ createdAt: -1 })
          .lean();
      }
    }

    const hasActiveSubscription = Boolean(
      await Subscription.exists({
        userId: session.user.id,
        status: { $in: ["active", "trial"] },
        endsAt: { $gt: new Date() },
      })
    );

    if (!plan) {
      return NextResponse.json({
        success: true,
        plan: null,
        hasSubscription: hasActiveSubscription,
        message: hasActiveSubscription
          ? "مربی در حال ایجاد برنامه غذایی شما است."
          : "برای دریافت برنامه غذایی، ابتدا یک پکیج فعال تهیه کنید.",
      });
    }

    return NextResponse.json({ success: true, plan, hasSubscription: true });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "خطا در دریافت اطلاعات برنامه غذایی";
    return NextResponse.json(
      { success: false, message: errMessage },
      { status: 500 }
    );
  }
}
