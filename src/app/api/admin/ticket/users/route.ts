import dbConnect from "@/lib/dbConnect";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session?.user?.id ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json(
        { message: "دسترسی غیرمجاز" },
        { status: 403 }
      );
    }

    await User.findOne({});

    const subscriptions = await Subscription.find({})
      .select("userId")
      .populate("userId", "username fullName")
      .lean();

    const userMap = new Map<string, { _id: string; username: string; fullName?: string }>();

    for (const sub of subscriptions) {
      if (sub.userId && typeof sub.userId === "object" && "_id" in sub.userId) {
        const userObj = sub.userId as { _id: { toString: () => string }; username?: string; fullName?: string };
        const idStr = userObj._id.toString();
        if (!userMap.has(idStr)) {
          userMap.set(idStr, {
            _id: idStr,
            username: userObj.username || "",
            fullName: userObj.fullName || userObj.username || "",
          });
        }
      }
    }

    const users = Array.from(userMap.values()).sort((a, b) =>
      (a.fullName || a.username).localeCompare(b.fullName || b.username, "fa")
    );

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "خطا در دریافت لیست کاربران";
    return NextResponse.json({ message: errMessage }, { status: 500 });
  }
}
