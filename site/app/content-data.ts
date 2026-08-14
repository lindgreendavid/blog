// GENERATED FILE -- do not edit by hand.
// Source of truth: content/00-index.md and content/posts/*.md at the repo root.
// Regenerate with `pnpm run sync-content` (from site/) after editing those files.

export interface PostMeta {
  slug: string;
  title: string;
  project: string;
  field: string;
  date: string;
  repo: string;
  tool: string;
  report: string;
}

export interface Post extends PostMeta {
  body: string;
}

export const indexMeta = {
  "title": "David Lindgreen — Lab Notes",
  "tagline": "Real data, inspectable systems, honest limits — across AI, physics, astrophysics, evolution, biology, chemistry, climate, neuroscience, and data observability."
} as const;

export const indexBody = `## What this is

A growing collection of interactive research projects and real findings, written up in plain
language. Every project begins with a bounded, falsifiable question and a protocol appropriate to
its design. Blinded or preregistered studies are identified as such; known-result reproductions are
labelled explicitly. Every report includes what was actually found — including the parts that
didn't confirm cleanly.
Nothing here claims to be peer-reviewed novel science. What it claims is narrower and checkable:
real public data, a documented method, and an honest account of where that method holds up and
where it doesn't.

## Why this exists

Most of what looks like "using AI to do research" online is a demo dressed up as a discovery. The
goal here is the opposite: hand you something you can actually poke at — an interactive tool, not
just a chart — a written explanation of what it found and why that's interesting, and a straight
line to the actual public data and cited papers if you want to go further than we did. If any of
these articles makes you want to open the tool, pull the real dataset yourself, or read the paper
we're testing against, that's the point. Everything here is MIT-licensed and reproducible — clone
any of these repos and check our work.

## The articles

(Rendered as a list of published posts, newest first, each linking to its interactive tool and
source repo.)

## Explore further

- [Full portfolio](https://github.com/lindgreendavid) — all the source code, research protocols, and reports.
- [Researched roadmap](https://github.com/lindgreendavid/lindgreendavid/blob/main/ROADMAP.md) — what's grounded and planned next, with real data sources cited for each idea.`;

