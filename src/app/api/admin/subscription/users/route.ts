import dbConnect from "@/lib/dbConnect";
import Subscription from "@/models/Subscription";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

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

    const subscriptions = await Subscription.find({})
      .select("userId")
      .populate("userId", "username fullName email avatar")
      .lean();

    const userMap = new Map();
    for (const sub of subscriptions) {
      if (sub.userId && typeof sub.userId === "object" && sub.userId._id) {
        const idStr = (sub.userId as { _id: { toString: () => string } })._id.toString();
        if (!userMap.has(idStr)) {
          userMap.set(idStr, sub.userId);
        }
      }
    }

    const users = Array.from(userMap.values());
    return NextResponse.json({ users }, { status: 200 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to fetch subscribed users";
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
