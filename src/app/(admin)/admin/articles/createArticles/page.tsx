import CreateArticle from "@/modules/admin/dashboard/articles/createArticle/CreateArticle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { ArticleAuthorInfo } from "@/types/blog";

export default async function CreateArticlePage() {
  let initialAuthor: ArticleAuthorInfo | null = null;

  try {
    const session = await getServerSession(authOptions);
    if (session?.user) {
      initialAuthor = {
        fullName: session.user.fullName || session.user.name || undefined,
        username: session.user.username || undefined,
        role: session.user.role || undefined,
      };
    }
  } catch (error) {
    initialAuthor = null;
  }

  return <CreateArticle initialAuthor={initialAuthor} />;
}
