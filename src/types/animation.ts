import type { ReactNode } from "react";

export type AnimationDirection = "up" | "down" | "left" | "right" | "none";

export interface ScrollRevealProps {
  children: ReactNode;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

export interface StaggerContainerProps {
  children: ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
  className?: string;
}

export interface StaggerItemProps {
  children: ReactNode;
  direction?: AnimationDirection;
  distance?: number;
  duration?: number;
  className?: string;
}
