# Lab Notes

<p><a href="https://github.com/lindgreendavid/lindgreendavid/tree/main/brand"><img src="https://raw.githubusercontent.com/lindgreendavid/lindgreendavid/main/brand/lab-notes-mark.svg" width="52" align="right" alt="Lab Notes research-cycle mark"></a></p>

**Editorial home of the [Lab Notes Research Portfolio](https://github.com/lindgreendavid/lindgreendavid/tree/main/brand)** · Question → evidence → finding → boundary

A growing, text-forward publication that indexes and writes up the interactive research projects
in this portfolio — one real, falsifiable question per project, one honest account of what was
actually found.

**[Open the live site](https://blog-interactive.lindgreendavid.workers.dev)**

## What this is

- A home page rendering `content/00-index.md`'s framing copy ("What this is", "Why this
  exists"), an interactive research explorer, a reusable four-step guide to reading scientific
  results, every published post, and the "Explore further" links to the rest of the portfolio.
- The explorer filters the portfolio by track and presents every project using the same
  inspectable structure: bounded question, evidence, finding, and boundary, with direct links to
  the article and live laboratory. Its facts are drawn from the projects' frozen reports; it
  does not calculate or invent new results.
- Each post has its own route (`/posts/<slug>`, using the `slug` from that post's
  frontmatter), rendering `content/posts/*.md` verbatim and linking prominently to that
  project's live interactive tool, source repository, and full research report.
- Nothing here is generated or paraphrased by this site's build — every sentence in
  `content/00-index.md` and `content/posts/*.md` is finished, fact-checked prose written and
  approved separately from this repository, and this site renders it unchanged.

## How it's built

- **[vinext](https://github.com/cloudflare/vinext)** (Next.js's App Router API surface, run on
  Vite) deployed to **Cloudflare Workers**, matching the toolchain used by every other project in
  this portfolio (`fairshift-lab`, `three-body-lab`, `frb-atlas`, `foldings-edge`,
  `climate-twin-frankfurt`).
- Each post is a real file-based route (`site/app/posts/<slug>/page.tsx`), not a client-side
  router or a single-page scroll. The deliberately small publication does not need a generic CMS,
  so this repo keeps each growing entry explicit and reviewable.
- Content flows one way: `content/00-index.md` and `content/posts/*.md` are the source of truth.
  `site/scripts/sync-content.mjs` reads them and writes `site/app/content-data.ts`, a generated
  TypeScript module the Cloudflare Worker can import at build time (Workers can't read arbitrary
  files off disk at request time, so the content has to be bundled). The script only copies
  bytes — it never reflows, edits, or "cleans up" a sentence.
- A small hand-written markdown-to-JSX renderer (`site/app/lib/markdown.tsx`) turns each post's
  body into semantic HTML (`##` → `<h2>`, `- ` → `<ul><li>`, `**bold**`, `*italic*`,
  `[text](url)` → `<a>`). It supports exactly the subset of markdown the published posts use
  — no third-party markdown/MDX dependency.
- Editorial, text-forward design: a serif reading typeface for headings and body copy, a distinct
  ivory/ink/burgundy color palette (not shared with any sibling project), and WCAG AA contrast
  verified by a dedicated test (see [`ACCESSIBILITY.md`](ACCESSIBILITY.md)).
- Progressive enhancement: the initial explorer content is server-rendered, while filtering and
  project selection become interactive in the browser through native buttons with `aria-pressed`
  and an `aria-live` detail region.

## Repository layout

```
content/00-index.md          home page framing copy (verbatim, fact-checked, do not edit here)
content/posts/*.md           published posts, one per project (verbatim, fact-checked)
site/                         the vinext/Cloudflare Workers site
  app/content-data.ts         generated from content/ — do not hand-edit, see below
  app/lib/markdown.tsx         the small markdown-to-JSX renderer
  app/posts/<slug>/page.tsx    one route per post
  app/page.tsx                 the home page
  scripts/sync-content.mjs     regenerates app/content-data.ts from content/
  tests/                       rendered-HTML and accessibility-contract tests
```

## Adding a new post

This portfolio keeps growing, so adding a post should stay a small, mechanical change:

1. Write the post as `content/posts/NN-project-slug.md`, with the same frontmatter fields as the
   existing posts: `slug`, `title`, `project`, `field`, `date`, `repo`, `tool`, `report`. The
   `slug` becomes the route (`/posts/<slug>`).
2. From `site/`, run `pnpm run sync-content` to regenerate `app/content-data.ts`.
3. Add a route folder: `site/app/posts/<slug>/page.tsx`, copying the pattern from an existing
   post page (look up the post by `slug` in `posts` and render `<PostArticle post={post} />`).
4. Add a one-line, hand-written teaser sentence for the new post to the `teasers` map in
   `site/app/page.tsx` (navigation copy only — the post's own prose is never edited).
5. `pnpm run lint && pnpm run test` from `site/`, then commit.

## Site

```bash
cd site
pnpm install
pnpm run dev     # local development
pnpm run build   # production build
pnpm run lint
pnpm run test
```

The human maintainer deploys the reviewed build (`wrangler deploy` / `vinext-cloudflare deploy`
are intentionally not run by any automation in this repository).

## License

Code is MIT-licensed (see [`LICENSE`](LICENSE)). Each post links to its own project's repository,
which documents that project's own data sources and licenses.
