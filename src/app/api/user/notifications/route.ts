import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Notification from "@/models/Notification";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const notifications = await Notification.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const unreadCount = await Notification.countDocuments({
      userId: session.user.id,
      isRead: false,
    });

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "خطای سرور در دریافت اعلان‌ها" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { notificationId } = body;

    if (notificationId) {
      if (!mongoose.Types.ObjectId.isValid(notificationId)) {
        return NextResponse.json(
          { message: "شناسه اعلان نامعتبر است" },
          { status: 400 }
        );
      }

      await Notification.findOneAndUpdate(
        { _id: notificationId, userId: session.user.id },
        { $set: { isRead: true } }
      );
    } else {
      await Notification.updateMany(
        { userId: session.user.id, isRead: false },
        { $set: { isRead: true } }
      );
    }

    return NextResponse.json({
      success: true,
      message: "وضعیت اعلان به‌روزرسانی شد",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "خطای سرور" },
      { status: 500 }
    );
  }
}
