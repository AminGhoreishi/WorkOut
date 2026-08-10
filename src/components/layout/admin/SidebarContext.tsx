"use client";
import { createContext, useContext, useState, useEffect, Suspense, useCallback } from "react";
import { usePathname } from "next/navigation";

const SidebarContext = createContext({
  isOpen: false,
  onToggle: () => {},
  closeSidebar: () => {},
});

function PathnameListener({
  onPathChange,
}: {
  onPathChange: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    onPathChange();
  }, [pathname, onPathChange]);

  return null;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePathChange = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        onToggle: () => setIsOpen((prev) => !prev),
        closeSidebar: () => setIsOpen(false),
      }}
    >
      <Suspense fallback={null}>
        <PathnameListener onPathChange={handlePathChange} />
      </Suspense>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
