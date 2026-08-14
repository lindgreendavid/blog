---
slug: climate-twin-frankfurt-heat-island
title: "Is Frankfurt actually warmer than the countryside around it? We measured it."
project: Climate Twin Frankfurt
field: Climate / Data Engineering
date: 2026-08-13
repo: https://github.com/lindgreendavid/climate-twin-frankfurt
tool: https://climate-twin-frankfurt-interactive.lindgreendavid.workers.dev
report: https://github.com/lindgreendavid/climate-twin-frankfurt/blob/main/docs/research-report.md
---

**Stable release:** [Climate Twin Frankfurt v1.0.0](https://github.com/lindgreendavid/climate-twin-frankfurt/releases/tag/v1.0.0). The product is stable; the preregistered v0.1 paired-station study remains unchanged and reproducible.

## The question

"Cities are warmer than their surroundings" is one of the most repeated facts in climate communication — the urban heat island effect. It's real, well-documented globally, and also frequently stated without a number, a source, or an uncertainty range attached. We asked a narrower, answerable version for one specific city: how much warmer is urban Frankfurt than its designated rural reference station, with an actual confidence interval, and has that gap changed over the last four decades?

## What we actually did

Germany's national weather service, DWD, operates a real program pairing urban climate stations with rural reference counterparts. We used their own designated Frankfurt pair — Frankfurt/Main-Westend (inner-city) against Frankfurt/Main (physically the airport, which we disclose rather than pretend is a pristine rural village) — across every day both stations recorded a valid reading from November 1985 through December 2025: 14,579 days.

## What we found

The estimated gap is modest: **+0.455°C** on average (30-day block-bootstrap 95% interval 0.432 to 0.478). That supports a warmer average at Westend relative to this specific airport reference, conditional on the two station histories and the chosen block method—not a city-wide causal urban-heat-island estimate. The preregistered classical OLS trend is not statistically distinguishable from zero (p = 0.118). Because its annual residuals are serially correlated, a post-release three-lag Newey–West sensitivity is preferable for uncertainty: 95% interval −0.0079 to +0.0016°C/year, p = 0.186. The conclusion remains "no linear trend detected," not "no trend exists."

We also built something concrete out of the two stations' real coordinates: an interactive map computing the true straight-line distance (15.42 km) and bearing between them directly from their published locations — no map imagery library, just real trigonometry on real numbers.

## Try it yourself

The [interactive site](https://climate-twin-frankfurt-interactive.lindgreendavid.workers.dev) shows the full daily and seasonal breakdown, the year-by-year trend with its own confidence band, and the station map — uncertainty stated before any "warmer" or "trending" conclusion, the same discipline as every project in this series.

## Learn more

- [DWD Climate Data Center](https://opendata.dwd.de) — Germany's free, open weather and climate data archive, CC BY 4.0.
- [DWD's urban climate station program](https://www.dwd.de/EN/ourservices/urban_heatisland/urbanheatisland_en.html) — the real paired-station methodology this project reuses rather than inventing its own.
- The [source code](https://github.com/lindgreendavid/climate-twin-frankfurt) is MIT-licensed; the fetch script re-downloads DWD's own archived station files directly.
