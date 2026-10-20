import type { Metadata } from "next";
import { posts } from "../../content-data";
import { PostArticle } from "../../post-article";

const post = posts.find((candidate) => candidate.slug === "backtests-lie-selection-bias")!;

export const metadata: Metadata = {
  title: `${post.title} — Lab Notes`,
  description: post.title,
  alternates: { canonical: `/posts/backtests-lie-selection-bias` },
};

export default function Page() {
  return <PostArticle post={post} />;
}
