import dbConnect from "@/lib/dbConnect";
import registerModels from "@/lib/registerModels";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SubscriptionModel from "@/models/Subscription";
import UserModel from "@/models/User";
import TicketModel from "@/models/Ticket";
import BlogModel from "@/models/Blog";
import WishModel from "@/models/Wish";
import AdminDashboardUser from "@/features/dashboard/AdminDashboardUser/AdminDashboardUser";
import { connection } from "next/server";
import { processDashboardData } from "@/lib/dashboardData";

const registerPageModels = () => {
  return [TicketModel, BlogModel, WishModel];
};

export default async function Page() {
  await connection();

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    redirect("/login");
  }

  registerModels();
  registerPageModels();

  await dbConnect();

  const userId = session.user.id;

  const [dbUserRes, activeSubscriptionRes, dbTicketsRes, dbWishlistRes] =
    await Promise.allSettled([
      UserModel.findById(userId).lean(),
      SubscriptionModel.findOne({
        userId,
        status: { $in: ["active", "trial"] },
        endsAt: { $gt: new Date() },
      })
        .sort({ endsAt: -1, createdAt: -1 })
        .populate("packageId")
        .populate("coachId")
        .lean(),
      TicketModel.find({ userId })
        .sort({ updatedAt: -1 })
        .limit(3)
        .lean(),
      WishModel.find({ userId })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate({
          path: "blogId",
          select: "title slug image category views",
        })
        .lean(),
    ]);

  if (dbUserRes.status === "rejected") {
    throw new Error("خطا در برقراری ارتباط با سرور پایگاه داده");
  }

  const dbUser = dbUserRes.value;
  if (!dbUser) {
    redirect("/login");
  }

  const activeSubscriptionDoc =
    activeSubscriptionRes.status === "fulfilled"
      ? activeSubscriptionRes.value
      : null;
  const dbTickets =
    dbTicketsRes.status === "fulfilled" ? dbTicketsRes.value : [];
  const dbWishlist =
    dbWishlistRes.status === "fulfilled" ? dbWishlistRes.value : [];

  const {
    userProps,
    subscriptionProps,
    workoutDaysProps,
    ticketsProps,
    wishlistProps,
  } = await processDashboardData(
    dbUser,
    activeSubscriptionDoc,
    dbTickets,
    dbWishlist,
  );

  return (
    <AdminDashboardUser
      initialUser={userProps}
      initialSubscription={subscriptionProps}
      initialWorkouts={workoutDaysProps}
      initialTickets={ticketsProps}
      initialWishlist={wishlistProps}
    />
  );
}
