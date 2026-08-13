---
slug: foldings-edge-plddt-disorder
title: "AlphaFold tells you how confident it is. Sometimes it's confidently wrong — and that's predictable."
project: Folding's Edge
field: Biology
date: 2026-08-13
repo: https://github.com/lindgreendavid/foldings-edge
tool: https://foldings-edge-interactive.lindgreendavid.workers.dev
report: https://github.com/lindgreendavid/foldings-edge/blob/main/docs/research-report.md
---

## The question

AlphaFold2 predicts protein structures and, crucially, tells you how confident it is in each part of that prediction — a per-residue score called pLDDT. A 2023 PNAS paper by Alderson et al. showed that low pLDDT is a useful signal for genuinely disordered protein regions — floppy, unstructured stretches with no fixed shape — but that some disordered regions still get *confident* pLDDT scores, because they can "conditionally fold" into structure when they bind a partner. We asked: on a fresh, independently drawn sample of real, curated data, does that relationship hold — and specifically where does it break?

## What we actually did

We joined 387 real human proteins' curated disorder annotations from DisProt (a database built entirely on published experimental evidence, not other predictions) to their real AlphaFold DB confidence scores, residue by residue — 228,662 residues in total. No model training, no synthetic data: just a statistical test of a specific claim against real data.

## What we found

The overall signal is strong and unambiguous: residues inside curated disorder regions have a **43-point lower median pLDDT** than residues outside them (88.8 vs. 45.1), and that difference is essentially certain (p ≈ 0 on two independent tests). A simple "pLDDT below 70 means disordered" classifier catches most real disorder (76.5% recall) but is only a moderately reliable predictor overall (34.1% precision).

Here's where it gets specific and useful, not just a summary statistic: precision **collapses to 6.3%** — from a 31% baseline — specifically on regions flagged as capable of conditionally folding, and recall drops to just 35.1% on disorder evidenced by hydrogen-deuterium exchange mass spectrometry (a technique that detects partial, dynamic structure). Named individual proteins in our report show this concretely: some proteins get every single disordered residue wrong in one direction or the other. This is exactly the failure mode the original paper's theory predicts — regions that *can* fold, under the right conditions, confuse a tool that only sees one static snapshot.

## Try it yourself

The [interactive threshold explorer](https://foldings-edge-interactive.lindgreendavid.workers.dev/#classifier) lets you drag the pLDDT cutoff from 0 to 100 and watch precision, recall, F1, and the confusion matrix update live from the real data — split by whether a region can conditionally fold — with one click back to the actual preregistered threshold. The hero animation traces one specific named protein's real per-residue confidence scores as a wiggling chain: watch it go from calm (ordered) to visibly restless (disordered) at the exact residue where the real data says the transition happens.

## Learn more

- Alderson, Pritišanac, Kolarić, Moses & Forman-Kay (2023), *Systematic Identification of Conditionally Folded Intrinsically Disordered Regions by AlphaFold2*, PNAS 120(44) — the paper motivating this project.
- Jumper et al. (2021), *Highly Accurate Protein Structure Prediction with AlphaFold*, Nature — the original AlphaFold2 paper.
- [DisProt](https://disprot.org) — the curated, expert-annotated intrinsic disorder database used as ground truth here, CC BY 4.0.
- The [source code](https://github.com/lindgreendavid/foldings-edge) is MIT-licensed, including the fetch script that joins DisProt and AlphaFold DB from scratch.
