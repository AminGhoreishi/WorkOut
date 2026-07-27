"use client";

import type { ScrollRevealProps } from "@/types/animation";

export default function ScrollReveal({
  children,
  className = "",
}: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
