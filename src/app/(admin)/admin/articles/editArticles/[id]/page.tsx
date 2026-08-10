import { Suspense } from "react";
import { connection } from "next/server";
import EditArticle from "@/modules/admin/dashboard/articles/editArticle/EditArticle";

async function EditArticleContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  return <EditArticle articleId={id} />;
}

export default function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <EditArticleContent params={params} />
    </Suspense>
  );
}
