import { Suspense } from "react";
import Header from "./Header";
import HeaderAuth from "./HeaderAuth";
import HeaderAuthSkeleton from "./HeaderAuthSkeleton";
import MobileAuth from "./MobileAuth";
import MobileAuthSkeleton from "./MobileAuthSkeleton";

export default function HeaderWrapper() {
  return (
    <Header
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
