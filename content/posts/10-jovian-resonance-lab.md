---
slug: jovian-resonance-lab-laplace-angle
title: "Jupiter’s moons keep time. Which physics keeps them together?"
project: Jovian Resonance Lab
field: Planetary Dynamics / Celestial Mechanics
date: 2026-08-14
repo: https://github.com/lindgreendavid/jovian-resonance-lab
tool: https://lindgreendavid.github.io/jovian-resonance-lab/
report: https://github.com/lindgreendavid/jovian-resonance-lab/blob/main/docs/research-report-v0.1.md
---

**Current research status:** product v0.1.0 completes a preregistered thirty-year model-ablation
study against NASA/JPL JUP365. The expected model ordering passed. A prespecified numerical
sensitivity also failed its implicit closeness check, so the primary comparison and its numerical
limit are reported together. Finer post-confirmatory runs are promising, not retroactively
confirmatory.

## The question

Io, Europa, and Ganymede orbit Jupiter in periods close to a 4:2:1 ratio. The deeper relationship is
three-body: their mean longitudes combine into the Laplace angle
`φL = λIo − 3λEuropa + 2λGanymede`, which remains close to 180 degrees instead of circulating around
the full circle.

Which minimum dynamical ingredients can reproduce that angle over a fixed thirty-year interval?
Jovian Resonance Lab compares four models against the same JPL reference rather than asking whether
one visually convincing simulation “looks right.”

## What was fixed before the result

The protocol was committed before the complete scored interval was downloaded or any confirmatory
model was evaluated. It fixed 2001-01-01 through 2030-12-31 TDB, one daily sample, circular RMSE as
the primary endpoint, and four models:

- **K2:** independent Jupiter–moon pairs, without moon–moon forces or oblateness;
- **G3:** Jupiter, Io, Europa, and Ganymede as mutually interacting point masses;
- **G4:** G3 plus Callisto;
- **G4J2:** G4 plus Jupiter's axisymmetric `J2` oblateness term.

A disclosed two-date feasibility check from 2000 sits outside the scored interval. No solar force,
higher Jovian harmonic, relativity, tide, or pole-precession term was added after seeing results.

## The evidence

NASA/JPL Horizons supplied JUP365 osculating elements for 10,957 aligned daily epochs and initial
Cartesian states for all four Galilean moons. Every scored response identified its source as
`JUP365_MERGED`. The normalized reference registry has a published SHA-256 identity, while the full
query mappings, retrieval time, row counts, states, and model traces remain machine-readable.

That provenance matters, but JUP365 is still a fitted and propagated ephemeris—not raw astrometric
measurements and not an uncertainty distribution. The experiment measures model adequacy relative
to that reference product.

## What we found

The JUP365 Laplace angle had a circular mean of 180.0036 degrees. Every daily reference sample was
within two degrees of 180 degrees, and the unwrapped half peak-to-peak range was 0.4169 degrees.
That two-degree band is a descriptive containment check, not a confidence interval or universal
definition of resonance.

The four frozen circular RMSE values were:

- K2: **103.5936°**;
- G3: **28.2122°**;
- G4: **28.3195°**;
- G4J2: **11.2678°**.

G4J2 was lower than K2, G3, and G4, so all three prespecified comparisons passed. Mutual satellite
gravity recovered much of the phase relationship, while Jupiter's oblateness improved the primary
metric further. Adding Callisto without `J2` did not improve this endpoint over G3. That does not
make Callisto dynamically irrelevant; it is a result about this model family, interval, and angle.

## The result that prevents overclaiming

The nominal integration used velocity Verlet with a 0.01-day step. The protocol required a
0.005-day sensitivity run. Those two G4J2 traces differed by **8.1342° RMSE** across thirty years—too
large to call the nominal absolute trajectory numerically converged.

After that result was known, two smaller steps were added as an explicitly exploratory convergence
study. Successive trace differences fell from 8.1342° to 2.1487° and then 0.5417°, close to the
fourfold reduction expected when halving the step of a second-order method. Against JUP365, the
finest 0.00125-day run reached **0.4641° RMSE**.

That is scientifically interesting: numerical phase error likely explains much of the nominal
11.27-degree discrepancy. It is not permission to replace the frozen primary endpoint. A future
replication should freeze a converged step before scoring.

## Other checks

The frozen 2011 reference segment sampled every twelve hours ranged only 0.2273 degrees and showed
no concealed circulation. Recalculating that segment in the ICRF/J2000 element frame changed the
Laplace angle by 0.2019 degrees RMS and at most 0.2037 degrees. The frame effect is small relative to
model RMSE, but substantial relative to the narrow reference libration range.

Point-mass energy drift remained `−2.57 × 10⁻⁷` for G3 and `−9.72 × 10⁻⁹` for G4. Interacting-model
barycenter displacement stayed below `6 × 10⁻⁸` km. K2 deliberately fixes Jupiter, so its represented
collection does not provide the same barycenter-conservation diagnostic.

## Try it yourself

The [interactive Jovian Resonance Lab](https://lindgreendavid.github.io/jovian-resonance-lab/)
animates a sixty-day JUP365 vector extract, lets you scrub through the moon positions, and compares
each frozen model's Laplace-angle residual. The angular timing comes from JPL; radial spacing and
body sizes are visibly rescaled to keep every moon on screen.

## What this cannot establish

Thirty years of agreement with a fitted ephemeris cannot determine how the Laplace relation formed,
whether it survives for billions of years, or how tides alter the system. It says nothing direct
about tidal quality factors, internal heating, subsurface oceans, or habitability. Paita, Celletti,
and Pucacco provide the closest published model context; Lainey and colleagues constrain the idea
of an immutable exact clock; Lari, Saillenfest, and Fenucci show why later tidal evolution involving
Callisto remains sensitive to uncertain parameters.

## Learn more

- [JPL planetary-satellite ephemerides](https://ssd.jpl.nasa.gov/sats/ephem/) — the authoritative ephemeris registry behind JUP365.
- [JPL Horizons API documentation](https://ssd-api.jpl.nasa.gov/doc/horizons.html) — the query interface used for the frozen extracts.
- [Paita, Celletti & Pucacco (2018)](https://doi.org/10.1051/0004-6361/201832856) — the primary published Cartesian and resonant-model context.
- [Lainey et al. (2009)](https://doi.org/10.1038/nature08108) — astrometric evidence for secular evolution in the Galilean system.
- [Lari, Saillenfest & Fenucci (2020)](https://doi.org/10.1051/0004-6361/202037445) — long-term tidal evolution and possible resonant behavior involving Callisto.
- [Frozen protocol](https://github.com/lindgreendavid/jovian-resonance-lab/blob/main/docs/protocol-v0.1.md) — models, endpoints, sensitivities, and failure rules fixed before confirmation.
- [Machine-readable model report](https://github.com/lindgreendavid/jovian-resonance-lab/blob/main/reports/v0.1-model-adequacy.json) — all traces, metrics, diagnostics, and convergence comparisons.
- [v0.1 release audit](https://github.com/lindgreendavid/jovian-resonance-lab/blob/main/docs/v0.1-release-audit.md) — scientific identity, corrections, completed gates, and remaining limits.
