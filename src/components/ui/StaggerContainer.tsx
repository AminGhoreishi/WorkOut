"use client";

import type { StaggerContainerProps, StaggerItemProps } from "@/types/animation";

export function StaggerContainer({
  children,
  className = "",
}: StaggerContainerProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className = "",
}: StaggerItemProps) {
  return <div className={className}>{children}</div>;
}
