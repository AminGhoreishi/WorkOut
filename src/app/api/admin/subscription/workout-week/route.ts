import dbConnect from "@/lib/dbConnect";
import Workoutweek from "@/models/Workoutweek";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { packageId, planId, userId } = await req.json();
    const week = await Workoutweek.create({
      packageId,
      planId: planId || null,
      userId: userId || null,
    });
    return NextResponse.json({ week }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "خطا در سرور";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const packageId = searchParams.get("packageId");
    const planId = searchParams.get("planId");
    const userId = searchParams.get("userId");

    const query: Record<string, unknown> = {};
    if (planId) {
      query.planId = planId;
    } else if (userId && packageId) {
      query.packageId = packageId;
      query.userId = userId;
    } else if (packageId) {
      query.packageId = packageId;
    }

    const weeks = await Workoutweek.find(query);
    return NextResponse.json({ weeks });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "خطا در سرور";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "شناسه الزامی است" }, { status: 400 });
    }
    const week = await Workoutweek.findByIdAndDelete(id);
    if (!week) {
      return NextResponse.json({ message: "یافت نشد" }, { status: 404 });
    }
    return NextResponse.json({ message: "با موفقیت حذف شد" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "خطا در سرور";
    return NextResponse.json({ message }, { status: 500 });
  }
}
