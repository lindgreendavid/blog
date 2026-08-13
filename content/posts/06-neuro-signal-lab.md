---
slug: neuro-signal-lab-p3b-robustness
title: "A classic brain response survived a new dataset. Here is exactly what that means."
project: Neuro Signal Lab
field: Neuroscience
date: 2026-08-13
repo: https://github.com/lindgreendavid/neuro-signal-lab
tool: https://lindgreendavid.github.io/neuro-signal-lab/
report: https://github.com/lindgreendavid/neuro-signal-lab/blob/main/docs/research-report.md
---

**Stable release:** [Neuro Signal Lab v1.0.0](https://github.com/lindgreendavid/neuro-signal-lab/releases/tag/v1.0.0). The product is stable; its frozen endpoint, exclusions, confirmatory result, and sensitivity analyses remain unchanged and reproducible.

## The question

When a rare, task-relevant stimulus appears among frequent standard stimuli, EEG recordings often
show a positive posterior voltage deflection called the P3 or P3b. It is one of cognitive
neuroscience's best-known event-related potentials. But a familiar effect is not automatically a
portable measurement. We asked a narrower question: if the electrode, time window, contrast,
artifact rule, and participant-level analysis are fixed in advance from a public reference
protocol, does the target enhancement remain visible in an independently hosted auditory dataset?

## What we actually did

ERP CORE supplied the literature-anchored endpoint: mean voltage at electrode Pz from 300 to 600
milliseconds after stimulus onset. Before inspecting the external amplitudes, we froze that
electrode, window, target-minus-standard direction, 150 µV peak-to-peak artifact threshold,
participant-level unit of inference, and stopping rule. We then applied the endpoint to OpenNeuro
dataset ds003061 version 1.1.0, an active auditory three-stimulus oddball task.

The pipeline checksum-verifies the public EEG files and keeps raw data out of the repository. One
truncated run failed a prespecified metadata rule and was excluded; that participant remained in
the study through two eligible runs. The final analysis used 38 runs from 13 participants, with
3,606 accepted target epochs and 19,481 accepted standard epochs. Trials were pooled within each
person. They were never treated as thousands of independent people.

## What we found

Every one of the 13 participants had a positive target-minus-standard contrast. The participant-
level mean was **+5.65 µV**, with a 95% confidence interval from **+4.83 to +6.48 µV**. The
contrasts ranged from +3.22 to +8.72 µV; the result was therefore not created by one extreme
participant.

Two prespecified artifact-threshold checks reached the same substantive conclusion. At 100 µV the
mean contrast was +5.83 µV; at 200 µV it was +5.74 µV. Both confidence intervals excluded zero.
Changing the threshold within that declared range did not decide whether the effect existed.

This is strong evidence for a narrow result: the fixed posterior target enhancement survived a
change of dataset, stimulus modality, and several paradigm details. We describe it as a
**cross-paradigm robustness confirmation**, not a literal direct replication. ERP CORE used a
visual oddball task; the external dataset used an auditory task. The result does not prove that the
two paradigms engage identical processes, identify one unique brain generator, read anyone's mind,
or establish a diagnostic tool.

## Try it yourself

The [interactive Neuro Signal Lab](https://lindgreendavid.github.io/neuro-signal-lab/) shows every
participant contrast rather than only the group mean. Sort the participants, switch among the
100, 150, and 200 µV analyses, and watch the mean and confidence interval update. The fixed 150 µV
endpoint remains explicitly labelled so an exploratory click cannot silently rewrite the
confirmatory analysis. The waveform shape in the introduction is labelled as an illustration,
because this repository does not publish an aggregate time series and the interface will not
pretend that a drawing is measured data.

## Learn more

- Kappenman et al. (2021), *ERP CORE: An open resource for human event-related potential research*, NeuroImage 225, 117465 — the reference protocol that fixed the measurement.
- Delorme, *EEG data from an auditory oddball task*, OpenNeuro ds003061 version 1.1.0 — the independent public dataset.
- Pernet et al. (2019), *EEG-BIDS, an extension to the brain imaging data structure for electroencephalography*, Scientific Data 6, 103 — the data-organization standard used by the dataset.
- The [source code](https://github.com/lindgreendavid/neuro-signal-lab), [frozen protocol](https://github.com/lindgreendavid/neuro-signal-lab/blob/main/docs/protocol.md), and [machine-readable result](https://github.com/lindgreendavid/neuro-signal-lab/blob/main/results/summary.json) disclose the full path from public data to every number above.
