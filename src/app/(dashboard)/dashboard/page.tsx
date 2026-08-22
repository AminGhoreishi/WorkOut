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
  registerModels();
  registerPageModels();

  try {
    await dbConnect();
  } catch {
    redirect("/login");
  }

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const [dbUser, activeSubscriptionDoc, dbTickets, dbWishlist] =
    await Promise.all([
      UserModel.findById(userId).lean(),
      SubscriptionModel.findOne({
        userId,
        status: { $in: ["active", "trial"] },
        endsAt: { $gt: new Date() },
      })
        .populate("packageId")
        .populate("coachId")
        .lean(),
      TicketModel.find({ userId })
        .sort({ updatedAt: -1 })
        .limit(3)
        .lean(),
      WishModel.find({ userId }).populate("blogId").lean(),
    ]);

  if (!dbUser) {
    redirect("/login");
  }

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
    dbWishlist
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
