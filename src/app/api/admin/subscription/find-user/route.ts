import dbConnect from "@/lib/dbConnect";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import Package from "@/models/Package";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const search = request.nextUrl.searchParams.get("search") || "";
    if (!search.trim()) {
      return NextResponse.json({ subscriptions: [] }, { status: 200 });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    }).select("_id");

    const userIds = users.map((u) => u._id);

    const subscriptions = await Subscription.find({
      userId: { $in: userIds },
    })
      .populate("userId", "username fullName email phone avatar")
      .populate("packageId", "name slug colorClass price")
      .lean();

    return NextResponse.json({ subscriptions }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "خطا در سرور";
    return NextResponse.json({ message }, { status: 500 });
  }
}