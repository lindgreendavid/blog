---
slug: neural-geometry-lab-collapse
title: "A neural network's geometry kept changing after perfect training accuracy. Did that make it generalize?"
project: Neural Geometry Lab
field: Machine Learning / Representation Geometry
date: 2026-08-14
repo: https://github.com/lindgreendavid/neural-geometry-lab
tool: https://lindgreendavid.github.io/neural-geometry-lab/
report: https://github.com/lindgreendavid/neural-geometry-lab/blob/main/reports/research-report-v1.0.md
---

**Current research status:** stable product v1.0.0; protocol-frozen computational replication and
stress test on one official writer-disjoint dataset. The study supports two of four prespecified
directional gates. It does not claim that neural collapse causes, guarantees, or is necessary for
generalization.

## What happens after the network already fits everything?

A classifier can reach zero training error before optimization ends. In many deep-learning
experiments, its internal representation then keeps reorganizing: examples from the same class
cluster more tightly, class centres approach a symmetric simplex, classifier weights align with
those centres, and the learned decision agrees with nearest-centre classification. Papyan, Han,
and Donoho named these linked observations **neural collapse**, or NC1–NC4.

The geometry is striking, but an important distinction follows. A regularity observed during
training is not automatically a general-purpose explanation of why a model succeeds on unseen
data. Recent theory connects collapse and generalization under specific assumptions, while other
experiments show that generalization can occur without neural collapse. We therefore asked a
bounded question: **after interpolation, do the four classical diagnostics keep improving in a
small neural classifier, and does stronger collapse consistently accompany better performance on
writers the model never saw?**

## A split that tests different people, not shuffled handwriting

We used the official UCI Optical Recognition of Handwritten Digits files. Each record contains 64
integer pixel-block counts from an 8 × 8 image and one digit label. The provider's fixed training
set has 3,823 examples from 30 writers; its test set has 1,797 examples from a different 13 writers.
We preserved that writer-disjoint split. The test set never influenced condition construction,
training, stopping, or model selection.

The neural classifier was a deliberately inspectable `64 → 64 → 9 → 10` ReLU network trained for
exactly 600 epochs. The nine-dimensional penultimate layer can represent the ideal centred simplex
for ten classes. Ten fixed seeds were run under each of three training conditions:

- the complete clean training set;
- a deterministic long-tail sample of 1,559 rows, declining from 376 examples of digit 0 to 38 of digit 9;
- exactly 20% symmetric label noise within each class, changing 761 training labels.

An L2-regularized multinomial logistic regression supplied a linear predictive reference. It has no
learned penultimate representation, so the study does not manufacture NC1–NC4 values for it.

## Four measurements, four frozen decisions

The protocol fixed the endpoints before the digit records were retrieved or any result inspected:

- **NC1** compares within-class feature variability with between-class variability;
- **NC2** measures how far normalized class centres are from the balanced ten-class simplex;
- **NC3** measures misalignment between classifier weights and centred class means;
- **NC4** measures disagreement between the network and nearest-class-centre decisions.

Lower is more collapsed for every diagnostic. A clean after-interpolation gate passed only when at
least eight of ten seeds improved NC1, improved NC2, or did not worsen NC4. A separate imbalance
gate required long-tail NC2 to be worse than paired clean NC2 in at least eight of ten seeds.
These are prespecified robustness criteria, not population-level hypothesis tests.

## Two gates passed and two did not

Every clean and long-tail run reached zero observed-label training error. The first clean zero-error
epoch occurred between epochs 117 and 216. After that point:

- NC1 improved in **7/10** clean seeds, below the frozen 8/10 gate;
- NC2 improved in **7/10**, also below the gate;
- NC4 was no worse in **10/10**, passing its gate;
- long-tail NC2 was worse than clean NC2 in **10/10** paired seeds, passing the imbalance gate.

