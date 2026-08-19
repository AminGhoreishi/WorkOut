import dbConnect from "@/lib/dbConnect";
import WorkoutDay from "@/models/WorkoutDay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const items = Array.isArray(body) ? body : [body];

    const days = await WorkoutDay.insertMany(items);
    return NextResponse.json({ days }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "خطا در سرور";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const planId = searchParams.get("planId");
    const weekId = searchParams.get("weekId");
    const userId = searchParams.get("userId");

    const query: Record<string, unknown> = {};
    if (planId) query.planId = planId;
    if (weekId) query.weekId = weekId;
    if (userId) query.userId = userId;

    if (!planId && !weekId && !userId) {
      return NextResponse.json(
        { message: "شناسه الزامی است" },
        { status: 400 },
      );
    }

    const days = await WorkoutDay.find(query).sort({ sortOrder: 1 });
    return NextResponse.json({ days });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "خطا در سرور";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, dayName, muscleGroup, sortOrder, weekId, userId } = body;

    if (!id) {
      return NextResponse.json({ message: "شناسه روز تمرینی الزامی است" }, { status: 400 });
    }

    const updatedData: Record<string, unknown> = {};
    if (dayName !== undefined) updatedData.dayName = dayName;
    if (muscleGroup !== undefined) updatedData.muscleGroup = muscleGroup;
    if (sortOrder !== undefined) updatedData.sortOrder = sortOrder;
    if (weekId !== undefined) updatedData.weekId = weekId;
    if (userId !== undefined) updatedData.userId = userId;

    const day = await WorkoutDay.findByIdAndUpdate(id, updatedData, { new: true });

    if (!day) {
      return NextResponse.json({ message: "روز تمرینی پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ day });
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
      return NextResponse.json({ message: "شناسه روز تمرینی الزامی است" }, { status: 400 });
    }

    const day = await WorkoutDay.findByIdAndDelete(id);

    if (!day) {
      return NextResponse.json({ message: "روز تمرینی پیدا نشد" }, { status: 404 });
    }

    const WorkoutExercise = (await import("@/models/WorkoutExercise")).default;
    await WorkoutExercise.deleteMany({ dayId: id });

    return NextResponse.json({ message: "روز تمرینی و حرکات آن با موفقیت حذف شدند" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "خطا در سرور";
    return NextResponse.json({ message }, { status: 500 });
  }
}

