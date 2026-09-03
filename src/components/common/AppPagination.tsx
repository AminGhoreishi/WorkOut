"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { AppPaginationProps } from "@/types/components";

export default function AppPagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  className = "",
}: AppPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("ellipsis-start");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-end");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs md:text-sm ${className}`}>
      <div className="text-gray-400 ss02">
        نمایش صفحه <span className="font-semibold text-white">{currentPage}</span> از{" "}
        <span className="font-semibold text-white">{totalPages}</span>
        {typeof totalItems === "number" && (
          <span> ({totalItems} مورد)</span>
        )}
      </div>

      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          {getPageNumbers().map((p, idx) => (
            <PaginationItem key={idx}>
              {typeof p === "number" ? (
                <PaginationLink
                  isActive={currentPage === p}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