Clean MLP held-out accuracy had a median of **96.27%**, ranging from 95.88% to 96.94%. The long-tail
median was **92.29%**, and the 20%-noise median was **81.64%**. Across all 30 MLP runs, the descriptive
Spearman association between final NC1 and test accuracy was **−0.518**; for NC2 it was **−0.026**.
No population p-values are attached to these correlations because model seeds are not independent
people, tasks, or datasets.

## The revealing counterexample

The noisy-label condition generalized much worse than clean training, yet its median NC2 was
slightly lower: 0.9868 rather than 1.0077. At the same time, its median NC1 rose from 0.2594 to
1.2532. One coordinate looked marginally more ideal while the within-class structure and held-out
performance became much worse.

That observation does not refute neural collapse. NC1–NC4 describe different geometric relations,
and the classical theory never licenses treating an isolated coordinate as a universal score.
What the result rejects is the shortcut: **closer to the simplex on one diagnostic does not by
itself certify a representation, a model, or its generalization.**

The linear reference reinforces the need for a bounded interpretation. Logistic regression reached
94.77% on clean data, 91.88% on the long tail, and 93.60% under label noise. In this exact
fixed-capacity comparison it resisted the corrupted labels better than the 600-epoch MLP. That is not a
universal result that linear classifiers are more robust; it belongs to these data, models, and
training choices.

## See the geometry without mistaking the picture for the metric

The [interactive Geometry Theatre](https://lindgreendavid.github.io/neural-geometry-lab/) replays
actual saved checkpoints from seed 1001. You can switch among clean, long-tail, and noisy training;
scrub from initialization to epoch 600; distinguish train and unseen-writer points; expose errors;
inspect class-centre angles; and follow NC1–NC4 and accuracy through time.

The two-dimensional scene uses one fixed PCA basis for all displayed checkpoints within a condition.
That prevents the camera from rotating independently at each epoch, but PCA can still distort
distance and angle. The visual is an evidence interface, not the statistical endpoint. Every
reported neural-collapse value is calculated in the full nine-dimensional hidden representation,
and the interface says so directly.

## Stop at the boundary

- One compact tabular image dataset, writer split, MLP architecture, optimizer, and linear reference were studied.
- Ten seeds measure algorithmic sensitivity on one fixed dataset; they do not establish external population uncertainty.
- The balanced simplex remains the NC2 target under long-tail sampling by design. It does not model an imbalance-specific optimum.
- Symmetric label corruption is a controlled stressor, not natural annotator disagreement or a realistic distribution shift.
- The study does not address convolutional networks, transformers, foundation models, human cognition, or deployed AI systems.
- It tests association and reproducibility. It cannot show that collapse causes generalization.

## Inspect and reproduce

- [UCI Optical Digits](https://doi.org/10.24432/C50P49) — official data source and writer-disjoint split.
- [Papyan, Han & Donoho (2020)](https://doi.org/10.1073/pnas.2015509117) — original NC1–NC4 formulation.
- [Dang et al. (2024)](https://proceedings.mlr.press/v235/dang24a.html) — class imbalance and neural-collapse geometry.
- [Wu & Mondelli (2025)](https://proceedings.mlr.press/v267/wu25u.html) — regime-specific collapse and generalization theory.
- [Han et al. (2025)](https://openreview.net/forum?id=lbtOctHDQ3) — counterevidence to collapse as a necessary condition for generalization.
- [Frozen protocol](https://github.com/lindgreendavid/neural-geometry-lab/blob/main/docs/protocol-v1.0.md) — models, conditions, endpoints, gates, and claim boundary.
- [Machine-readable result](https://github.com/lindgreendavid/neural-geometry-lab/blob/main/reports/results-v1.0.json) — all seed-level outcomes and decisions.
- [v1 release audit](https://github.com/lindgreendavid/neural-geometry-lab/blob/main/docs/v1-release-audit.md) — source checks, reproduction actions, numerical note, and remaining limits.
- [v1.0.0 release](https://github.com/lindgreendavid/neural-geometry-lab/releases/tag/v1.0.0) — immutable public research-product identity.
