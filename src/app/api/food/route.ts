import dbConnect from "@/lib/dbConnect";
import Food from "@/models/Food";
import { NextRequest, NextResponse } from "next/server";

function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const search = req.nextUrl.searchParams.get("search") || "";
    const all = req.nextUrl.searchParams.get("all") === "true";
    const isAddModal = req.nextUrl.searchParams.get("isAddModal") === "true";
    const type = req.nextUrl.searchParams.get("type") || "";
    const pageParam = req.nextUrl.searchParams.get("page");
    const limitParam = req.nextUrl.searchParams.get("limit");

    const query: Record<string, unknown> = {};

    if (!all) {
      query.isActive = true;
    }

    if (type) {
      query.type = { $in: [type, "all"] };
    }

    if (search.trim()) {
      const sanitized = escapeRegex(search.trim());
      query.name = { $regex: sanitized, $options: "i" };
    }

    if (isAddModal) {
      const foods = await Food.find(query).limit(10).sort({ name: 1 });
      return NextResponse.json(foods, { status: 200 });
    }

    if (!pageParam && !limitParam && all) {
      const foods = await Food.find(query).sort({ name: 1 });
      return NextResponse.json(foods, { status: 200 });
    }

    const page = Math.max(1, parseInt(pageParam || "1", 10));
    const limit = Math.max(1, parseInt(limitParam || "10", 10));
    const skip = (page - 1) * limit;

    const totalItems = await Food.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit) || 1;

    const foods = await Food.find(query , "-__v")
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        foods,
        totalItems,
        totalPages,
        currentPage: page,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Food API GET Error:", err);
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const { name, calories, protein, carbs, fat, isActive, type } = body;
    if (!name || calories === undefined) {
      return NextResponse.json(
        { message: "نام غذا و کالری الزامی است." },
        { status: 400 },
      );
    }

    const exists = await Food.findOne({ name });
    if (exists) {
      return NextResponse.json(
        { message: "غذایی با این نام قبلاً ثبت شده است." },
        { status: 400 },
      );
    }

    const newFood = await Food.create({
      name,
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fat: fat || 0,
      type: type || "all",
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(newFood, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Food API POST Error:", err);
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    await dbConnect();
    await Food.deleteMany({});
    return NextResponse.json(
      { message: "All foods deleted successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 },
    );
  }
}
