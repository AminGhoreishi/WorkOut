import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ShadcnPaginationProps,
  ShadcnPaginationContentProps,
  ShadcnPaginationItemProps,
  ShadcnPaginationLinkProps,
  ShadcnPaginationPreviousProps,
  ShadcnPaginationNextProps,
  ShadcnPaginationEllipsisProps,
} from "@/types/components";

function Pagination({ className, ...props }: ShadcnPaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  ShadcnPaginationContentProps
>(function PaginationContent({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      className={cn("flex flex-row items-center gap-1.5", className)}
      {...props}
    />
  );
});

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  ShadcnPaginationItemProps
>(function PaginationItem({ className, ...props }, ref) {
  return <li ref={ref} className={cn("", className)} {...props} />;
});

function PaginationLink({
  className,
  isActive,
  ...props
}: ShadcnPaginationLinkProps) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 h-8 min-w-8 px-2.5 cursor-pointer ss02",
        isActive
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
          : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white",
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  children,
  ...props
}: ShadcnPaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-1 px-3 w-auto", className)}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
      <span>{children ?? "قبلی"}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  children,
  ...props
}: ShadcnPaginationNextProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-1 px-3 w-auto", className)}
      {...props}
    >
      <span>{children ?? "بعدی"}</span>
      <ChevronLeft className="h-4 w-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: ShadcnPaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      className={cn("flex h-8 w-8 items-center justify-center text-gray-400", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">صفحات بیشتر</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
