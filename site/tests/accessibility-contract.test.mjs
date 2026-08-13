import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(name) {
  return readFile(new URL(name, root), "utf8");
}

function luminance(hex) {
  const channels = hex.match(/[0-9a-f]{2}/gi).map((value) => Number.parseInt(value, 16) / 255);
  const linear = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(first, second) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test("keeps the keyboard and landmark structure contract", async () => {
  const [layout, page, postArticle, styles] = await Promise.all([
    source("app/layout.tsx"),
    source("app/page.tsx"),
    source("app/post-article.tsx"),
    source("app/globals.css"),
  ]);
  assert.match(layout, /<html lang="en">/);
  assert.match(page, /href="#main-content">\s*Skip to main content/);
  assert.match(page, /<main id="main-content">/);
  assert.match(postArticle, /href="#main-content">\s*Skip to main content/);
  assert.match(postArticle, /<main id="main-content">/);
  assert.match(styles, /:focus-visible \{\s*outline: 3px solid/);
  assert.match(styles, /\.nav__links a \{[\s\S]*?display: inline-flex;\s*min-height: 44px/);
});

test("keeps navigation semantic and every nav item keyboard-reachable", async () => {
  const [siteNav, styles] = await Promise.all([
    source("app/site-nav.tsx"),
    source("app/globals.css"),
  ]);
  assert.match(siteNav, /<nav className="nav" aria-label="Primary navigation">/);
  assert.match(siteNav, /href="\/#explore"/);
  assert.match(siteNav, /href="\/#study"/);
  assert.match(siteNav, /href="\/#articles"/);
  assert.match(styles, /\.nav__links a \{/);
});

test("keeps the research explorer operable without color-only meaning", async () => {
  const [explorer, styles] = await Promise.all([
    source("app/research-explorer.tsx"),
    source("app/globals.css"),
  ]);
  assert.match(explorer, /type="button"/);
  assert.match(explorer, /aria-pressed=/);
  assert.match(explorer, /aria-live="polite"/);
  assert.match(explorer, /<dt>Question<\/dt>/);
  assert.match(explorer, /<dt>Boundary<\/dt>/);
  assert.match(styles, /\.project-choice\[aria-pressed="true"\]/);
});

test("keeps the article heading hierarchy: one h1, ordered h2s", async () => {
  const postArticle = await source("app/post-article.tsx");
  assert.match(postArticle, /<h1 id="post-title">\{post\.title\}<\/h1>/);
  assert.doesNotMatch(postArticle, /<h3/);
});

test("keeps reflow, contrast preference, and forced-colors support", async () => {
  const styles = await source("app/globals.css");
  assert.match(styles, /@media \(max-width: 720px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /@media \(prefers-contrast: more\)/);
  assert.match(styles, /@media \(forced-colors: active\)/);
  assert.match(styles, /\.hero-visual__traveller \{\s*display: none;/);
});

test("keeps the animated hero decorative and motion-optional", async () => {
  const [page, visual, styles] = await Promise.all([
    source("app/page.tsx"),
    source("app/hero-visual.tsx"),
    source("app/globals.css"),
  ]);
  assert.match(page, /<HeroVisual \/>/);
  assert.match(visual, /className="hero-visual" aria-hidden="true"/);
  assert.match(visual, /focusable="false"/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.hero-visual__signal/);
});

test("keeps normal-text palette combinations above WCAG AA contrast (4.5:1)", async () => {
  const styles = await source("app/globals.css");
  const colors = Object.fromEntries(
    [...styles.matchAll(/--([a-z-]+): (#[0-9a-f]{6})/gi)].map((match) => [match[1], match[2]]),
  );
  for (const [foreground, background] of [
    ["ink", "paper"],
    ["muted", "paper"],
    ["ink", "white"],
    ["accent", "paper"],
    ["accent", "white"],
    ["white", "accent"],
    ["ink", "accent-wash"],
  ]) {
    assert.ok(
      contrast(colors[foreground], colors[background]) >= 4.5,
      `${foreground} on ${background} must meet 4.5:1 (got ${contrast(colors[foreground], colors[background]).toFixed(2)})`,
    );
  }
});

test("ships recovery pages with direct, keyboard-operable actions", async () => {
  const [errorPage, notFound] = await Promise.all([
    source("app/error.tsx"),
    source("app/not-found.tsx"),
  ]);
  assert.match(errorPage, /type="button" onClick=\{reset\}>/);
  assert.match(errorPage, /Return to Lab Notes/);
  assert.match(notFound, /Return to Lab Notes/);
});

test("keeps external links to third-party domains marked noreferrer", async () => {
  const postArticle = await source("app/post-article.tsx");
  const externalLinks = postArticle.match(/target="_blank"/g) ?? [];
  const noreferrer = postArticle.match(/target="_blank" rel="noreferrer"/g) ?? [];
  assert.ok(externalLinks.length >= 3);
  assert.equal(externalLinks.length, noreferrer.length);
});
