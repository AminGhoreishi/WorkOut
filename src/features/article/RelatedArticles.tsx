"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen } from "lucide-react";
import type { RelatedArticlesProps } from "@/types/blog";

export default function RelatedArticles({
  relatedArticles,
  getReadTime,
}: RelatedArticlesProps) {
  if (!relatedArticles || relatedArticles.length === 0) return null;

  return (
    <div className="rounded-2xl p-5 bg-neutral-900/60 border border-amber-500/20 font-danaMed">
      <h4 className="font-bold text-white mb-4 text-xs sm:text-sm font-morabbaReg">
        مقالات مرتبط
      </h4>
      <div className="space-y-3">
        {relatedArticles.map((r) => (
          <Link
            key={r._id}
            href={`/article/${r.slug}`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-800/50 border border-transparent hover:border-amber-500/10 transition-all group"
          >
            <div className="relative w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 bg-neutral-950 border border-amber-500/20 overflow-hidden">
              {r.image ? (
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <BookOpen className="w-5 h-5 text-amber-500/40" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold leading-5 group-hover:text-amber-400 transition-colors line-clamp-2">
                {r.title}
              </p>
              <div className="flex items-center gap-2 mt-1 text-neutral-500 text-xs">
                <Clock size={10} className="text-amber-400" />{" "}
                {getReadTime(r.content)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
