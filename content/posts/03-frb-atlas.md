---
slug: frb-atlas-dispersion-measure
title: "We tried to replicate a real astrophysics paper. It didn't fully replicate — and that's the finding."
project: FRB Atlas
field: Astrophysics
date: 2026-08-13
repo: https://github.com/lindgreendavid/frb-atlas
tool: https://frb-atlas-interactive.lindgreendavid.workers.dev
report: https://github.com/lindgreendavid/frb-atlas/blob/main/docs/research-report.md
---

**Stable release:** [FRB Atlas v1.0.0](https://github.com/lindgreendavid/frb-atlas/releases/tag/v1.0.0). The product is stable; the preregistered v0.1 catalog analysis remains unchanged and reproducible.

## The question

Fast radio bursts (FRBs) are millisecond-long flashes of radio energy from deep space. Some sources burst once; others repeat. The CHIME/FRB Collaboration's landmark 2021 catalog paper concluded that repeating and non-repeating bursts show *statistically indistinguishable* dispersion measures (a proxy for how much intervening gas the signal passed through), while differing clearly in pulse width and spectral bandwidth. We asked a simple question: using the same real, public 536-burst catalog, does that specific claim actually replicate?

## What we actually did

We downloaded the real CHIME/FRB Catalog 1 data (verified against the paper's own reported counts: 536 bursts, 62 from 18 repeaters), preregistered our statistical tests before looking at results, and ran the same comparison the paper describes — first for pulse width and bandwidth (where the paper reports a real difference), then for dispersion measure (where it reports none).

## What we found

The width and bandwidth directions were recovered, which is a useful positive control but not proof that every dispersion-measure choice matches the paper. Our preregistered burst-level DM test differed from the paper's source-level conclusion (p ≈ 2×10⁻¹⁰).

Rather than stopping there, we investigated *why*, as a disclosed, clearly-labeled follow-up (not part of the original preregistration). The answer: our 59-burst repeater sample was dominated by just two exceptionally prolific, nearby, low-dispersion repeating sources — they alone supplied 90% of the repeater bursts. When we reproduced the original paper's own method of using only each source's *first-detected* burst (reducing pseudo-replication from prolific repeaters), the discrepancy mostly, though not completely, resolved.

This is what honest science communication is supposed to look like: not "the paper was wrong" and not "we replicated everything perfectly," but a specific, traceable, disclosed reason why two careful analyses of the same real data can disagree.

Later CHIME/FRB evidence adds an important boundary: a 2023 source-level study of 25 newly discovered repeaters also found lower mean DM and extragalactic DM for repeaters, while stressing sensitivity and exposure effects. That supports a sample-dependent contrast, not the burst-level p-value by itself and not a settled claim that repeaters and apparent non-repeaters are distinct physical populations.

## Try it yourself

The [interactive comparison](https://frb-atlas-interactive.lindgreendavid.workers.dev/#dm) lets you see both distributions overlaid, with every statistic — KS test, Anderson-Darling, bootstrap confidence intervals — shown before any "significant or not" conclusion.

## Learn more

- CHIME/FRB Collaboration, Amiri et al. (2021), *The First CHIME/FRB Fast Radio Burst Catalog*, The Astrophysical Journal Supplement Series, 257, 59 — the paper this project tests.
- CHIME/FRB Collaboration (2023), *CHIME/FRB Discovery of 25 Repeating Fast Radio Burst Sources*, The Astrophysical Journal 947, 83 — later source-level evidence and its selection-effect boundary.
- The real catalog data is hosted by [VizieR](https://vizier.cds.unistra.fr), the standard astronomical catalog archive — the same source this project used.
- The [source code](https://github.com/lindgreendavid/frb-atlas) is MIT-licensed and includes the fetch script that re-downloads and re-verifies the real data from scratch.
