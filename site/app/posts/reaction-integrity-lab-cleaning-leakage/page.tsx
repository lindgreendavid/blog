import type { Metadata } from "next";
import { posts } from "../../content-data";
import { PostArticle } from "../../post-article";

const post = posts.find(
  (candidate) => candidate.slug === "reaction-integrity-lab-cleaning-leakage",
)!;

export const metadata: Metadata = {
  title: `${post.title} — Lab Notes`,
  description: post.title,
};

export default function Page() {
  return <PostArticle post={post} />;
}
