import dbConnect from "@/lib/dbConnect";
import WorkoutPlan from "@/models/WorkoutPlan";
import "@/models/WorkoutProgram";
import "@/models/Video";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { packageId, userId, subscriptionId, title, description } = await req.json();

    const plan = await WorkoutPlan.create({
      packageId,
      userId: userId || null,
      subscriptionId: subscriptionId || null,
      title: title || "برنامه تمرینی اختصاصی",
      description: description || "",
    });
    return NextResponse.json({ plan }, { status: 201 });
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
    const userId = searchParams.get("userId");

    const query: Record<string, unknown> = { isActive: true };
    if (packageId) query.packageId = packageId;
    if (userId) query.userId = userId;

    const plans = await WorkoutPlan.find(query).populate({
      path: "programm",
      populate: [
        { path: "programs.exercises.videoId" },
        { path: "programs.exercises.videoId2" },
      ],
    });
    return NextResponse.json({ plans });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "خطا در سرور";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, title, description, isActive } = body;

    if (!id) {
      return NextResponse.json({ message: "شناسه برنامه الزامی است" }, { status: 400 });
    }

    const updatedData: Record<string, unknown> = {};
    if (title !== undefined) updatedData.title = title;
    if (description !== undefined) updatedData.description = description;
    if (isActive !== undefined) updatedData.isActive = isActive;

    const plan = await WorkoutPlan.findByIdAndUpdate(id, updatedData, { new: true });

    if (!plan) {
      return NextResponse.json({ message: "برنامه پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ plan });
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
      return NextResponse.json({ message: "شناسه برنامه الزامی است" }, { status: 400 });
    }

    const plan = await WorkoutPlan.findByIdAndDelete(id);

    if (!plan) {
      return NextResponse.json({ message: "برنامه پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "برنامه با موفقیت حذف شد" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "خطا در سرور";
    return NextResponse.json({ message }, { status: 500 });
  }
}

