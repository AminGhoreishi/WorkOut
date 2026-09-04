import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user.role !== "admin" && session.user.role !== "coach")) {
      return NextResponse.json(
        { message: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "شناسه کاربر معتبر نمی‌باشد" },
        { status: 400 }
      );
    }

    const user = await User.findById(id)
      .select("fullName username phone email")
      .lean();

    if (!user) {
      return NextResponse.json(
        { message: "کاربر پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "خطا در دریافت اطلاعات کاربر";
    return NextResponse.json(
      { message: errMessage },
      { status: 500 }
    );
  }
}
