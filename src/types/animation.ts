import type { ReactNode } from "react";

export type AnimationDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "zoom-in"
  | "zoom-out"
  | "fade"
  | "none";

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
  scale?: number;
  className?: string;
}

export interface ScrollRevealProps {
  children: ReactNode;
  direction?: AnimationDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  scale?: number;
  className?: string;
}

