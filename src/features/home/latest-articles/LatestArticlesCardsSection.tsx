import LatestArticlesList from "./LatestArticlesList";
import { getHomeArticles } from "@/lib/homeData";

export default async function LatestArticlesCardsSection() {
  try {
    const articles = await getHomeArticles();
    return <LatestArticlesList articles={articles} />;
  } catch {
    return (
      <div className="text-center py-12 text-neutral-500 text-sm border border-dashed border-amber-500/30 rounded-2xl bg-neutral-900/40">
        مقاله‌ای برای نمایش وجود ندارد
      </div>
    );
  }
}
