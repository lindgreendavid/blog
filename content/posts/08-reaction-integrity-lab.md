---
slug: reaction-integrity-lab-cleaning-leakage
title: "The same reaction benchmark scored 47% or 24%. The dataset definition changed."
project: Reaction Integrity Lab
field: Computational Chemistry / Machine Learning
date: 2026-08-14
repo: https://github.com/lindgreendavid/reaction-integrity-lab
tool: https://lindgreendavid.github.io/reaction-integrity-lab/
report: https://github.com/lindgreendavid/reaction-integrity-lab/blob/main/docs/research-report.md
---

**Current research status:** source, provenance, published-log, and released-data split audits are complete. Independent model-score reproduction remains pending, so every accuracy below is a published reference value—not a result we claim to have reproduced.

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

Before training any model, we downloaded the official version-4 condition split and verified both
files against their published MD5 checksums. We then audited the released rows, declared input keys,
and full condition records. This is a transparent known-result reproduction: the target values were
known when the protocol was written, and the frozen ±1 percentage-point rule is a verification
criterion, not a preregistration claim.

## What we found so far

The released reaction-string/delete-rare split contains 625,697 training rows and 65,445 test rows,
for exactly 691,142 records—the final count in the official cleaning log. We found zero test rows
whose exact declared reactant/product input key occurs in training, and zero exact full-record
duplicates across the split.

That is useful evidence for a narrow property: exact declared-key separation. It does **not** rule
out high chemical similarity, shared patent families, temporal leakage, or a model exploiting
dataset-specific regularities. The 65,445 test rows contain 65,350 unique exact input keys, so some
test inputs recur with different records. Empty fixed-width component slots are structural padding,
not generic chemical-data errors.

The published top-3 reference values are 31% versus 44% for trusted labels with rare values mapped
to “other”; 33% versus 47% for trusted labels with rare values deleted; 4% versus 21% for reaction
strings with rare values mapped; and 5% versus 24% for reaction strings with rare values deleted.
Those contrasts are the hypotheses to reproduce. They are not yet independent findings of this lab.

## Try it yourself

The [interactive accuracy-inflation microscope](https://lindgreendavid.github.io/reaction-integrity-lab/)
lets you cross the two dataset decisions, inspect all four published cells, and walk through the
cleaning pipeline one boundary at a time. It also keeps completed evidence visually separate from
the model runs that remain open.

## Learn more

- [Wigh et al. (2024), ORDerly](https://doi.org/10.1021/acs.jcim.4c00292) — the primary paper and benchmark claim.
- [ORDerly benchmark v4](https://doi.org/10.6084/m9.figshare.23298467.v4) — the versioned CC BY 4.0 files audited here.
- [Schwaller et al. (2021)](https://doi.org/10.1038/s42256-021-00338-1) — evidence that reaction benchmarks can contain structural bias.
- [Guo et al. (2025)](https://doi.org/10.1021/acscentsci.5c00055) — evidence that more realistic chemistry splits can be harder than ordinary reaction splits.
- [Machine-readable split audit](https://github.com/lindgreendavid/reaction-integrity-lab/blob/main/reports/v0.1-split-audit.json) — row counts, checksums, exact collisions, and stated boundaries.
