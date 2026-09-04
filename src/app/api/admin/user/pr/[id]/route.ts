import dbConnect from "@/lib/dbConnect";
import Pr from "@/models/Pr";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(
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
        { message: "شناسه رکورد معتبر نمی‌باشد" },
        { status: 400 }
      );
    }

    const deletedPr = await Pr.findByIdAndDelete(id);
    if (!deletedPr) {
      return NextResponse.json(
        { message: "رکورد شخصی مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "رکورد با موفقیت حذف شد",
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "خطا در حذف رکورد شخصی";
    return NextResponse.json(
      { message: errMessage },
      { status: 500 }
    );
  }
}
