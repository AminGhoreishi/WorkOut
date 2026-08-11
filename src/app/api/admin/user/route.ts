import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import Subscription from "@/model/Subscription";
import Order from "@/model/Order";
import Package from "@/model/Package";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { toEnglishDigits } from "@/utils/numbers";
import type { AdminCreateUserPayload } from "@/types/user";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const page = Number(req.nextUrl.searchParams.get("page") || "1");
    const limit = Number(req.nextUrl.searchParams.get("limit") || "10");
    const statusParam = req.nextUrl.searchParams.get("status");
    const roleParam = req.nextUrl.searchParams.get("role");
    const searchParam = req.nextUrl.searchParams.get("search") || req.nextUrl.searchParams.get("query");
    const skip = (page - 1) * limit;

    const filterQuery: Record<string, unknown> = {};

    if (roleParam && roleParam !== "all") {
      filterQuery.role = roleParam;
    }

    if (statusParam && statusParam !== "all") {
      filterQuery.status = statusParam;
    }

    if (searchParam && searchParam.trim()) {
      const regex = { $regex: searchParam.trim(), $options: "i" };
      const currentRole = filterQuery.role;
      if (currentRole) {
        delete filterQuery.role;
        filterQuery.$and = [
          { role: currentRole },
          {
            $or: [
              { username: regex },
              { email: regex },
              { phone: regex },
            ],
          },
        ];
      } else {
        filterQuery.$or = [
          { username: regex },
          { email: regex },
          { phone: regex },
        ];
      }
    }

    const countFilter = roleParam && roleParam !== "all" ? { role: roleParam } : {};

    const [users, totalUsers, activeUsers, expiredUsers, blockedUsers] =
      await Promise.all([
        User.find(filterQuery).select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        User.countDocuments(filterQuery),
        User.countDocuments({ ...countFilter, status: "active" }),
        User.countDocuments({ ...countFilter, status: "expired" }),
        User.countDocuments({ ...countFilter, status: "blocked" }),
      ]);

    const totalPage = Math.ceil(totalUsers / limit);
    const userIds = users.map((u) => u._id);

    await Package.findOne({});

    const [subscriptions, orders] = await Promise.all([
      Subscription.find({
        userId: { $in: userIds },
        status: { $in: ["active", "trial"] },
      })
        .populate("packageId", "name")
        .lean(),
      Order.find({
        userId: { $in: userIds },
        status: "paid",
      }).lean(),
    ]);

    const usersWithDetails = users.map((u) => {
      const activeSub = subscriptions.find(
        (sub) => sub.userId.toString() === u._id.toString()
      );
      const userOrders = orders.filter(
        (ord) => ord.userId.toString() === u._id.toString()
      );
      const totalPayments = userOrders.reduce(
        (sum, ord) => sum + (ord.amountPaid || 0),
        0
      );

      let persianStatus = "فعال";
      if (u.status === "blocked") persianStatus = "مسدود";
      else if (u.status === "expired") persianStatus = "منقضی";

      return {
        ...u,
        package: activeSub?.packageId?.name || "—",
        status: persianStatus,
        totalPayments,
      };
    });

    return NextResponse.json({
      users: usersWithDetails,
      totalPage,
      totalUsers,
      activeUsers,
      expiredUsers,
      blockedUsers,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to fetch users";
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
    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "شما مجاز به دسترسی به این بخش نیستید." },
        { status: 403 }
      );
    }

    const body: AdminCreateUserPayload = await req.json();
    const { username, phone, password, email, fullName, role, status } = body;

    if (!username || !phone || !password) {
      return NextResponse.json(
        { message: "نام کاربری، شماره تلفن و رمز عبور الزامی هستند." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "رمز عبور حداقل باید ۶ کاراکتر باشد." },
        { status: 400 }
      );
    }

    const cleanPhone = toEnglishDigits(String(phone).trim());
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { message: "فرمت شماره تلفن معتبر نیست (مثال: 09123456789)." },
        { status: 400 }
      );
    }

    const searchConditions: Record<string, unknown>[] = [{ phone: cleanPhone }];
    if (email && email.trim()) {
      searchConditions.push({ email: email.trim().toLowerCase() });
    }

    const existingUser = await User.findOne({ $or: searchConditions });

    if (existingUser) {
      if (existingUser.phone === cleanPhone) {
        return NextResponse.json(
          { message: "کاربری با این شماره تلفن قبلاً ثبت شده است." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { message: "کاربری با این ایمیل قبلاً ثبت شده است." },
        { status: 409 }
      );
    }

    const userRole = ["user", "admin", "coach"].includes(role || "")
      ? role
      : "user";
    const userStatus = ["active", "expired", "blocked"].includes(status || "")
      ? status
      : "active";

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username: username.trim(),
      phone: cleanPhone,
      password: hashedPassword,
      email: email && email.trim() ? email.trim().toLowerCase() : undefined,
      fullName: fullName && fullName.trim() ? fullName.trim() : undefined,
      role: userRole,
      status: userStatus,
    });

    return NextResponse.json(
      {
        success: true,
        message: "کاربر جدید با موفقیت ایجاد شد.",
        user: {
          _id: newUser._id,
          username: newUser.username,
          phone: newUser.phone,
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role,
          status: newUser.status,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "خطا در ایجاد کاربر";
    return NextResponse.json({ message: errMessage }, { status: 500 });
  }
}
