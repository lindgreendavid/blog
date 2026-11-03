// What search engines and AI answer engines read on Lab Notes: titles, descriptions, social images and structured data.
// Every value comes from the note itself; nothing is added for ranking only.
import type { Metadata } from "next";
import type { Post } from "../content-data";

export const ORIGIN = "https://notes.lindgreendavid.com";
export const PORTFOLIO = "https://lindgreendavid.com";

const author = {
  "@type": "Person",
  "@id": `${PORTFOLIO}/#person`,
  name: "David Lindgreen",
  url: `${PORTFOLIO}/`,
  sameAs: ["https://github.com/lindgreendavid", "https://www.linkedin.com/in/david-lindgreen-625868303/"],
};

/** The first paragraph under "The question", with the markdown taken out and cut at a word boundary. */
export function descriptionOf(post: Post): string {
  const m = post.body.match(/##\s+The question\s*\n+([\s\S]*?)(\n\s*\n|$)/);
  const raw = (m ? m[1] : post.title)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (raw.length <= 155) return raw;
  return `${raw.slice(0, 152).replace(/\s+\S*$/, "")}...`;
}

export function postMetadata(post: Post): Metadata {
  const title = `${post.project} research note | Lab Notes`;
  const description = descriptionOf(post);
  const image = `/og/${post.slug}.png`;
  return {
    title,
    description,
    alternates: { canonical: `/posts/${post.slug}` },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/posts/${post.slug}`,
      siteName: "Lab Notes",
      publishedTime: post.date,
      authors: ["David Lindgreen"],
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function articleLd(post: Post): object[] {
  const url = `${ORIGIN}/posts/${post.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: post.title,
      name: `${post.project} research note`,
      description: descriptionOf(post),
      url,
      mainEntityOfPage: url,
      image: `${ORIGIN}/og/${post.slug}.png`,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: "en",
      articleSection: post.field,
      author,
      publisher: author,
      isPartOf: { "@type": "Blog", name: "Lab Notes", url: `${ORIGIN}/` },
      about: { "@type": "SoftwareSourceCode", name: post.project, codeRepository: post.repo },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Lab Notes", item: `${ORIGIN}/` },
        { "@type": "ListItem", position: 2, name: post.project, item: url },
      ],
    },
  ];
}

export function homeLd(posts: Post[]): object[] {
  return [
    {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", "@id": `${ORIGIN}/#website`, name: "Lab Notes", url: `${ORIGIN}/`, inLanguage: "en", publisher: author },
        {
          "@type": "Blog",
          "@id": `${ORIGIN}/#blog`,
          name: "Lab Notes",
          url: `${ORIGIN}/`,
          description: "Public analyses with code, data and stated limits.",
          author,
          blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${ORIGIN}/posts/${p.slug}`, datePublished: p.date })),
        },
      ],
    },
  ];
}
