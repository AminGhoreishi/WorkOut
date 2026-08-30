import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Subscription from "@/models/Subscription";
import Blog from "@/models/Blog";
import Comment from "@/models/Comment";
import Video from "@/models/Video";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const [
      usersCount,
      subscriptionsCount,
      articlesCount,
      activeCommentsCount,
      pendingCommentsCount,
      commentsCount,
      videosCount,
      ticketsCount,
      adminsCount,
    ] = await Promise.all([
      User.countDocuments({}),
      Subscription.countDocuments({}),
      Blog.countDocuments({}),
      Comment.countDocuments({ isApproved: true }),
      Comment.countDocuments({ isApproved: false }),
      Comment.countDocuments({ isApproved: true }),
      Video.countDocuments({}),
      Ticket.countDocuments({ status: "pending" }),
      User.countDocuments({ role: "admin" }),
    ]);

    return NextResponse.json({
      usersCount,
      subscriptionsCount,
      articlesCount,
      activeCommentsCount,
      pendingCommentsCount,
      commentsCount,
      videosCount,
      ticketsCount,
      adminsCount,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

