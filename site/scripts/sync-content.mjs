#!/usr/bin/env node
// Regenerates app/content-data.ts from the repo root's content/00-index.md and
// content/posts/*.md. Run this from site/ after editing any content file:
//
//   pnpm run sync-content
//
// This script only copies bytes -- it never rewrites, reflows, or "cleans up"
// the source markdown. The frontmatter and body text land in the generated
// file exactly as written in content/.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(__dirname, "..");
const repoRoot = resolve(siteRoot, "..");
const contentDir = resolve(repoRoot, "content");

function parseFrontmatter(raw, sourceFile) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`${sourceFile}: expected a leading YAML frontmatter block delimited by ---`);
  }
  const [, frontmatter, rest] = match;
  const data = {};
  for (const line of frontmatter.split("\n")) {
    if (!line.trim()) continue;
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  const body = rest.replace(/^\n+/, "").replace(/\s+$/, "");
  return { data, body };
}

function tsTemplateLiteral(value) {
  return "`" + value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";
}

const indexRaw = readFileSync(resolve(contentDir, "00-index.md"), "utf8");
const { data: indexMeta, body: indexBody } = parseFrontmatter(indexRaw, "content/00-index.md");

const postFiles = readdirSync(resolve(contentDir, "posts"))
  .filter((file) => file.endsWith(".md"))
  .sort();

const requiredFields = ["slug", "title", "project", "field", "date", "repo", "tool", "report"];

const posts = postFiles.map((file) => {
  const raw = readFileSync(resolve(contentDir, "posts", file), "utf8");
  const { data, body } = parseFrontmatter(raw, `content/posts/${file}`);
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`content/posts/${file}: missing required frontmatter field "${field}"`);
    }
  }
  return { ...data, body };
});

const postsLiteral = posts
  .map(
    (post) => `  {
    slug: ${JSON.stringify(post.slug)},
    title: ${JSON.stringify(post.title)},
    project: ${JSON.stringify(post.project)},
    field: ${JSON.stringify(post.field)},
    date: ${JSON.stringify(post.date)},
    repo: ${JSON.stringify(post.repo)},
    tool: ${JSON.stringify(post.tool)},
    report: ${JSON.stringify(post.report)},
    body: ${tsTemplateLiteral(post.body)},
  }`,
  )
  .join(",\n");

const output = `// GENERATED FILE -- do not edit by hand.
// Source of truth: content/00-index.md and content/posts/*.md at the repo root.
// Regenerate with \`pnpm run sync-content\` (from site/) after editing those files.

export interface PostMeta {
  slug: string;
  title: string;
  project: string;
  field: string;
  date: string;
  repo: string;
  tool: string;
  report: string;
}

export interface Post extends PostMeta {
  body: string;
}

export const indexMeta = ${JSON.stringify(indexMeta, null, 2)} as const;

export const indexBody = ${tsTemplateLiteral(indexBody)};

export const posts: Post[] = [
${postsLiteral}
];
`;

writeFileSync(resolve(siteRoot, "app", "content-data.ts"), output);
console.log(`Wrote app/content-data.ts with ${posts.length} posts.`);
