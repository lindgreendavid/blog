---
slug: backtests-lie-selection-bias
title: "Test enough trading rules on pure noise and the best one looks brilliant. How brilliant, and what happens next?"
project: Backtests lie
field: Quantitative finance / Statistics
date: 2026-10-20
repo: https://github.com/lindgreendavid/backtests-lie
tool: https://lindgreendavid.github.io/backtests-lie/
report: https://github.com/lindgreendavid/backtests-lie/blob/main/docs/research-report.md
---

**Status:** ready for review. The frozen registry reproduces from scratch with zero differences. This is an educational demonstration of selection bias, not a finding about any market and not advice.

## The question

If many trading rules are tested on the same price history, how good does the best one look in-sample, and what happens to it out-of-sample?

## Why it matters

Quantitative research, risk and model-validation teams spend much of their effort on exactly this problem: backtest overfitting and multiple testing. Picking the best of many candidates on one data set inflates the apparent result, and the inflation grows with the number of candidates.

## Data

Simulated daily returns with zero expected return (normal, fat-tailed Student-t, and GARCH volatility clustering), seeded and reproducible. One real series: the European Central Bank's daily EUR/USD reference rate, 1999 to 2026, saved in the repository with its checksum. Source: European Central Bank.

## Method

A family of 4,916 rules (moving-average crossovers and momentum rules, each with its reversal) is scored on a first sample. For each number of rules N, the best-scoring rule among N randomly chosen rules is selected and then traded on a later sample it has never seen. The protocol, five hypotheses and their decision rules were committed before any result existed.

## Result

On five years of simulated normal returns, the best of 4,916 rules shows an average Sharpe ratio of about 1.17 in-sample and about 0.03 on new data. With two years used to choose, the in-sample figure is about 1.8. Because the rules overlap, roughly 125 independent trials would produce the same maximum. Applied to the real EUR/USD series in a yearly walk-forward, the selected rules averaged about 1.10 in-sample and -0.02 out-of-sample, inside the central range of 200 sign-flip nulls (-0.37 to 0.32).

Four of the five predictions held. The prediction of no out-of-sample edge failed as written: one of 54 cells lay beyond two standard errors, against about 2.5 expected by chance, and the frozen rule had no multiplicity correction. Both facts are reported.

## Limits

The simulated markets have no edge by construction, so luck is built in. There is one rule family and one real series. Costs are ignored. Sharpe ratios are noisy, with a standard error near 0.45 on five years of daily data. The browser version uses its own random numbers, so single runs differ from the frozen registry while the distributions agree. This is not advice.

## What was not checked

Other return models, rule families and markets, transaction-cost sensitivity, combinatorial cross-validation of the probability of backtest overfitting, and Sharpe corrections for non-normality.

## How it was built

Designed and directed by David Lindgreen. The code, tests and text were written with substantial assistance from an AI system (Claude, Anthropic). Every number on the page is generated from the frozen registry.

## Reproduce

Clone the repository, install it, and run the tests and the registry script as described in its README. The site is static and makes no third-party requests.
