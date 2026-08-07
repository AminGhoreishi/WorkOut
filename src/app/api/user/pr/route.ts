import dbConnect from "@/lib/dbConnect";
import Pr from "@/model/Pr";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "شما وارد سیستم نشده‌اید." },
        { status: 401 }
      );
    }

    const records = await Pr.find({ userId: session.user.id })
      .sort({ date: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({ success: true, records });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error
        ? error.message
        : "خطا در دریافت اطلاعات رکوردهای شخصی";
    return NextResponse.json({ message: errMessage }, { status: 500 });
  }
}
