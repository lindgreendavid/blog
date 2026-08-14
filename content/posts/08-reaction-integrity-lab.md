---
slug: reaction-integrity-lab-cleaning-leakage
title: "The same reaction benchmark scored 68% or 36%. The dataset definition changed."
project: Reaction Integrity Lab
field: Computational Chemistry / Machine Learning
date: 2026-08-14
repo: https://github.com/lindgreendavid/reaction-integrity-lab
tool: https://lindgreendavid.github.io/reaction-integrity-lab/
report: https://github.com/lindgreendavid/reaction-integrity-lab/blob/main/docs/research-report.md
---

**Current research status:** product v1.0.0 completes the source, provenance, published-log,
released-data split, four-cell frequency-baseline, and prespecified product-similarity audits.
Neural-model accuracies remain published references because the exact checkpoint/prediction bundles
are not contained in the versioned public release.

## The question

When a model predicts reaction conditions, how much of its reported performance depends on what the
dataset calls an input, how rare conditions are treated, and whether matching reactions can cross
the train–test boundary? Reaction Integrity Lab asks whether ORDerly's four published benchmark
comparisons survive an exact, auditable reproduction.

## What we actually did

We froze a protocol around the primary ORDerly paper, its versioned Figshare data, official cleaning
configurations, and published logs. The four target cells cross two choices: trusted component labels
versus reaction-string role assignment, and deleting rare conditions versus mapping them to an
“other” class. The paper reports top-3 exact-match accuracy for both a frequency baseline and a
neural model.

Before training any model, we downloaded the official version-4 condition split and complete
version-3 four-variant supplement, verifying every artifact against its published MD5 checksum. We
then audited the released rows, declared input keys, full condition records, and the authors'
frequency-informed baseline. This is a transparent known-result reproduction: the target values
were known when the protocol was written, and the frozen ±1 percentage-point rule is a verification
criterion, not a preregistration claim.

## What we found

The released reaction-string/delete-rare split contains 625,697 training rows and 65,445 test rows,
for exactly 691,142 records—the final count in the official cleaning log. We found zero test rows
whose exact declared reactant/product input key occurs in training, and zero exact full-record
duplicates across the split.

That is useful evidence for a narrow property: exact declared-key separation. It does **not** rule
out high chemical similarity, shared patent families, temporal leakage, or a model exploiting
dataset-specific regularities. The 65,445 test rows contain 65,350 unique exact input keys, so some
test inputs recur with different records. Empty fixed-width component slots are structural padding,
not generic chemical-data errors.

The local top-3 complete-condition baselines are 51.57%, 52.22%, 19.55%, and 20.24%. Every cell is
within 0.46 percentage points of the final paper's rounded 52%, 52%, 20%, and 20%, satisfying the
prespecified tolerance. The corresponding published neural-model values are 67%, 68%, 35%, and
36%; those model cells are not yet independently reproduced.

This direct paper audit also corrected an important source discrepancy. The upstream repository
README still shows older 31/44, 33/47, 4/21, and 5/24 baseline/model pairs, while the final
peer-reviewed Table 3 reports the values above. The protocol records when and why the targets were
corrected, before any local model inspection.

The secondary audit then tested what exact-key separation misses. Canonical product identity occurs
in training for 3,784 of 65,444 valid test products (5.78%). Among 63,852 test rows with a nonempty
Bemis–Murcko product scaffold, 51,617 (80.84%) use a scaffold present in training. Every test row's
source-file category also occurs in training, although that field is not a verified patent-family
identifier.

In the prespecified 1,000-row sample, 60.5% of test products have maximum Morgan/Tanimoto
similarity ≥0.70 to a training product (Wilson 95% interval 57.44–63.48%); 30.0% reach ≥0.80 and
11.7% reach ≥0.90. These results show that exact reaction-key separation is not chemical novelty.
They do not prove unavailable-information leakage, model misconduct, or poor prospective wet-lab
performance.

## Try it yourself

The [interactive accuracy-inflation microscope](https://lindgreendavid.github.io/reaction-integrity-lab/)
lets you cross the two dataset decisions, compare each reproduced baseline with its published model
cell, vary the frozen similarity threshold, and walk through the cleaning pipeline one boundary at
a time. It keeps completed evidence separate from neural-model artifacts that remain unavailable.

## Learn more

- [Wigh et al. (2024), ORDerly](https://doi.org/10.1021/acs.jcim.4c00292) — the primary paper and benchmark claim.
- [ORDerly benchmark v4](https://doi.org/10.6084/m9.figshare.23298467.v4) — the versioned CC BY 4.0 files audited here.
- [Schwaller et al. (2021)](https://doi.org/10.1038/s42256-021-00338-1) — evidence that reaction benchmarks can contain structural bias.
- [Guo et al. (2025)](https://doi.org/10.1021/acscentsci.5c00055) — evidence that more realistic chemistry splits can be harder than ordinary reaction splits.
- [Machine-readable split audit](https://github.com/lindgreendavid/reaction-integrity-lab/blob/main/reports/v0.1-split-audit.json) — row counts, checksums, exact collisions, and stated boundaries.
- [Machine-readable baseline reproduction](https://github.com/lindgreendavid/reaction-integrity-lab/blob/main/reports/v0.2-baselines.json) — all four local cells, row counts, top combinations, and deviations from Table 3.
- [Machine-readable v1 similarity audit](https://github.com/lindgreendavid/reaction-integrity-lab/blob/main/reports/v1-similarity-audit.json) — complete identities, scaffolds, provenance, dates, sampled similarities, and Wilson intervals.
- [v1 release audit](https://github.com/lindgreendavid/reaction-integrity-lab/blob/main/docs/v1-release-audit.md) — completed evidence, neural-artifact decision, and remaining research.
