import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/Testimonial";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json(
        { success: false, message: "دسترسی غیرمجاز" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();
    const status = searchParams.get("status");

    const query: Record<string, any> = {};

    if (status === "visible") {
      query.isVisible = true;
    } else if (status === "hidden") {
      query.isVisible = false;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { comment: { $regex: search, $options: "i" } },
        { badge: { $regex: search, $options: "i" } },
        { achievement: { $regex: search, $options: "i" } },
      ];
    }

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "8", 10));
    const skip = (page - 1) * limit;

    const [testimonials, total] = await Promise.all([
      Testimonial.find(query)
        .populate("userId", "fullName username email avatar role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Testimonial.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        success: true,
        testimonials,
        total,
        page,
        totalPages,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, message: err.message || "خطایی رخ داد" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json(
        { success: false, message: "دسترسی غیرمجاز" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "شناسه نظر الزامی است" },
        { status: 400 }
      );
    }

    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "نظر مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "نظر با موفقیت حذف شد",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, message: err.message || "خطا در حذف نظر" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json(
        { success: false, message: "دسترسی غیرمجاز" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { id, isVisible } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "شناسه نظر الزامی است" },
        { status: 400 }
      );
    }

    const updated = await Testimonial.findByIdAndUpdate(
      id,
      { isVisible: Boolean(isVisible) },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "نظر مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "وضعیت نمایش نظر بروزرسانی شد",
        testimonial: updated,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, message: err.message || "خطا در بروزرسانی وضعیت نظر" },
      { status: 500 }
    );
  }
}
