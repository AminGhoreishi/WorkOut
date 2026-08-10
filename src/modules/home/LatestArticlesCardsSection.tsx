import LatestArticlesList from "./LatestArticlesList";
import { getHomeArticles } from "@/lib/homeData";

export default async function LatestArticlesCardsSection() {
  const articles = await getHomeArticles();
  return <LatestArticlesList articles={articles} />;
}
