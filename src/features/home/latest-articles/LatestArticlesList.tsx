"use client";

import Link from "next/link";
import Image from "next/image";
import type { LatestArticlesListProps } from "@/types/components";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

export default function LatestArticlesList({
  articles,
}: LatestArticlesListProps) {
  return articles && articles.length > 0 ? (
    <StaggerContainer
      staggerChildren={0.15}
      className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
    >
      {articles.map((a) => (
        <StaggerItem key={a.id} direction="up" distance={30}>
          <Link
            href={`/article/${a.slug}`}
            className="bg-neutral-900/80 backdrop-blur-lg border border-amber-500/20 rounded-2xl overflow-hidden hover:bg-neutral-900 transition-all hover:scale-[1.02] hover:border-amber-400/50 cursor-pointer flex flex-col shadow-[0_0_20px_rgba(234,179,8,0.05)] h-full"
          >
            <div className="aspect-video bg-gradient-to-br from-amber-500/10 via-neutral-900 to-yellow-600/10 relative flex items-center justify-center overflow-hidden">
              {a.image ? (
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-6xl">📝</span>
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">
                    {a.category}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {a.readingTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white hover:text-amber-300 transition-colors mb-3 line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-neutral-400 text-sm line-clamp-2 mb-4">
                  {a.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400 pt-4 border-t border-amber-500/20">
                <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-sm font-bold text-amber-300">
                  {a.authorInitial}
                </div>
                <span>{a.authorName}</span>
                <span className="text-neutral-600">•</span>
                <span>{a.publishDate}</span>
              </div>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  ) : (
    <div className="text-center py-12 text-neutral-500 text-sm border border-dashed border-amber-500/30 rounded-2xl bg-neutral-900/40">
      مقاله‌ای برای نمایش وجود ندارد
    </div>
  );
}
