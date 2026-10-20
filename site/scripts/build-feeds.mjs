#!/usr/bin/env node
// Writes public/sitemap.xml and public/feed.xml from content/posts/*.md frontmatter.
// Run from site/ after `pnpm run sync-content`:  node scripts/build-feeds.mjs
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = resolve(siteRoot, "..", "content", "posts");
const ORIGIN = "https://notes.lindgreendavid.com";

function frontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index === -1) continue;
    let value = line.slice(index + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    data[line.slice(0, index).trim()] = value;
  }
  return data;
}

const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const posts = readdirSync(postsDir)
  .filter((name) => name.endsWith(".md"))
  .map((name) => frontmatter(readFileSync(resolve(postsDir, name), "utf8")))
  .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

const urls = [`${ORIGIN}/`, ...posts.map((post) => `${ORIGIN}/posts/${post.slug}`)];
const lastmod = (post) => post.date;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url, index) => `  <url><loc>${url}</loc>${index > 0 ? `<lastmod>${lastmod(posts[index - 1])}</lastmod>` : ""}</url>`)
  .join("\n")}
</urlset>
`;

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Lab Notes</title>
    <link>${ORIGIN}/</link>
    <description>Public analyses with code, data and stated limits, by David Lindgreen.</description>
    <language>en</language>
${posts
  .map(
    (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${ORIGIN}/posts/${post.slug}</link>
      <guid>${ORIGIN}/posts/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(`${post.project}: ${post.field}`)}</description>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;

writeFileSync(resolve(siteRoot, "public", "sitemap.xml"), sitemap);
writeFileSync(resolve(siteRoot, "public", "feed.xml"), feed);
console.log(`Wrote public/sitemap.xml and public/feed.xml for ${posts.length} posts.`);
