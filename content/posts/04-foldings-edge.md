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

**Stable release:** [Folding’s Edge v1.0.0](https://github.com/lindgreendavid/foldings-edge/releases/tag/v1.0.0). The product is stable; the preregistered v0.1 analysis and committed evidence snapshot remain unchanged and reproducible.

## The question

AlphaFold2 predicts protein structures and, crucially, tells you how confident it is in each part of that prediction — a per-residue score called pLDDT. A 2023 PNAS paper by Alderson et al. showed that low pLDDT is a useful signal for genuinely disordered protein regions — floppy, unstructured stretches with no fixed shape — but that some disordered regions still get *confident* pLDDT scores, because they can "conditionally fold" into structure when they bind a partner. We asked: on a fresh, independently drawn sample of real, curated data, does that relationship hold — and specifically where does it break?

## What we actually did

We joined 387 real human proteins' curated disorder annotations from DisProt (a database built entirely on published experimental evidence, not other predictions) to their real AlphaFold DB confidence scores, residue by residue — 228,662 residues in total. No model training, no synthetic data: just a statistical test of a specific claim against real data.

## What we found

The pooled-residue signal is large: residues inside curated disorder regions have a **43-point lower median pLDDT** than residues outside them (88.8 vs. 45.1). Because residues within a protein are not independent, we also checked the result at the protein level: across 372 proteins containing both groups, the median within-protein gap is 36.47 points (protein-cluster bootstrap 95% CI 34.29–40.07). A simple "pLDDT below 70 predicts a DisProt disorder annotation" classifier catches 76.5% of annotated disorder but has 34.1% precision; protein-cluster resampling gives wider, more realistic uncertainty without changing that moderate-performance interpretation.

Here's where it gets specific: precision is 6.3% in the protein-level conditional-folding proxy subgroup, and recall is 35.1% for HDX-MS-supported annotations. Those are exploratory associations, not causal explanations: the groups also differ in protein composition, region length, overlapping evidence, and curation. They are compatible with conditional or residual structure affecting pLDDT, but this project does not isolate that mechanism. Named proteins in the report make the misclassifications inspectable rather than turning the subgroup pattern into a stronger claim than the design supports.

## Try it yourself

The [interactive threshold explorer](https://foldings-edge-interactive.lindgreendavid.workers.dev/#classifier) lets you drag the pLDDT cutoff from 0 to 100 and watch precision, recall, F1, and the confusion matrix update live from the real data — split by whether a region can conditionally fold — with one click back to the actual preregistered threshold. The hero animation traces one specific named protein's real per-residue confidence scores as a wiggling chain: watch it go from calm (ordered) to visibly restless (disordered) at the exact residue where the real data says the transition happens.

## Learn more

- Alderson, Pritišanac, Kolarić, Moses & Forman-Kay (2023), *Systematic Identification of Conditionally Folded Intrinsically Disordered Regions by AlphaFold2*, PNAS 120(44) — the paper motivating this project.
- Jumper et al. (2021), *Highly Accurate Protein Structure Prediction with AlphaFold*, Nature — the original AlphaFold2 paper.
- [DisProt](https://disprot.org) — the curated, expert-annotated intrinsic disorder database used as the reference label here, CC BY 4.0.
- The [source code](https://github.com/lindgreendavid/foldings-edge) is MIT-licensed, including the fetch script that joins DisProt and AlphaFold DB from scratch.
