import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import Subscription from "@/model/Subscription";
import WorkoutPlan from "@/model/WorkoutPlan";
import Food from "@/model/Food";
import Blog from "@/model/Blog";
import Comment from "@/model/Comment";
import Coach from "@/model/Coach";
import Order from "@/model/Order";
import type {
  AiToolsStatsData,
  AiToolsStatsResponse,
  AiToolsStatsErrorResponse,
} from "@/types/ai-tools";

export const dynamic = "force-dynamic";

export async function GET(): Promise<
  NextResponse<AiToolsStatsResponse | AiToolsStatsErrorResponse>
> {
  try {
    await dbConnect();

    const [
      totalUsers,
      activeUsers,
      totalSubscriptions,
      activeSubscriptions,
      totalWorkoutPlans,
      totalFoods,
      totalBlogs,
      totalComments,
      totalCoaches,
      totalOrders,
    ] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ status: "active" }),
      Subscription.countDocuments({}),
      Subscription.countDocuments({ status: "active" }),
      WorkoutPlan.countDocuments({}),
      Food.countDocuments({}),
      Blog.countDocuments({}),
      Comment.countDocuments({}),
      Coach.countDocuments({}),
      Order.countDocuments({}),
    ]);

    const data: AiToolsStatsData = {
      totalUsers,
      activeUsers,
      totalSubscriptions,
      activeSubscriptions,
      totalWorkoutPlans,
      totalFoods,
      totalBlogs,
      totalComments,
      totalCoaches,
      totalOrders,
    };

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch stats",
      },
      { status: 500 },
    );
  }
}
