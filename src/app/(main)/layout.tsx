import { Suspense } from "react";
import Footer from "@/components/layout/Footer";
import HeaderWrapper from "@/components/layout/HeaderWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <HeaderWrapper />
      </Suspense>
      <main>{children}</main>
      <Footer />
    </>
  );
}
