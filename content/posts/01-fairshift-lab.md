---
slug: fairshift-lab-robustness
title: "A model that looks fair can quietly stop being fair. Here's how to catch it."
project: Fairshift Lab
field: Responsible AI
date: 2026-08-13
repo: https://github.com/lindgreendavid/fairshift-lab
tool: https://fairshift-lab.lindgreendavid.chatgpt.site
report: https://github.com/lindgreendavid/fairshift-lab/blob/main/docs/robustness-report.md
---

## The question

A machine learning model is trained, tested, and its group-fairness numbers look fine. Then it's deployed. Does that fairness measurement survive contact with the real world — label noise, a mismeasured protected attribute, a subgroup nobody thought to check, a smaller-than-expected sample? Or does "fair on the test set" quietly stop meaning anything the moment reality gets messy?

## What we actually did

Fairshift Lab is a synthetic laboratory — every number in it comes from a generator whose structural equation is written down and shown, not a black box. Version 1.3.0 added a **Robustness Lab**: two inspectable model families (logistic regression and a shallow decision tree), fixed *before* any results were generated, stress-tested under six controlled conditions — symmetric label noise, group-conditional label noise, protected-field measurement error, an unobserved intersectional subgroup, sample-size stress, and structural misspecification. Every hypothesis was written down in a preregistered protocol before a single result existed.

## What we found

Nothing about this was a clean story, and that's the point:

- Both models degrade under stress, but **not the same way on the same metric**. A model family that holds up better on accuracy can degrade worse on fairness, and vice versa — there's no universal "more robust" model here.
- **Group-conditional label noise** — where one group's labels get flipped more often than another's — produced a real, measurable fairness gap that had nothing to do with the model's actual behavior toward that group. The unfairness was manufactured entirely by the label noise, not the model.
- A protected attribute measured with error made the *observed* fairness gap understate the *true* one — an audit using the recorded (noisy) attribute would have looked more reassuring than reality.

None of this says "AI fairness is fake" or "don't measure it." It says the opposite: a single fairness number, measured once, under clean conditions, is not evidence that fairness survives deployment. You have to stress-test it the same way you'd stress-test any other safety-critical measurement.

## Try it yourself

The [Robustness Lab](https://fairshift-lab.lindgreendavid.chatgpt.site/#robustness) lets you pick a stressor, drag its magnitude, and watch both models' accuracy, calibration, and fairness gaps move in real time — with the uncertainty and limitations of what you're looking at shown *before* any number, not after. If you want to go deeper: the [full robustness report](https://github.com/lindgreendavid/fairshift-lab/blob/main/docs/robustness-report.md) documents every hypothesis's actual disposition, including the ones that didn't confirm cleanly.

## Learn more

- Hardt, Price & Srebro (2016), *Equality of Opportunity in Supervised Learning*, NeurIPS — the equal-opportunity/equalized-odds definitions this project measures against.
- Kleinberg, Mullainathan & Raghavan (2017), *Inherent Trade-Offs in the Fair Determination of Risk Scores*, ITCS — why you generally can't satisfy every fairness definition at once.
- The [source code](https://github.com/lindgreendavid/fairshift-lab) is MIT-licensed and fully reproducible — clone it, change the stressors, and see what breaks.
