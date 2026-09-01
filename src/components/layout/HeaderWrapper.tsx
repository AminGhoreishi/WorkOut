import { Suspense } from "react";
import Header from "./Header";
import HeaderAuth from "./HeaderAuth";
import HeaderAuthSkeleton from "./HeaderAuthSkeleton";
import MobileAuth from "./MobileAuth";
import MobileAuthSkeleton from "./MobileAuthSkeleton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HeaderWrapper() {
  const session = await getServerSession(authOptions);

  return (
    <Header
      user={session?.user}
      authSlot={
        <Suspense fallback={<HeaderAuthSkeleton />}>
          <HeaderAuth />
        </Suspense>
      }
      mobileAuthSlot={
        <Suspense fallback={<MobileAuthSkeleton />}>
          <MobileAuth />
        </Suspense>
      }
    />
  );
}
