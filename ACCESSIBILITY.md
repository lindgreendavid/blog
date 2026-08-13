# Accessibility statement

Lab Notes is designed toward WCAG 2.2 Level AA. Accessibility is treated as a release
requirement, not an optional visual polish step. This statement covers the public site built
from `site/`.

## What is supported

- Semantic landmarks (`<nav>`, `<main>`, `<article>`, `<footer>`), a logical heading hierarchy
  (one `<h1>` per page, ordered `<h2>`s within it), a skip-to-content link, a descriptive page
  title per route, and visible keyboard focus (`:focus-visible`) throughout.
- Every navigation link and button has a minimum 44×44px touch/click target.
- `<html lang="en">` is set at the document root.
- Every post's tool/repo/report links open in a new tab with `rel="noreferrer"` and are labeled
  by their surrounding button text ("Open the interactive tool", "View the source code", "Read
  the full report"), not by URL alone.
- High-contrast (`prefers-contrast: more`) and forced-colors (`forced-colors: active`) support;
  reduced-motion support (`prefers-reduced-motion: reduce` disables the skip-link's slide
  transition and smooth scrolling — nothing on this site depends on motion for its meaning).
- Reflow down to a 320 CSS-pixel viewport; no fixed-width containers, no horizontal scroll at
  narrow widths.
- No autoplay of audio/video, no flashing content, no time limits, no authentication walls, no
  user file uploads.
- Long-form reading typography: a serif reading face, an 18px base size, 1.65 line-height, and a
  bounded measure (`max-width: 40em`) on every paragraph and list, so body text stays within a
  comfortable reading-line length at any viewport width.
- The research-track filters and project selector use native buttons with visible text and
  `aria-pressed`; the selected study's question, evidence, finding, and boundary update inside an
  `aria-live="polite"` region. Category and selection are never communicated by color alone.

## Verification

Every change passes semantic HTML assertions and `eslint-plugin-jsx-a11y`, plus a dedicated
contrast test (`site/tests/accessibility-contract.test.mjs`) that computes WCAG relative
luminance and contrast ratios for every foreground/background color pair used in the stylesheet
and fails the build if any required pair falls below 4.5:1. `site/tests/rendered-html.test.mjs`
additionally asserts that the skip link, main landmark, and every post's resource links are
actually present in the server-rendered HTML for every route, not just in source. Automated
checks cannot prove accessibility or compatibility with every assistive-technology combination.

## Known limitations

- The interface and content are currently in English only.
- Mathematical/statistical notation that appears in post prose (p-values, confidence intervals)
  is expressed as plain text/Unicode rather than MathML, matching how it appears in the source
  content files.
- This site has an interactive research navigator but no standalone statistical chart of its own;
  the underlying laboratories it links to provide their own accessible data tables and
  accessibility statements.

## Feedback

Open an accessibility issue at https://github.com/lindgreendavid/blog/issues/new and include the
page, browser, assistive technology, and expected behavior when possible.

## Standard

The target is the W3C Web Content Accessibility Guidelines 2.2 Level AA:
https://www.w3.org/TR/WCAG22/. Conformance language is intentionally bounded: this is an
engineering statement and testing record, not a third-party accessibility certification.
