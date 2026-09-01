import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { BubbleProps, BubbleContentProps, BubbleGroupProps, BubbleReactionsProps } from "@/types/components"

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-full min-w-0 flex-col gap-1",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-amber-500 *:data-[slot=bubble-content]:text-neutral-950 *:data-[slot=bubble-content]:border-amber-400",
        secondary:
          "*:data-[slot=bubble-content]:bg-white/10 *:data-[slot=bubble-content]:text-white *:data-[slot=bubble-content]:border-white/15",
        muted:
          "*:data-[slot=bubble-content]:bg-white/5 *:data-[slot=bubble-content]:text-white/80 *:data-[slot=bubble-content]:border-white/10",
        tinted:
          "*:data-[slot=bubble-content]:bg-purple-500/10 *:data-[slot=bubble-content]:text-white *:data-[slot=bubble-content]:border-purple-500/20",
        outline:
          "*:data-[slot=bubble-content]:bg-white/5 *:data-[slot=bubble-content]:text-white *:data-[slot=bubble-content]:border-white/10",
        ghost:
          "*:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:text-white *:data-[slot=bubble-content]:border-transparent",
        destructive:
          "*:data-[slot=bubble-content]:bg-red-500/10 *:data-[slot=bubble-content]:text-red-300 *:data-[slot=bubble-content]:border-red-500/20",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

function Bubble({
  className,
  variant,
  align,
  ...props
}: BubbleProps & VariantProps<typeof bubbleVariants>) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )
}

function BubbleContent({
  className,
  ...props
}: BubbleContentProps) {
  return (
    <div
      data-slot="bubble-content"
      className={cn(
        "w-fit max-w-full min-w-0 overflow-hidden rounded-2xl border p-4 text-sm leading-relaxed wrap-break-word",
        className
      )}
      {...props}
    />
  )
}

function BubbleGroup({
  className,
  ...props
}: BubbleGroupProps) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  )
}

function BubbleReactions({
  className,
  ...props
}: BubbleReactionsProps) {
  return (
    <div
      data-slot="bubble-reactions"
      className={cn(
        "flex flex-wrap items-center gap-1",
        className
      )}
      {...props}
    />
  )
}

export {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
  bubbleVariants,
}
