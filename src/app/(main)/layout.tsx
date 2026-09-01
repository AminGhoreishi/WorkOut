
import { Suspense } from "react";
import Footer from "@/components/layout/Footer";
import HeaderWrapper from "@/components/layout/HeaderWrapper";
import Header from "@/components/layout/Header";
import HeaderAuthSkeleton from "@/components/layout/HeaderAuthSkeleton";
import MobileAuthSkeleton from "@/components/layout/MobileAuthSkeleton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense
        fallback={
          <Header
            authSlot={<HeaderAuthSkeleton />}
            mobileAuthSlot={<MobileAuthSkeleton />}
          />
        }
      >
        <HeaderWrapper />
      </Suspense>
      <main>{children}</main>
      <Footer />
    </>
  );
}
