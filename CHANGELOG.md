# Changelog

## Unreleased

- Promoted the Jovian Resonance Lab article, explorer, and evidence record to v1.0.0 with the
  protocol-frozen 2031–2040 replication, passed convergence gates, release links, and explicit
  future-ephemeris boundary while preserving the historical v0.1 result.
- Expanded Mathlab WASM to v0.2.0 with a prespecified safeguarded solver, bracket and step-kind
  traces, five new frozen cases, and a transparent post-result amendment for platform-libm
  last-bit reproducibility.
- Added Mathlab WASM v0.1.0: a frozen seven-case Rust/WebAssembly verification of bisection,
  Newton, and secant convergence and failure modes, with an article, explorer entry, evidence
  record, and explicit non-representativeness boundary.
- Promoted Reaction Integrity Lab to product v1.0.0 with the prespecified product-identity,
  scaffold, source-provenance, grant-date, and sampled Morgan/Tanimoto audit; added explicit
  uncertainty and the neural-model artifact boundary.
- Established Reaction Integrity Lab v0.2.0 across the article, interactive research explorer, and
  academic evidence index: all four frequency baselines now reproduce within 0.46 percentage
  points, while neural-model scores remain clearly labelled as published references.
- Corrected the portfolio-wide methods statement so known-result reproductions are not described
  as blinded or preregistered studies.
- Added an interactive academic Evidence Index linking each project to its primary, supporting,
  limiting, and methodological sources; public dataset; research report; and reproducibility
  artifact.
- Updated the FRB Atlas article for the analysis-unit sensitivity explorer and corrected the
  Observatory explorer count to two same-day prospective runs.

All notable changes to this project are documented here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Fixed

- Correct the Three-Body Lab mass boundary and Poincaré/Sundman framing; replace pooled-residue
  certainty in Folding's Edge with protein-cluster sensitivity; add serial-correlation-robust
  Climate Twin uncertainty; and synchronize FRB, P3b and Observatory evidence boundaries with
  primary literature and the current evidence index.

### Added

- A responsive, code-native research-cycle animation in the home-page hero that uses the formerly
  empty desktop column, scales into the mobile reading flow, and becomes static when reduced motion
  is requested.

- An interactive research explorer that filters the five projects by portfolio track and exposes
  each study's question, evidence, finding, and principal boundary before linking to the article
  and live laboratory.
- A four-step study guide — bounded question, evidence, uncertainty, boundary — that turns the
  portfolio's shared research discipline into a reusable way to read scientific claims.
- Focused home-page navigation for Explore, Study guide, and Articles, replacing the crowded
  per-project navigation row while keeping every article directly discoverable on the home page.
- `site/`: an accessible, editorial vinext (Next.js App Router) site deployed to Cloudflare
  Workers as `blog-interactive`, matching the toolchain used across this portfolio
  (`fairshift-lab`, `three-body-lab`, `frb-atlas`, `foldings-edge`, `climate-twin-frankfurt`).
- A home page (`site/app/page.tsx`) rendering `content/00-index.md`'s "What this is" and "Why
  this exists" sections verbatim, a generated list of all five posts (title, field, one-line
  navigation teaser, link), and the "Explore further" links, also verbatim.
- Five post routes, one per project, at `/posts/<slug>` using each post's frontmatter `slug`:
  `fairshift-lab-robustness`, `three-body-lab-chaos-boundary`, `frb-atlas-dispersion-measure`,
  `foldings-edge-plddt-disorder`, `climate-twin-frankfurt-heat-island`. Each post page renders
  `content/posts/*.md`'s body verbatim and links prominently to that project's `tool`, `repo`,
  and `report` URLs exactly as given in its frontmatter.
- `site/scripts/sync-content.mjs`: regenerates `site/app/content-data.ts` from `content/*.md`,
  copying bytes only (no rewriting), so the Cloudflare Worker can bundle the content at build
  time instead of reading the filesystem at request time.
- `site/app/lib/markdown.tsx`: a small, purpose-built markdown-to-JSX renderer supporting the
  exact subset of markdown the five posts use (`##` headings, `- ` lists, `**bold**`,
  `*italic*`, `[text](url)` links) — no third-party markdown/MDX dependency.
- A distinct editorial color palette (warm ivory paper, near-black ink, deep burgundy accent) and
  a serif reading typeface, WCAG AA contrast-verified — not shared with any sibling project's
  palette.
- Full repository hygiene: `ACCESSIBILITY.md` and CI workflows (`ci.yml`, `codeql.yml`).
  `CITATION.cff` was intentionally not added — see the note in this project's build report; this
  is a blog indexing five already-citable research projects, not itself a research artifact.

### Changed

- A shared centered page shell now aligns the hero, editorial sections, evidence explorer, study
  guide, and article grid consistently on wide screens without changing their mobile reflow.

## [Initial content]

- `content/00-index.md` and `content/posts/*.md`: the five fact-checked, human-approved post
  write-ups and the home page framing copy this site renders.
