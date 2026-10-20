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
  assert.match(layout, /<html lang="en"/);
  for (const file of [page, postArticle]) {
    assert.match(file, /className="skip-link" href="#main-content"/);
    assert.match(file, /<main id="main-content">/);
    assert.match(file, /<SiteNav \/>/);
    assert.match(file, /<SiteFooter \/>/);
  }
  assert.match(page, /<h1 id="site-title">/);
  assert.match(styles, /:focus-visible \{ outline: 2px solid/);
  assert.match(styles, /\.nav__links a \{ display: inline-flex; min-height: 44px/);
});

test("keeps navigation semantic and every nav item reachable", async () => {
  const nav = await source("app/site-nav.tsx");
  assert.match(nav, /<nav className="nav" aria-label="Primary navigation">/);
  for (const target of ["#featured", "#notes", "#evidence-index", "#study"]) {
    assert.ok(nav.includes(`href="/${target}"`), target);
  }
  assert.match(nav, /<ThemeToggle \/>/);
});

test("keeps reflow, contrast preference, reduced motion and no third-party requests", async () => {
  const [styles, layout] = await Promise.all([source("app/globals.css"), source("app/layout.tsx")]);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /@media \(prefers-contrast: more\)/);
  assert.match(styles, /@media \(max-width: 860px\)/);
  assert.doesNotMatch(styles, /url\(["']?https?:/);
  assert.doesNotMatch(layout, /next\/font\/google/);
  assert.match(layout, /\/fonts\/geist-latin-wght-normal\.woff2/);
});

test("keeps normal-text palette combinations above WCAG AA contrast in both themes", async () => {
  const styles = await source("app/globals.css");
  const read = (block) =>
    Object.fromEntries(
      [...block.matchAll(/--([a-z0-9-]+): (#[0-9a-f]{6})/gi)].map((match) => [match[1], match[2]]),
    );
  const darkStart = styles.indexOf(':root[data-theme="dark"]');
  const light = read(styles.slice(0, darkStart));
  const dark = { ...light, ...read(styles.slice(darkStart, styles.indexOf("}", darkStart))) };
  for (const [name, colors] of [
    ["light", light],
    ["dark", dark],
  ]) {
    for (const [foreground, background] of [
      ["ink", "ground"],
      ["ink-2", "ground"],
      ["ink-3", "ground"],
      ["ink-3", "panel"],
      ["ink-3", "tone"],
      ["accent", "ground"],
      ["accent", "panel"],
      ["on-ink", "ink"],
      ["on-ink-2", "ink"],
    ]) {
      assert.ok(
        contrast(colors[foreground], colors[background]) >= 4.5,
        `${name}: ${foreground} on ${background} must meet 4.5:1`,
      );
    }
  }
});

test("keeps the catalogue honest: three kinds, statuses and a unique featured set", async () => {
  const catalog = await source("app/catalog.ts");
  assert.match(catalog, /kind: "release"/);
  assert.match(catalog, /kind: "experiment"/);
  assert.match(catalog, /kind: "proposed"/);
  const featured = [...catalog.matchAll(/^ {2}"([a-z0-9-]+)",$/gm)].map((match) => match[1]);
  assert.equal(featured.length, 3);
  assert.equal(new Set(featured).size, 3);
  assert.doesNotMatch(catalog, /kind: "release", status: "Proposed"/);
});

test("ships recovery pages with direct, keyboard-operable actions", async () => {
  const [errorPage, notFound] = await Promise.all([source("app/error.tsx"), source("app/not-found.tsx")]);
  assert.match(errorPage, /type="button"/);
  assert.match(notFound, /href=/);
});