export const posts: Post[] = [
  {
    slug: "fairshift-lab-robustness",
    title: "A model that looks fair can quietly stop being fair. Here's how to catch it.",
    project: "Fairshift Lab",
    field: "Responsible AI",
    date: "2026-08-13",
    repo: "https://github.com/lindgreendavid/fairshift-lab",
    tool: "https://fairshift-lab.lindgreendavid.chatgpt.site",
    report: "https://github.com/lindgreendavid/fairshift-lab/blob/main/docs/robustness-report.md",
    body: `## The question

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
- The [source code](https://github.com/lindgreendavid/fairshift-lab) is MIT-licensed and fully reproducible — clone it, change the stressors, and see what breaks.`,
  },
  {
    slug: "three-body-lab-chaos-boundary",
    title: "The three-body problem can't be solved. That's not the interesting part.",
    project: "Three-Body Lab",
    field: "Physics",
    date: "2026-08-13",
    repo: "https://github.com/lindgreendavid/three-body-lab",
    tool: "https://three-body-lab-interactive.lindgreendavid.workers.dev",
    report: "https://github.com/lindgreendavid/three-body-lab/blob/main/docs/research-report.md",
    body: `**Stable release:** [Three-Body Lab v1.0.0](https://github.com/lindgreendavid/three-body-lab/releases/tag/v1.0.0). The product is stable; the preregistered v0.1 study and its 42-cell registry remain unchanged and reproducible.

## The question

The general three-body problem is non-integrable in the classical sense studied by Bruns and Poincaré, although Sundman later constructed a globally convergent series for nonzero angular momentum that is not computationally practical. This project asks a narrower question: within a specific numerical method, where does finite-window divergence appear? And do the famous named solutions — the figure-eight orbit, the Lagrange equilateral triangle, the Euler collinear line — sit at that boundary, or well inside a stable region?

## What we actually did

We built a validated integrator (checked against all three known special solutions to within 1e-9 energy conservation), then measured chaos the way physicists actually do it: take two *almost* identical starting conditions, run them forward, and watch how fast they diverge. That divergence rate is the Lyapunov exponent. We swept it across 42 combinations of perturbation size and mass ratio, preregistered before any result existed.

## What we found

The headline result surprised us, and we reported it exactly as measured: **every one of the 42 tested cells crossed our preregistered finite-window "chaotic" threshold** — including the Lagrange and Euler configurations. Classical theory explains why equal masses are not a stable Lagrange triangle: the Gascheau–Routh criterion is 27(m₁m₂+m₂m₃+m₃m₁) < (m₁+m₂+m₃)². In our exact sweep (m₁,m₂,m₃)=(1,r,1), that requires r > 25 + 18√2 ≈ 50.456, not the often-quoted 24.96:1 restricted-problem ratio. Our tested range stopped at r=3, entirely within the linearly unstable regime. The numerical result is consistent with that theorem; a short-window estimator with unconstrained perturbations is not an independent proof of it.

The equal-mass figure-eight orbit, which Roberts proved **linearly** stable, showed the smallest divergence of all six configurations. It still crossed our deliberately strict cutoff, demonstrating that this finite-window classification is not the same object as rigorous linear or long-term stability.

## Try it yourself

The [live simulator](https://three-body-lab-interactive.lindgreendavid.workers.dev/#simulator) lets you pick a configuration, drag the perturbation size, and literally watch two near-identical starts peel apart in real time — you can even export a clip of the divergence. The hero animation on the front page traces the real figure-eight orbit tracing itself, at its true period, not an artist's impression.

## Learn more

- Chenciner & Montgomery (2000), *A Remarkable Periodic Solution of the Three-Body Problem in the Case of Equal Masses*, Annals of Mathematics — the existence proof for the figure-eight orbit.
- Roberts (2007), *Linear Stability Analysis of the Figure-Eight Orbit in the Three-Body Problem*, Ergodic Theory and Dynamical Systems — the rigorous proof it's stable.
- Gascheau (1843) and Routh (1875) established the equilateral solution's mass criterion; Routh's paper is *On Laplace's Three Particles, with a Supplement on the Stability of Steady Motion*.
- Sundman (1912) constructed the convergent-series solution that limits simplistic claims that the problem has "no formula."
- The [source code](https://github.com/lindgreendavid/three-body-lab) is MIT-licensed; the registry regenerates byte-for-byte deterministically if you want to check our work yourself.`,
  },
  {
    slug: "frb-atlas-dispersion-measure",
    title: "We tried to replicate a real astrophysics paper. It didn't fully replicate — and that's the finding.",
    project: "FRB Atlas",
    field: "Astrophysics",
    date: "2026-08-13",
    repo: "https://github.com/lindgreendavid/frb-atlas",
    tool: "https://frb-atlas-interactive.lindgreendavid.workers.dev",
    report: "https://github.com/lindgreendavid/frb-atlas/blob/main/docs/research-report.md",
    body: `**Stable release:** [FRB Atlas v1.0.0](https://github.com/lindgreendavid/frb-atlas/releases/tag/v1.0.0). The product is stable; the preregistered v0.1 catalog analysis remains unchanged and reproducible.

## The question

Fast radio bursts (FRBs) are millisecond-long flashes of radio energy from deep space. Some sources burst once; others repeat. The CHIME/FRB Collaboration's landmark 2021 catalog paper concluded that repeating and non-repeating bursts show *statistically indistinguishable* dispersion measures (a proxy for how much intervening gas the signal passed through), while differing clearly in pulse width and spectral bandwidth. We asked a simple question: using the same real, public 536-burst catalog, does that specific claim actually replicate?

## What we actually did

We downloaded the real CHIME/FRB Catalog 1 data (verified against the paper's own reported counts: 536 bursts, 62 from 18 repeaters), preregistered our statistical tests before looking at results, and ran the same comparison the paper describes — first for pulse width and bandwidth (where the paper reports a real difference), then for dispersion measure (where it reports none).

## What we found

The width and bandwidth directions were recovered, which is a useful positive control but not proof that every dispersion-measure choice matches the paper. Our preregistered burst-level DM test differed from the paper's source-level conclusion (p ≈ 2×10⁻¹⁰).

Rather than stopping there, we investigated *why*, as a disclosed, clearly-labeled follow-up (not part of the original preregistration). The answer: our 59-burst repeater sample was dominated by just two exceptionally prolific, nearby, low-dispersion repeating sources — they alone supplied 90% of the repeater bursts. When we reproduced the original paper's own method of using only each source's *first-detected* burst (reducing pseudo-replication from prolific repeaters), the discrepancy mostly, though not completely, resolved.

This is what honest science communication is supposed to look like: not "the paper was wrong" and not "we replicated everything perfectly," but a specific, traceable, disclosed reason why two careful analyses of the same real data can disagree.

Later CHIME/FRB evidence adds an important boundary: a 2023 source-level study of 25 newly discovered repeaters also found lower mean DM and extragalactic DM for repeaters, while stressing sensitivity and exposure effects. That supports a sample-dependent contrast, not the burst-level p-value by itself and not a settled claim that repeaters and apparent non-repeaters are distinct physical populations.

## Try it yourself

The [interactive analysis-unit explorer](https://frb-atlas-interactive.lindgreendavid.workers.dev/#analysis-unit) lets you switch between all 59 repeater bursts and one first detection from each of 18 repeater sources, then compare α=0.05 with the paper's α=0.01 threshold. The catalog never changes; the interaction exposes exactly how independence assumptions and decision rules change the conclusion.

## Learn more

- CHIME/FRB Collaboration, Amiri et al. (2021), *The First CHIME/FRB Fast Radio Burst Catalog*, The Astrophysical Journal Supplement Series, 257, 59 — the paper this project tests.
- CHIME/FRB Collaboration (2023), *CHIME/FRB Discovery of 25 Repeating Fast Radio Burst Sources*, The Astrophysical Journal 947, 83 — later source-level evidence and its selection-effect boundary.
- The real catalog data is hosted by [VizieR](https://vizier.cds.unistra.fr), the standard astronomical catalog archive — the same source this project used.
- The [source code](https://github.com/lindgreendavid/frb-atlas) is MIT-licensed and includes the fetch script that re-downloads and re-verifies the real data from scratch.`,
  },
  {
    slug: "foldings-edge-plddt-disorder",
    title: "AlphaFold tells you how confident it is. Sometimes it's confidently wrong — and that's predictable.",
    project: "Folding's Edge",
    field: "Biology",
    date: "2026-08-13",
    repo: "https://github.com/lindgreendavid/foldings-edge",
    tool: "https://foldings-edge-interactive.lindgreendavid.workers.dev",
    report: "https://github.com/lindgreendavid/foldings-edge/blob/main/docs/research-report.md",
    body: `**Stable release:** [Folding’s Edge v1.0.0](https://github.com/lindgreendavid/foldings-edge/releases/tag/v1.0.0). The product is stable; the preregistered v0.1 analysis and committed evidence snapshot remain unchanged and reproducible.

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
- The [source code](https://github.com/lindgreendavid/foldings-edge) is MIT-licensed, including the fetch script that joins DisProt and AlphaFold DB from scratch.`,
  },
  {
    slug: "climate-twin-frankfurt-heat-island",
    title: "Is Frankfurt actually warmer than the countryside around it? We measured it.",
    project: "Climate Twin Frankfurt",
    field: "Climate / Data Engineering",
    date: "2026-08-13",
    repo: "https://github.com/lindgreendavid/climate-twin-frankfurt",
    tool: "https://climate-twin-frankfurt-interactive.lindgreendavid.workers.dev",
    report: "https://github.com/lindgreendavid/climate-twin-frankfurt/blob/main/docs/research-report.md",
    body: `**Stable release:** [Climate Twin Frankfurt v1.0.0](https://github.com/lindgreendavid/climate-twin-frankfurt/releases/tag/v1.0.0). The product is stable; the preregistered v0.1 paired-station study remains unchanged and reproducible.

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
- The [source code](https://github.com/lindgreendavid/climate-twin-frankfurt) is MIT-licensed; the fetch script re-downloads DWD's own archived station files directly.`,
  },
  {
    slug: "neuro-signal-lab-p3b-robustness",
    title: "A classic brain response survived a new dataset. Here is exactly what that means.",
    project: "Neuro Signal Lab",
    field: "Neuroscience",
    date: "2026-08-13",
    repo: "https://github.com/lindgreendavid/neuro-signal-lab",
    tool: "https://lindgreendavid.github.io/neuro-signal-lab/",
    report: "https://github.com/lindgreendavid/neuro-signal-lab/blob/main/docs/research-report.md",
    body: `**Stable release:** [Neuro Signal Lab v1.0.0](https://github.com/lindgreendavid/neuro-signal-lab/releases/tag/v1.0.0). The product is stable; its frozen endpoint, exclusions, confirmatory result, and sensitivity analyses remain unchanged and reproducible.

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
**cross-paradigm robustness result**, not a literal direct replication. ERP CORE used a
visual oddball task; the external dataset used an auditory task. The result does not prove that the
two paradigms engage identical processes, identify one unique brain generator, read anyone's mind,
or establish a diagnostic tool. Other task designs also show that P3b can track report and
post-perceptual processing rather than awareness itself, so this result must not be reframed as
a neural signature of consciousness.

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
- Pitts et al. (2014), *Gamma band activity and the P3 reflect post-perceptual processes, not visual awareness*, Frontiers in Psychology 5:1078 — a boundary on interpreting P3b as awareness.
- Delorme, *EEG data from an auditory oddball task*, OpenNeuro ds003061 version 1.1.0 — the independent public dataset.
- Pernet et al. (2019), *EEG-BIDS, an extension to the brain imaging data structure for electroencephalography*, Scientific Data 6, 103 — the data-organization standard used by the dataset.
- The [source code](https://github.com/lindgreendavid/neuro-signal-lab), [frozen protocol](https://github.com/lindgreendavid/neuro-signal-lab/blob/main/docs/protocol.md), and [machine-readable result](https://github.com/lindgreendavid/neuro-signal-lab/blob/main/results/summary.json) disclose the full path from public data to every number above.`,
  },
  {
    slug: "data-contract-observatory-revision-evidence",
    title: "A data pipeline can keep running while its meaning changes. This observatory records the difference.",
    project: "Data Contract Observatory",
    field: "Data Engineering / Observability",
    date: "2026-08-13",
    repo: "https://github.com/lindgreendavid/data-contract-observatory",
    tool: "https://lindgreendavid.github.io/data-contract-observatory/",
    report: "https://github.com/lindgreendavid/data-contract-observatory/blob/main/docs/v1-release-audit.md",
    body: `**Stable software release:** [Data Contract Observatory v1.0.0](https://github.com/lindgreendavid/data-contract-observatory/releases/tag/v1.0.0). The software is stable; prospective longitudinal evidence has only just begun.

## The question

A public data feed may return HTTP 200 every day while quietly changing its columns, series
identity, types, ordering, historical values, or publication timing. When does a response cease to
satisfy a consumer's declared contract—and how can that operational failure be kept separate from
an unusual but valid observation?

## What we actually did

We froze a versioned contract for the European Central Bank's daily US-dollar/euro reference-rate
series, \`EXR.D.USD.EUR.SP00.A\`. Hard checks cover transport, schema, identity, numeric validity,
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
- [Prospective evidence branch](https://github.com/lindgreendavid/data-contract-observatory/tree/evidence) — immutable runs and revision-aware normalized state.`,
  },
  {
    slug: "reaction-integrity-lab-cleaning-leakage",
    title: "The same reaction benchmark scored 68% or 36%. The dataset definition changed.",
    project: "Reaction Integrity Lab",
    field: "Computational Chemistry / Machine Learning",
    date: "2026-08-14",
    repo: "https://github.com/lindgreendavid/reaction-integrity-lab",
    tool: "https://lindgreendavid.github.io/reaction-integrity-lab/",
    report: "https://github.com/lindgreendavid/reaction-integrity-lab/blob/main/docs/research-report.md",
    body: `**Current research status:** product v1.0.0 completes the source, provenance, published-log,
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
- [v1 release audit](https://github.com/lindgreendavid/reaction-integrity-lab/blob/main/docs/v1-release-audit.md) — completed evidence, neural-artifact decision, and remaining research.`,
  },
  {
    slug: "mathlab-wasm-root-finding",
    title: "When a tiny residual hides the wrong answer.",
    project: "Mathlab WASM",
    field: "Numerical Analysis / Scientific Computing",
    date: "2026-08-14",
    repo: "https://github.com/lindgreendavid/mathlab-wasm",
    tool: "https://lindgreendavid.github.io/mathlab-wasm/",
    report: "https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/research-report.md",
    body: `**Current research status:** stable product v1.0.0 adds a prespecified residual, forward-error, and
conditioning diagnostic to the unchanged v0.1 and v0.2 root-finding studies. All five v1.0 cases and
all cross-case checks pass. These are selected deterministic demonstrations of established
numerical behavior—not a prevalence estimate, rigorous root enclosure, production-library
certification, or claim of novel mathematics.

## The question

For a fixed candidate root, when does a small absolute residual \`|f(x̂)|\` track the actual forward
error \`|x̂-r|\`—and when can equation scaling or root multiplicity make that residual misleading if
it is read alone?

The v1.0 protocol fixed five equation–candidate pairs before implementation. Its perturbation model
is explicit: the absolute condition number \`1/|f′(r)|\` describes sensitivity to an additive change
in the function value near a simple root. It is not scale free, and it is not reported at a
multiple root where \`f′(r)=0\`.

## What v1.0 found

Three linear equations share the same root and candidate, so their computed forward error is the
same—approximately \`10⁻⁶\`. Multiplying the equation by \`10⁻⁸\`, \`1\`, and \`10⁸\` nevertheless changes
the raw residual from approximately \`10⁻¹⁴\` to \`10⁻⁶\` to \`10²\`. The condition number changes in the
opposite direction, and the frozen first-order estimate recovers the same forward error in all
three cases.

Near the selected simple root of \`x³-x-2\`, the derivative-based estimate agrees with the known
forward error within the prespecified relative tolerance. At the repeated root of \`(x-1)²\`, a
candidate about \`10⁻⁵\` away produces a residual near \`10⁻¹⁰\`; because the derivative vanishes at the
root, the simple-root condition and estimate are recorded as unavailable rather than forced into a
misleading finite number.

Open the [interactive Residual Microscope](https://lindgreendavid.github.io/mathlab-wasm/#microscope)
and switch between the five frozen cases. Every displayed scientific value comes from the committed
Rust report; JavaScript changes the view, not the result.

## Earlier study: when the fast step looks unsafe

A fast numerical step can be attractive and still be unsafe. Can a hybrid use secant or
inverse-quadratic interpolation when the proposal is defensible, fall back to bisection when it is
not, and keep the containing bracket visible throughout?

Mathlab WASM now compares four one-dimensional methods under binary64 arithmetic, \`10⁻¹⁰\`
position and residual tolerances, and an 80-iteration budget. The primary result remains the solver
status. For the safeguarded method, each trace also records the accepted move and both bracket
endpoints.

## What was fixed before the result

The v0.2 protocol was published in commit
\`e4c6f222c22f163b909503d05ead800394757f26\` before the safeguarded solver was implemented or its
report generated. It fixed five cases: the cubic and cosine equations, the deliberately skewed
\`x¹⁰−1\` equation, an exact endpoint root, and an even-multiplicity root without an endpoint sign
change.

The acceptance rules required the expected status, root error below \`10⁻⁹\` where applicable,
reference-root containment and non-increasing bracket width, both interpolation and bisection in the
skewed case, and exact endpoint termination with two initial evaluations and no iterative update.

## What the hybrid does

The implementation starts with a continuous sign-changing bracket. It proposes a secant step when
two distinct function values are available and inverse-quadratic interpolation when three are
available. A Brent-style guard rejects proposals that leave the protected part of the bracket or
fail to improve sufficiently relative to recent steps. Rejected proposals become bisection steps.

This is an independently written teaching implementation. “Brent–Dekker-style” identifies the
algorithm family; it does not mean that the code is bitwise equivalent to Netlib, SciPy, or another
production solver.

## What we found

All five frozen expectations passed:

- The cubic root was estimated as 1.5213797068045676 in seven iterations and nine function
  evaluations, using accepted secant and inverse-quadratic steps.
- The cosine root was estimated as 0.7390851332151559 in five iterations and seven evaluations,
  again using both interpolation types.
- The skewed \`x¹⁰−1\` case reached 1 exactly in eleven iterations and thirteen evaluations. Its
  trace contains secant, inverse-quadratic, and bisection moves—the prespecified safeguard
  demonstration.
- The exact endpoint root of \`x³\` at zero was accepted with two initial evaluations and no
  iterative update.
- The interval \`[0,2]\` for \`(x−1)²\` was rejected because it lacks the required sign change. That is
  not a claim that the interval contains no root.

Every recorded nonterminal bracket in the three iterative cases contained the fixed reference root
and had non-increasing width within the frozen floating-point comparison allowance. Evaluation
counts describe only these cases and do not rank the methods generally.

## A reproducibility result worth reporting

The first Ubuntu CI run and the macOS-generated report differed in the last bit of one cosine
residual. The statuses, counts, step kinds, bracket checks, reference errors, and tolerance decisions
all agreed. IEEE-754 binary64 specifies floating-point operations but does not force separate system
elementary-function libraries to return bit-identical transcendental results.

Because the original protocol demanded byte-identical report regeneration, this became a documented
post-result amendment—not a silent test relaxation. v0.2 CI now compares JSON structure and all
discrete decisions exactly, while floating-point leaves must agree within
\`16 × ε × (1 + scale)\`. The unchanged v0.1 report retains its byte comparison. Cross-platform byte
identity is withdrawn as an unsupported claim.

## Try it yourself

Open the [interactive root-finding microscope](https://lindgreendavid.github.io/mathlab-wasm/),
select **Safeguarded hybrid**, then choose \`x¹⁰−1\`. The table labels every accepted move as secant,
inverse quadratic, or bisection and shows the retained bracket beside the residual and iterate.

## How to read the result

The hybrid does not make interpolation globally safe by assertion. Its protection comes from the
sign-changing bracket and the explicit decision to reject unsuitable proposals. That guarantee
still depends on continuity, finite evaluations, a valid starting bracket, and the documented
floating-point safeguards. A small residual alone remains insufficient as a universal root-error
certificate.

## Learn more

- [Frozen v1.0 protocol](https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/protocol-v1.0.md) — definitions, perturbation model, cases, and acceptance criteria fixed before implementation.
- [Machine-readable v1.0 report](https://github.com/lindgreendavid/mathlab-wasm/blob/main/reports/v1.0-conditioning.json) — computed values and case/global checks.
- [Mathlab WASM v1.0.0 release](https://github.com/lindgreendavid/mathlab-wasm/releases/tag/v1.0.0) — stable product release and evidence boundary.
- [NIST DLMF §3.8, Nonlinear Equations](https://dlmf.nist.gov/3.8) — authoritative definitions and bounded convergence statements.
- [Higham (2002), Accuracy and Stability of Numerical Algorithms](https://doi.org/10.1137/1.9780898718027) — forward/backward error, conditioning, and stability framework.
- [Brent (1971)](https://doi.org/10.1093/comjnl/14.4.422) — the primary guaranteed-convergence construction combining interpolation and bracketing.
- [Frozen v0.2 protocol](https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/protocol-v0.2.md) — scenarios, acceptance criteria, and dated amendment.
- [Machine-readable v0.2 report](https://github.com/lindgreendavid/mathlab-wasm/blob/main/reports/v0.2-safeguarded-root-finding.json) — traces, brackets, step kinds, and acceptance checks.
- [v0.2 release audit](https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/v0.2-release-audit.md) — completed gates and remaining limits.
- [Unchanged v0.1 report](https://github.com/lindgreendavid/mathlab-wasm/blob/main/reports/v0.1-root-finding.json) — the original bisection, Newton, and secant foundation.`,
  },
  {
    slug: "jovian-resonance-lab-laplace-angle",
    title: "Jupiter’s moons keep time. Which physics keeps them together?",
    project: "Jovian Resonance Lab",
    field: "Planetary Dynamics / Celestial Mechanics",
    date: "2026-08-14",
    repo: "https://github.com/lindgreendavid/jovian-resonance-lab",
    tool: "https://lindgreendavid.github.io/jovian-resonance-lab/",
    report: "https://github.com/lindgreendavid/jovian-resonance-lab/blob/main/docs/research-report-v1.0.md",
    body: `**Current research status:** product v1.0.0 preserves the original protocol-frozen thirty-year
model ablation and adds a second protocol-frozen temporal replication on 3,653 non-overlapping
JUP365 days from 2031–2040. The model ordering, numerical-convergence, and reference-adequacy gates
all passed. Because the second interval extends beyond the 2026 release date, its JUP365 values are
ephemeris predictions—not future observations.

## The question

Io, Europa, and Ganymede orbit Jupiter in periods close to a 4:2:1 ratio. The deeper relationship is
three-body: their mean longitudes combine into the Laplace angle
\`φL = λIo − 3λEuropa + 2λGanymede\`, which remains close to 180 degrees instead of circulating around
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
- **G4J2:** G4 plus Jupiter's axisymmetric \`J2\` oblateness term.

A disclosed two-date feasibility check from 2000 sits outside the scored interval. No solar force,
higher Jovian harmonic, relativity, tide, or pole-precession term was added after seeing results.

## The evidence

NASA/JPL Horizons supplied JUP365 osculating elements for 10,957 aligned daily epochs and initial
Cartesian states for all four Galilean moons. Every scored response identified its source as
\`JUP365_MERGED\`. The normalized reference registry has a published SHA-256 identity, while the full
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
metric further. Adding Callisto without \`J2\` did not improve this endpoint over G3. That does not
make Callisto dynamically irrelevant; it is a result about this model family, interval, and angle.

## The result that prevents overclaiming

The nominal integration used velocity Verlet with a 0.01-day step. The protocol required a
0.005-day sensitivity run. Those two G4J2 traces differed by **8.1342° RMSE** across thirty years—too
large to call the nominal absolute trajectory numerically converged.

After that result was known, two smaller steps were added as an explicitly exploratory convergence
study. Successive trace differences fell from 8.1342° to 2.1487° and then 0.5417°, close to the
fourfold reduction expected when halving the step of a second-order method. Against JUP365, the
finest 0.00125-day run reached **0.4641° RMSE**.

That was scientifically interesting: numerical phase error likely explained much of the nominal
11.27-degree discrepancy. It did not provide permission to replace the frozen primary endpoint.
Instead, it motivated a second protocol with the step sizes and pass thresholds committed before
new reference data were retrieved.

## The v1 temporal replication

The new protocol fixed 2031-01-01 through 2040-12-31 TDB, 3,653 daily epochs, a fresh JUP365 initial
state at the start of the interval, and a common 0.0025-day step for all four models. G4J2 again had
the lowest circular RMSE:

- K2: **97.9578°**;
- G3: **25.1741°**;
- G4: **24.7109°**;
- G4J2: **1.0434°**.

All three frozen ordering comparisons passed. The protocol also required G4J2 runs at 0.005 and
0.00125 day. The 0.0025-versus-0.00125-day traces differed by **0.5735° RMSE**, below the fixed
0.75-degree ceiling. Their estimated convergence order was **1.984**, inside the fixed 1.5–2.5
interval. The finest trace reached **0.4699° RMSE** against JUP365, passing the fixed one-degree
reference-adequacy gate.

This makes the numerical result confirmatory for the new interval rather than a favorable
post-result refinement. It still does not prove convergence to exact Solar System dynamics or
attach an uncertainty distribution to JUP365.

## Other checks

The frozen 2011 reference segment sampled every twelve hours ranged only 0.2273 degrees and showed
no concealed circulation. Recalculating that segment in the ICRF/J2000 element frame changed the
Laplace angle by 0.2019 degrees RMS and at most 0.2037 degrees. The frame effect is small relative to
model RMSE, but substantial relative to the narrow reference libration range.

Point-mass energy drift remained \`−2.57 × 10⁻⁷\` for G3 and \`−9.72 × 10⁻⁹\` for G4. Interacting-model
barycenter displacement stayed below \`6 × 10⁻⁸\` km. K2 deliberately fixes Jupiter, so its represented
collection does not provide the same barycenter-conservation diagnostic.

## Try it yourself

The [interactive Jovian Resonance Lab](https://lindgreendavid.github.io/jovian-resonance-lab/)
animates a sixty-day JUP365 vector extract, lets you scrub through the moon positions, compares each
model's validation residual, and lets you switch among the three frozen G4J2 step sizes. The angular
timing comes from JPL; radial spacing and body sizes are visibly rescaled to keep every moon on
screen.

## What this cannot establish

Agreement with a fitted ephemeris cannot determine how the Laplace relation formed, whether it
survives for billions of years, or how tides alter the system. The validation restarts from JUP365
in 2031, so it is not an uninterrupted forty-year forecast. It says nothing direct about tidal
quality factors, internal heating, subsurface oceans, or habitability. Paita, Celletti, and Pucacco
provide the closest published model context; Lainey and colleagues constrain the idea of an
immutable exact clock; Lari, Saillenfest, and Fenucci show why later tidal evolution involving
Callisto remains sensitive to uncertain parameters.

## Learn more

- [JPL planetary-satellite ephemerides](https://ssd.jpl.nasa.gov/sats/ephem/) — the authoritative ephemeris registry behind JUP365.
- [JPL Horizons API documentation](https://ssd-api.jpl.nasa.gov/doc/horizons.html) — the query interface used for the frozen extracts.
- [Paita, Celletti & Pucacco (2018)](https://doi.org/10.1051/0004-6361/201832856) — the primary published Cartesian and resonant-model context.
- [Lainey et al. (2009)](https://doi.org/10.1038/nature08108) — astrometric evidence for secular evolution in the Galilean system.
- [Lari, Saillenfest & Fenucci (2020)](https://doi.org/10.1051/0004-6361/202037445) — long-term tidal evolution and possible resonant behavior involving Callisto.
- [Historical v0.1 protocol](https://github.com/lindgreendavid/jovian-resonance-lab/blob/main/docs/protocol-v0.1.md) — the unchanged original models, endpoints, and sensitivities.
- [Frozen v1 protocol](https://github.com/lindgreendavid/jovian-resonance-lab/blob/main/docs/protocol-v1.0.md) — the new interval, common step, thresholds, and failure rules committed before retrieval.
- [Machine-readable v1 report](https://github.com/lindgreendavid/jovian-resonance-lab/blob/main/reports/v1.0-validation.json) — complete traces, metrics, diagnostics, and gate outcomes.
- [v1.0.0 release](https://github.com/lindgreendavid/jovian-resonance-lab/releases/tag/v1.0.0) — stable product release and exact commit identity.
- [v1 release audit](https://github.com/lindgreendavid/jovian-resonance-lab/blob/main/docs/v1-release-audit.md) — scientific identities, reproduction steps, deviations, and remaining limits.`,
  },
  {
    slug: "snowflake-evolution-lab-individuality",
    title: "A yeast cluster became 20,000 times larger. When did it become an individual?",
    project: "Snowflake Evolution Lab",
    field: "Experimental Evolution / Multicellularity",
    date: "2026-08-14",
    repo: "https://github.com/lindgreendavid/snowflake-evolution-lab",
    tool: "https://lindgreendavid.github.io/snowflake-evolution-lab/",
    report: "https://github.com/lindgreendavid/snowflake-evolution-lab/blob/main/docs/research-report-v1.0.md",
    body: `**Current research status:** stable product v1.0.0 preserves the frozen v0.1 morphology study and
adds a source-compatible, protocol-frozen evaluation of engineered genome duplication and its
longitudinal sufficiency. Both studies reanalyse source-author data; neither is an independent
wet-lab replication or a claim to have rediscovered multicellularity.

## The question behind one of evolution's largest transitions

Every animal, plant, and mushroom is a society of cells whose evolutionary interests became
organized into a larger individual. That transition happened independently many times, but its
earliest stages are mostly inaccessible: the relevant ancestors are gone, and fossils rarely
preserve the mechanics of fragile cell clusters.

Experimental evolution offers a narrower view. Snowflake yeast are *Saccharomyces cerevisiae*
cells whose daughters remain attached after division, producing branching clonal clusters. In the
Multicellularity Long-Term Evolution Experiment (MuLTEE), researchers repeatedly selected clusters
that settled through liquid more quickly. Under anaerobic conditions, all five replicate
populations eventually produced millimetre-scale bodies containing hundreds of thousands of cells.

Bozdag and colleagues reported that, after 600 daily selection rounds—about 3,000 cellular
generations—the anaerobic clusters were approximately 20,000 times larger and 10,000 times tougher
than their ancestor. The cells became increasingly elongated. That geometry first reduced packing
strain and later allowed branches to entangle, so a single broken cell–cell bond no longer split
the entire organism.

Our bounded question is smaller: **does the published association between longer cells and larger
clusters have the same direction in every independently evolved anaerobic lineage?**

## What was fixed before calculation

The protocol was published before the confirmatory calculation. It fixed:

- the public source repository and exact upstream commit;
- the SHA-256 identity of the source workbook;
- the \`Fig1e\` cluster-radius and \`Fig2d\` cell-aspect-ratio sheets;
- PA1–PA5 as the five biological inference units;
- a within-line Spearman correlation between aspect ratio and log cluster radius;
- success only if all five population-level correlations were positive;
- three sensitivity analyses and a separate exploratory timing comparison.

There are 65 population-by-time rows. PA2 has no published cluster-radius mean at transfer 400, so
that value remains missing rather than being interpolated. The final calculation contains 64 paired
means. Thousands of underlying cells and clusters are not counted as thousands of independent
replicates.

## What we found

The frozen criterion passed. Every lineage showed a positive within-line association:

- PA1: Spearman ρ = **0.956**;
- PA2: **0.958**;
- PA3: **0.923**;
- PA4: **0.956**;
- PA5: **0.967**.

The median was **0.956**. Under the protocol's deliberately limited model in which five independent
population-level signs are equally likely to point either way, five positive signs correspond to
\`1/2⁵ = 0.03125\`. That number describes directional convergence across these five lines. It is not
a universal p-value for the evolution of multicellularity.

The prespecified checks agreed. After removing the shared day-zero ancestor, all five Spearman
coefficients remained above 0.90. Pearson correlations with log radius ranged from 0.893 to 0.981,
and Kendall's tau-b ranged from 0.821 to 0.872.

## The result that makes the story less simple

We also compared the 50-transfer interval with the largest rise in cell aspect ratio with the
interval containing the largest increase in log cluster radius. Their order was not consistent.
The size jump came earlier in PA1, PA2, and PA5; the shape jump came earlier in PA3 and PA4.

That coarse comparison cannot identify a universal transition point. Fifty-transfer sampling,
accumulated mutations, correlated time trends, and changes in the selection protocol all complicate
temporal interpretation. The strong association is compatible with the source paper's mechanical
experiments, but the summary trajectories alone cannot prove that elongation caused the size rise.

## The v1.0 test: genome duplication helps, but is not enough

Tong and colleagues supplied two complementary forms of evidence. First, they engineered diploid
and tetraploid versions of PA and PM snowflake-yeast backgrounds. The v1.0 analysis aggregates the
39,329 segmented cells and 17,227 24-hour clusters within each of four biological replicate strains
per group before inference. Tetraploidy increased mean 24-hour cluster radius from 20.157 to 27.299
µm in PA and from 25.890 to 42.897 µm in PM. Each exact one-sided replicate-level permutation test
has probability \`1/70 = 0.0143\`; both remain below 0.05 after Holm correction (\`0.0286\`). Cell
volume and aspect ratio increased in the same direction as secondary outcomes.

Second, the public longitudinal tables follow PA1–PA5 and PM1–PM5 through transfer 1,000. Every
evolved population-time G1 peak is at least 3.489N, yet the treatments diverge sharply in size. At
transfer 1,000, mean PA radius is 400.074 µm and mean PM radius is 45.160 µm—a ratio of 8.859. All
five PA lines exceed 300 µm, while the largest PM line is 53.226 µm. Genome duplication therefore
provides an immediate size-related advantage but is not sufficient for the later macroscopic
phenotype in these treatments.

The intervention and the longitudinal comparison answer different questions. The first supports
an immediate effect in engineered strains. The second rejects a simple sufficiency explanation;
it does not identify which later change completed the transition. The protocol was frozen after a
source-compatibility audit and before the v1 analysis was implemented, so it is a prospective
implementation contract rather than a blinded preregistration.

## Two further pieces of the story

Later MuLTEE work makes the transition more interesting rather than more linear.

First, a small-cluster lineage and a large-cluster lineage evolved from one ancestor and remained
together for roughly 4,300 generations. Their coexistence was maintained by a trade-off between
rapid growth and survival during settling, mediated by dissolved oxygen. A new level of biological
individuality created room for ecological diversification.

Second, macroscopic clusters appear able to move nutrients without a circulatory system. Their own
metabolism creates density differences that drive fluid through the cluster. Above a size
threshold, those flows can relieve limits expected from diffusion alone. Larger size can therefore
create a physical process that makes still larger size possible.

These findings motivate a future coupled-threshold hypothesis: **genomic size amplification and an
entangling cellular geometry may need to coincide before robust macroscopic bodies emerge.** This
is a testable proposal, not a measured v1.0 threshold. The selected public tables do not contain a
joined, quantitative time-resolved entanglement endpoint. A future protocol must acquire such an
endpoint before inspecting the combined outcome.

## Try it yourself

The [interactive Snowflake Evolution Lab](https://lindgreendavid.github.io/snowflake-evolution-lab/)
lets you replay each population from transfer 0 to 600, switch between the published cluster-size
and cell-shape trajectories, and compare all metabolic treatments at day 600. The new genome
explorer adds the engineered 2N/4N contrast, all 16 chromosome copy numbers, G1 peak and morphology
through transfer 1,000, and the PA/PM sufficiency comparison. The animated cluster is deliberately
labelled as an explanatory geometry model. It helps you reason about packing and entanglement, but
it is not microscopy, a fitted biological simulator, or an unobserved ancestral reconstruction.

## Stop at the boundary

- These are five selected laboratory populations, not a random sample of evolutionary histories.
- The reanalysis uses the original authors' published means and is not an independent replication.
- Association through time does not isolate elongation from selection, mutations, or other changes.
- Four engineered strains per group support a narrow intervention estimate, not a population-wide
  prevalence claim.
- The available joined tables do not measure a time-resolved entanglement endpoint.
- Snowflake yeast are undifferentiated clonal clusters, not miniature animals or plants.
- Nothing here shows that historical multicellular lineages followed the same route.

## Inspect and reproduce

- [Bozdag et al. (2023), *De novo evolution of macroscopic multicellularity*](https://doi.org/10.1038/s41586-023-06052-1) — primary experiment and mechanism.
- [Pineau et al. (2024), stable coexistence in MuLTEE](https://doi.org/10.1038/s41559-024-02367-y) — ecological diversification and oxygen-mediated trade-off.
- [Genome duplication in MuLTEE](https://pmc.ncbi.nlm.nih.gov/articles/PMC12256070/) — early tetraploidy and later aneuploid adaptation.
- [Metabolically driven flows](https://pmc.ncbi.nlm.nih.gov/articles/PMC11213004/) — emergent nutrient transport in macroscopic clusters.
- [Frozen v0.1 protocol](https://github.com/lindgreendavid/snowflake-evolution-lab/blob/main/docs/protocol-v0.1.md) — endpoints, exclusions, sensitivities, and boundaries.
- [Machine-readable result](https://github.com/lindgreendavid/snowflake-evolution-lab/blob/main/reports/results-v0.1.json) — all five coefficients and exploratory timing outputs.
- [Frozen v1.0 protocol](https://github.com/lindgreendavid/snowflake-evolution-lab/blob/main/docs/protocol-v1.0.md) — engineered intervention, longitudinal sufficiency gate, and evidence boundaries.
- [Machine-readable v1.0 result](https://github.com/lindgreendavid/snowflake-evolution-lab/blob/main/reports/results-v1.0.json) — replicate-level effects, uncertainty, chromosome burdens, and sufficiency test.
- [v1.0.0 release](https://github.com/lindgreendavid/snowflake-evolution-lab/releases/tag/v1.0.0) — stable public research-product identity; historical v0.1 artifacts remain unchanged.`,
  }
];
