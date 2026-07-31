"use client";
import { useSidebar } from "./SidebarContext";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();
  return (
    <main
      className={`flex-1 overflow-y-auto transition-all font-danaMed! duration-300 ${
        isOpen ? "lg:mr-64" : "lg:mr-20"
      }`}
    >
      {children}
    </main>
  );
}
