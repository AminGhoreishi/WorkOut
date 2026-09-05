import type { BreadcrumbProps } from "@/types/components";
import Link from "next/link";

export default function Breadcrumb({ packageName }: BreadcrumbProps) {
  return (
    <section className="max-sm:py-4 sm:py-6 bg-neutral-950/90 border-b border-amber-500/20 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-400 font-danaMed">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            خانه
          </Link>
          <span>/</span>
          <Link
            href="/packages"
            className="hover:text-amber-400 transition-colors"
          >
            پکیج‌ها
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-bold">
            {packageName}
          </span>
        </div>
      </div>
    </section>
  );
}
