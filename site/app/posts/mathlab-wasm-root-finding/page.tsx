import type { Metadata } from "next";
import { posts } from "../../content-data";
import { PostArticle } from "../../post-article";

const post = posts.find((candidate) => candidate.slug === "mathlab-wasm-root-finding")!;

export const metadata: Metadata = {
  title: `${post.title} — Lab Notes`,
  description: post.title,
  alternates: { canonical: `/posts/mathlab-wasm-root-finding` },
};

export default function Page() {
  return <PostArticle post={post} />;
}

