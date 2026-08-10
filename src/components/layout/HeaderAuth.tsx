import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserDropdown from "./UserDropdown";

export default async function HeaderAuth() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <UserDropdown
        username={session.user?.username || ""}
        avatar={session.user?.avatar || ""}
        email={session.user?.email || ""}
        role={session.user?.role || ""}
      />
    );
  }

  return (
    <Link
      href="/login"
      className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold px-6 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
    >
      ورود / ثبت نام
    </Link>
  );
}
