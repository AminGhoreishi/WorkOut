import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Discount from "@/models/Discount";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query: Record<string, any> = {};
    if (status === "active") {
      query.isActive = true;
    } else if (status === "inactive") {
      query.isActive = false;
    }

    const discounts = await Discount.find(query)
      .populate("packages", "name slug")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(discounts);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const body = await req.json();
    const {
      code,
      percent,
      packages,
      maxUsage,
      startsAt,
      expiresAt,
      isActive,
    } = body;

    const formattedCode =
      code && typeof code === "string" && code.trim()
        ? code.trim().toUpperCase()
        : null;

    if (formattedCode) {
      const existingDiscount = await Discount.findOne({ code: formattedCode });
      if (existingDiscount) {
        return NextResponse.json(
          { message: "این کد تخفیف قبلاً ثبت شده است" },
          { status: 400 },
        );
      }
    }

    const newDiscount = await Discount.create({
      code: formattedCode,
      percent: Number(percent) || 0,
      packages: Array.isArray(packages) ? packages : [],
      maxUsage:
        maxUsage !== undefined && maxUsage !== "" && maxUsage !== null
          ? Number(maxUsage)
          : null,
      startsAt: startsAt ? new Date(startsAt) : new Date(),
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      isActive: isActive ?? true,
    });

    const populatedDiscount = await Discount.findById(newDiscount._id)
      .populate("packages", "name slug")
      .lean();

    return NextResponse.json(
      {
        success: true,
        message: formattedCode
          ? "کد تخفیف با موفقیت ایجاد شد"
          : "تخفیف مستقیم پکیج با موفقیت ایجاد شد",
        discount: populatedDiscount,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const body = await req.json();
    const {
      id,
      code,
      percent,
      packages,
      maxUsage,
      startsAt,
      expiresAt,
      isActive,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: "شناسه تخفیف الزامی است" },
        { status: 400 },
      );
    }

    const discount = await Discount.findById(id);
    if (!discount) {
      return NextResponse.json(
        { message: "تخفیف مورد نظر پیدا نشد" },
        { status: 404 },
      );
    }

    if (code !== undefined) {
      const formattedCode =
        code && typeof code === "string" && code.trim()
          ? code.trim().toUpperCase()
          : null;

      if (formattedCode) {
        const existingWithSameCode = await Discount.findOne({
          code: formattedCode,
          _id: { $ne: id },
        });
        if (existingWithSameCode) {
          return NextResponse.json(
            { message: "کد تخفیف دیگری با این عنوان وجود دارد" },
            { status: 400 },
          );
        }
      }
      discount.code = formattedCode;
    }

    if (percent !== undefined) discount.percent = Number(percent) || 0;
    if (packages !== undefined)
      discount.packages = Array.isArray(packages) ? packages : [];
    if (maxUsage !== undefined) {
      discount.maxUsage =
        maxUsage !== "" && maxUsage !== null ? Number(maxUsage) : null;
    }
    if (startsAt !== undefined)
      discount.startsAt = startsAt ? new Date(startsAt) : new Date();
    if (expiresAt !== undefined)
      discount.expiresAt = expiresAt ? new Date(expiresAt) : null;
    if (isActive !== undefined) discount.isActive = Boolean(isActive);

    await discount.save();

    const updatedDiscount = await Discount.findById(id)
      .populate("packages", "name slug")
      .lean();

    return NextResponse.json({
      success: true,
      message: "کد تخفیف با موفقیت بروزرسانی شد",
      discount: updatedDiscount,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
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
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "شناسه کد تخفیف الزامی است" },
        { status: 400 },
      );
    }

    const discount = await Discount.findByIdAndDelete(id);
    if (!discount) {
      return NextResponse.json(
        { message: "کد تخفیف مورد نظر یافت نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "کد تخفیف با موفقیت حذف شد",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
