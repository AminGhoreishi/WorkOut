import { Suspense } from "react";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import LatestArticlesCardsSection from "./LatestArticlesCardsSection";
import LatestArticlesCardsSkeleton from "./LatestArticlesCardsSkeleton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function LatestArticles() {
  return (
    <section className="relative py-10 sm:py-12 md:py-14 lg:py-16 bg-neutral-950/80 font-danaMed">
      <div className="container mx-auto">
        <ScrollReveal direction="down" duration={0.6}>
          <div className="flex justify-between items-end mb-8 sm:mb-10 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-morabbaReg">
                جدیدترین{" "}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  مقالات
                </span>
              </h2>
              <p className="text-neutral-400 max-sm:text-xs">آخرین نکات و راهنماهای تمرینی</p>
            </div>
            <Link
              href="/articles"
              className="text-amber-400 max-sm:text-xs hover:text-amber-300 flex items-center gap-2 transition-colors font-semibold"
            >
              <span>مشاهده همه</span>
              <BsArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
        <Suspense fallback={<LatestArticlesCardsSkeleton />}>
          <LatestArticlesCardsSection />
        </Suspense>
      </div>
    </section>
  );
}
