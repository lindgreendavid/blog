import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const posts = [
  {
    route: "/posts/fairshift-lab-robustness",
    title: "A model that looks fair can quietly stop being fair",
    project: "Fairshift Lab",
    tool: "https://fairshift-lab.lindgreendavid.chatgpt.site",
    repo: "https://github.com/lindgreendavid/fairshift-lab",
    report: "https://github.com/lindgreendavid/fairshift-lab/blob/main/docs/robustness-report.md",
  },
  {
    route: "/posts/three-body-lab-chaos-boundary",
    title: "The three-body problem can",
    project: "Three-Body Lab",
    tool: "https://three-body-lab-interactive.lindgreendavid.workers.dev",
    repo: "https://github.com/lindgreendavid/three-body-lab",
    report: "https://github.com/lindgreendavid/three-body-lab/blob/main/docs/research-report.md",
  },
  {
    route: "/posts/frb-atlas-dispersion-measure",
    title: "We tried to replicate a real astrophysics paper",
    project: "FRB Atlas",
    tool: "https://frb-atlas-interactive.lindgreendavid.workers.dev",
    repo: "https://github.com/lindgreendavid/frb-atlas",
    report: "https://github.com/lindgreendavid/frb-atlas/blob/main/docs/research-report.md",
  },
  {
    route: "/posts/foldings-edge-plddt-disorder",
    title: "AlphaFold tells you how confident it is",
    project: "Folding&#x27;s Edge",
    tool: "https://foldings-edge-interactive.lindgreendavid.workers.dev",
    repo: "https://github.com/lindgreendavid/foldings-edge",
    report: "https://github.com/lindgreendavid/foldings-edge/blob/main/docs/research-report.md",
  },
  {
    route: "/posts/climate-twin-frankfurt-heat-island",
    title: "Is Frankfurt actually warmer than the countryside around it",
    project: "Climate Twin Frankfurt",
    tool: "https://climate-twin-frankfurt-interactive.lindgreendavid.workers.dev",
    repo: "https://github.com/lindgreendavid/climate-twin-frankfurt",
    report: "https://github.com/lindgreendavid/climate-twin-frankfurt/blob/main/docs/research-report.md",
  },
];

test("server-renders the home page listing all five posts", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>David Lindgreen — Lab Notes/);
  assert.match(html, /What this is/);
  assert.match(html, /Why this exists/);
  assert.match(html, /Explore further/);
  assert.match(html, /Five questions\. Five inspectable answers\./);
  assert.match(html, /How to read a scientific result/);
  assert.match(html, /Read uncertainty first/);
  assert.match(html, /Filter projects by research track/);
  assert.match(html, /Full portfolio/);
  assert.match(html, /Researched roadmap/);
  assert.match(html, /Skip to main content/);
  for (const post of posts) {
    assert.match(html, new RegExp(`href="/posts/${post.route.split("/posts/")[1]}"`));
    assert.match(html, new RegExp(post.project.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("server-renders each post at its own route with unmodified frontmatter links", async () => {
  for (const post of posts) {
    const response = await render(post.route);
    assert.equal(response.status, 200, `${post.route} should return 200`);
    const html = await response.text();
    assert.match(html, new RegExp(post.title), `${post.route} should render its title`);
    assert.match(html, new RegExp(`href="${post.tool.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(html, new RegExp(`href="${post.repo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(html, new RegExp(`href="${post.report.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(html, /Open the interactive tool/);
    assert.match(html, /View the source code/);
    assert.match(html, /Read the full report/);
    assert.match(html, /Skip to main content/);
  }
});

test("returns the not-found page for an unknown route", async () => {
  const response = await render("/posts/does-not-exist");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /This page does not exist/);
});

test("keeps content-data.ts in sync with content/*.md (no drift, no rewriting)", async () => {
  const [contentData, indexSource, ...postSources] = await Promise.all([
    readFile(new URL("app/content-data.ts", root), "utf8"),
    readFile(new URL("../content/00-index.md", root), "utf8"),
    readFile(new URL("../content/posts/01-fairshift-lab.md", root), "utf8"),
    readFile(new URL("../content/posts/02-three-body-lab.md", root), "utf8"),
    readFile(new URL("../content/posts/03-frb-atlas.md", root), "utf8"),
    readFile(new URL("../content/posts/04-foldings-edge.md", root), "utf8"),
    readFile(new URL("../content/posts/05-climate-twin-frankfurt.md", root), "utf8"),
  ]);

  function bodyOf(raw) {
    return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").trim();
  }

  assert.ok(
    contentData.includes(bodyOf(indexSource)),
    "content-data.ts must contain content/00-index.md's body verbatim",
  );
  for (const postSource of postSources) {
    assert.ok(
      contentData.includes(bodyOf(postSource)),
      "content-data.ts must contain every post's body verbatim",
    );
  }
});
