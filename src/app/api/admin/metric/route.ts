import dbConnect from "@/lib/dbConnect";
import TestMetric from "@/models/TestMetric";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user.role !== "admin" && session.user.role !== "coach")) {
      return NextResponse.json(
        { message: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const metrics = await TestMetric.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ metrics });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "خطا در دریافت لیست متس‌ها";
    return NextResponse.json(
      { message: errMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user.role !== "admin" && session.user.role !== "coach")) {
      return NextResponse.json(
        { message: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, category, unit, description } = body;

    if (!name || !category || !unit) {
      return NextResponse.json(
        { message: "نام متس، دسته‌بندی و واحد اندازه‌گیری الزامی هستند" },
        { status: 400 }
      );
    }

    const newMetric = await TestMetric.create({
      coachId: session.user.id,
      name,
      category,
      unit,
      description: description || "",
    });

    return NextResponse.json({ success: true, metric: newMetric }, { status: 201 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "خطا در ایجاد متس جدید";
    return NextResponse.json(
      { message: errMessage },
      { status: 500 }
    );
  }
}
