"use client";

import { motion } from "motion/react";
import type { ScrollRevealProps } from "@/types/animation";

export function ScrollReveal({
  children,
  direction = "up",
  distance = 30,
  duration = 0.6,
  delay = 0,
  once = true,
  scale,
  className = "",
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0, opacity: 0, scale: scale ?? 1 };
      case "down":
        return { y: -distance, x: 0, opacity: 0, scale: scale ?? 1 };
      case "left":
        return { x: distance, y: 0, opacity: 0, scale: scale ?? 1 };
      case "right":
        return { x: -distance, y: 0, opacity: 0, scale: scale ?? 1 };
      case "zoom-in":
        return { x: 0, y: 0, opacity: 0, scale: scale ?? 0.9 };
      case "zoom-out":
        return { x: 0, y: 0, opacity: 0, scale: scale ?? 1.1 };
      case "fade":
        return { x: 0, y: 0, opacity: 0, scale: 1 };
      case "none":
        return { x: 0, y: 0, opacity: 1, scale: 1 };
      default:
        return { y: distance, x: 0, opacity: 0, scale: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
