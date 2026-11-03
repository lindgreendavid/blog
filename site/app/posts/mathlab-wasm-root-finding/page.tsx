import { postMetadata } from "../../lib/seo";
import { posts } from "../../content-data";
import { PostArticle } from "../../post-article";

const post = posts.find((candidate) => candidate.slug === "mathlab-wasm-root-finding")!;

export const metadata = postMetadata(post);

export default function Page() {
  return <PostArticle post={post} />;
}

