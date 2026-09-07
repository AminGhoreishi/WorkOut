import dbConnect from "@/lib/dbConnect";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

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

    const searchParams = req.nextUrl.searchParams;
    const query = (searchParams.get("query") || searchParams.get("q") || "").trim();

    if (!query) {
      return NextResponse.json({ users: [] }, { status: 200 });
    }

    let subscribedUserIds = await Subscription.distinct("userId", {
      status: { $in: ["active", "trial"] },
    });

    if (!subscribedUserIds.length) {
      subscribedUserIds = await Subscription.distinct("userId");
    }

    if (!subscribedUserIds.length) {
      return NextResponse.json({ users: [] }, { status: 200 });
    }

    const filter: Record<string, unknown> = {
      _id: { $in: subscribedUserIds },
    };

    if (query) {
      const sanitized = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(sanitized, "i");
      filter.$or = [
        { fullName: regex },
        { username: regex },
        { phone: regex },
      ];
    }

    const users = await User.find(filter)
      .select("_id fullName username")
      .limit(15)
      .lean();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "خطا در دریافت کاربران";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
