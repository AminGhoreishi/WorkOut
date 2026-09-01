"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { StaggerContainerProps, StaggerItemProps } from "@/types/animation";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerChildren: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerChildren,
      delayChildren: custom.delayChildren,
    },
  }),
};

export function StaggerContainer({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  once = true,
  className = "",
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      custom={{ staggerChildren, delayChildren }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  direction = "up",
  distance = 25,
  duration = 0.5,
  scale,
  className = "",
}: StaggerItemProps) {
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0, scale: scale ?? 1 };
      case "down":
        return { y: -distance, x: 0, scale: scale ?? 1 };
      case "left":
        return { x: distance, y: 0, scale: scale ?? 1 };
      case "right":
        return { x: -distance, y: 0, scale: scale ?? 1 };
      case "zoom-in":
        return { x: 0, y: 0, scale: scale ?? 0.9 };
      case "zoom-out":
        return { x: 0, y: 0, scale: scale ?? 1.1 };
      case "fade":
      case "none":
        return { x: 0, y: 0, scale: 1 };
      default:
        return { y: distance, x: 0, scale: 1 };
    }
  };

  const offset = getOffset();

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: offset.scale,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
