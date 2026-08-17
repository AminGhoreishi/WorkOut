import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(searchParams.get("limit")) || 9)
    );
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query: Record<string, any> = { status: "published" };

    if (category && category !== "همه" && category !== "all") {
      query.category = category;
    }

    if (search && search.trim()) {
      const sanitized = search.trim().replace(
        /[-[\]{}()*+?.,\\^$|#\s]/g,
        "\\$&"
      );
      query.$or = [
        { title: { $regex: sanitized, $options: "i" } },
        { excerpt: { $regex: sanitized, $options: "i" } },
        { content: { $regex: sanitized, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const blogs = await Blog.find(query)
      .select(
        "title slug excerpt image category publishDate createdAt content authorId"
      )
      .populate("authorId", "username fullName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Blog.countDocuments(query);
    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      success: true,
      blogs: JSON.parse(JSON.stringify(blogs)),
      total,
      totalPages,
      page,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "خطایی در دریافت مقالات رخ داد" },
      { status: 500 }
    );
  }
}
