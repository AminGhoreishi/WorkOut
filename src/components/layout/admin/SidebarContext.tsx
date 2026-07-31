"use client";
import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext({ isOpen: true, onToggle: () => {} });

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setIsOpen(true);
    }
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isOpen, onToggle: () => setIsOpen((prev) => !prev) }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
