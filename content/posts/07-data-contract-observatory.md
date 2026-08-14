---
slug: data-contract-observatory-revision-evidence
title: "A data pipeline can keep running while its meaning changes. This observatory records the difference."
project: Data Contract Observatory
field: Data Engineering / Observability
date: 2026-08-13
repo: https://github.com/lindgreendavid/data-contract-observatory
tool: https://lindgreendavid.github.io/data-contract-observatory/
report: https://github.com/lindgreendavid/data-contract-observatory/blob/main/docs/v1-release-audit.md
---

**Stable software release:** [Data Contract Observatory v1.0.0](https://github.com/lindgreendavid/data-contract-observatory/releases/tag/v1.0.0). The software is stable; prospective longitudinal evidence has only just begun.

## The question

A public data feed may return HTTP 200 every day while quietly changing its columns, series
identity, types, ordering, historical values, or publication timing. When does a response cease to
satisfy a consumer's declared contract—and how can that operational failure be kept separate from
an unusual but valid observation?

## What we actually did

We froze a versioned contract for the European Central Bank's daily US-dollar/euro reference-rate
series, `EXR.D.USD.EUR.SP00.A`. Hard checks cover transport, schema, identity, numeric validity,
duplicate dates, ordering, and TARGET-day freshness. A robust six-MAD signal for the latest log
return lives in a separate review channel: it can request inspection, but cannot label an exchange
rate or its publisher wrong.

Version 1.0.0 adds three deliberately separate evidence layers. A nine-fault synthetic suite
injects one known failure at a time. A retrospective replay evaluates 7,010 prefixes of the current
historical data vintage. An append-only evidence branch records future live runs, source hashes,
normalized states, and date/value/status revisions relative to the previous run.

## What we found

The fault suite classified all nine controlled faults as expected; its one clean control raised no
false alert. The retrospective replay produced no hard contract failures and nine statistical
review signals. The current live response inspected 385 recent observations through 13 August
2026 and passed the hard contract with no review signal.

Those numbers do **not** establish long-run reliability. The fault cases are synthetic. The replay
uses one present-day historical vintage, so it cannot reveal revisions that occurred between past
publications. At release there was one real prospective evidence run; the evidence branch now
contains **two same-day runs** with an unchanged source hash and no detected revision. Two runs
still cannot support a detection-rate, delay, or false-alarm claim about production history.

## Try it yourself

The [interactive failure lab](https://lindgreendavid.github.io/data-contract-observatory/#simulator)
lets you remove a required field, change the series identity, simulate lateness, or inject an
extreme return. The page shows the permitted conclusion for each change and keeps product version,
prospective runs, retrospective prefixes, and synthetic cases in separate counters.

## Learn more

- [ECB Data Portal](https://data.ecb.europa.eu/data/datasets/EXR/EXR.D.USD.EUR.SP00.A) — the primary series and publisher.
- [Frozen protocol](https://github.com/lindgreendavid/data-contract-observatory/blob/main/docs/protocol.md) — the contract, review threshold, and epistemic boundary.
- [Machine-readable v1 evaluation](https://github.com/lindgreendavid/data-contract-observatory/blob/main/reports/v1-evaluation.json) — case counts, Wilson intervals, replay results, and explicit evidence labels.
- [Prospective evidence branch](https://github.com/lindgreendavid/data-contract-observatory/tree/evidence) — immutable runs and revision-aware normalized state.
