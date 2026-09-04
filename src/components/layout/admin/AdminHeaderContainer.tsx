import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import TicketModel from "@/models/Ticket";
import NotificationModel from "@/models/Notification";
import AdminHeader from "./AdminHeader";

export default async function AdminHeaderContainer() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <AdminHeader
        username="کاربر"
        role="user"
        avatar="ک"
        newTicketsCount={0}
        unreadNotificationsCount={0}
      />
    );
  }

  await dbConnect();

  const [dbUser, newTicketsCount, unreadNotificationsCount] = await Promise.all([
    UserModel.findById(session.user.id).lean(),
    TicketModel.countDocuments({ status: "pending" }),
    NotificationModel.countDocuments({ userId: session.user.id, isRead: false }),
  ]);

  if (!dbUser) {
    return (
      <AdminHeader
        username="کاربر"
        role="user"
        avatar="ک"
        newTicketsCount={newTicketsCount}
        unreadNotificationsCount={unreadNotificationsCount}
      />
    );
  }

  const displayName = dbUser.fullName || dbUser.username;
  const initial = displayName.substring(0, 1);

  return (
    <AdminHeader
      username={displayName}
      role={dbUser.role}
      avatar={initial}
      newTicketsCount={newTicketsCount}
      unreadNotificationsCount={unreadNotificationsCount}
    />
  );
}
