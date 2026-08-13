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
  "tagline": "Real data, real findings, honest limits — across AI, physics, astrophysics, biology, and climate."
} as const;

export const indexBody = `## What this is

A growing collection of interactive research projects and real findings, written up in plain
language. Every project here started with a bounded, falsifiable question, was preregistered before
any result existed, and reports what was actually found — including the parts that didn't confirm
cleanly.
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
    body: `## The question

Put three bodies in mutual gravitational orbit and there's no general formula that predicts where they'll be at any future time — this was proven by Poincaré in 1890, and it's not what this project is about. The actually interesting question is narrower and answerable: within a specific numerical method, where does the *chaos* actually show up? And do the famous named solutions — the figure-eight orbit, the Lagrange equilateral triangle, the Euler collinear line — sit at that boundary, or well inside a stable region, the way textbook intuition suggests they should?

## What we actually did

We built a validated integrator (checked against all three known special solutions to within 1e-9 energy conservation), then measured chaos the way physicists actually do it: take two *almost* identical starting conditions, run them forward, and watch how fast they diverge. That divergence rate is the Lyapunov exponent. We swept it across 42 combinations of perturbation size and mass ratio, preregistered before any result existed.

## What we found

The headline result surprised us, and we reported it exactly as measured rather than smoothing it into a cleaner story: **every single one of the 42 tested cells came back "chaotic"** under our threshold — including the Lagrange and Euler configurations, which are supposed to be "special." That's not a bug. It's a real fact from celestial mechanics: **Routh's 1875 stability criterion** says the equal-mass Lagrange triangle is *analytically unstable* — stability requires one mass to dominate the other two by roughly 25-to-1, nowhere near the equal masses we tested. Our numbers didn't just agree with a 150-year-old theorem — they *measured* it happening.

The one solution that *is* proven stable in the literature — the figure-eight orbit — showed the smallest divergence of all six configurations tested, exactly as theory predicts, even though it too crossed our (deliberately strict) "chaotic" cutoff within our short observation window.

## Try it yourself

The [live simulator](https://three-body-lab-interactive.lindgreendavid.workers.dev/#simulator) lets you pick a configuration, drag the perturbation size, and literally watch two near-identical starts peel apart in real time — you can even export a clip of the divergence. The hero animation on the front page traces the real figure-eight orbit tracing itself, at its true period, not an artist's impression.

## Learn more

- Chenciner & Montgomery (2000), *A Remarkable Periodic Solution of the Three-Body Problem in the Case of Equal Masses*, Annals of Mathematics — the existence proof for the figure-eight orbit.
- Roberts (2007), *Linear Stability Analysis of the Figure-Eight Orbit in the Three-Body Problem*, Ergodic Theory and Dynamical Systems — the rigorous proof it's stable.
- Routh (1875), *On Laplace's Three Particles, with a Supplement on the Stability of Steady Motion*, Proc. London Mathematical Society — the 150-year-old result this project's data corroborates.
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
    body: `## The question

Fast radio bursts (FRBs) are millisecond-long flashes of radio energy from deep space. Some sources burst once; others repeat. The CHIME/FRB Collaboration's landmark 2021 catalog paper concluded that repeating and non-repeating bursts show *statistically indistinguishable* dispersion measures (a proxy for how much intervening gas the signal passed through), while differing clearly in pulse width and spectral bandwidth. We asked a simple question: using the same real, public 536-burst catalog, does that specific claim actually replicate?

## What we actually did

We downloaded the real CHIME/FRB Catalog 1 data (verified against the paper's own reported counts: 536 bursts, 62 from 18 repeaters), preregistered our statistical tests before looking at results, and ran the same comparison the paper describes — first for pulse width and bandwidth (where the paper reports a real difference), then for dispersion measure (where it reports none).

## What we found

The width and bandwidth test replicated cleanly — strong evidence our pipeline actually works and can detect a real, published effect. The dispersion measure test **did not replicate**: our preregistered burst-level test found a highly significant difference (p ≈ 2×10⁻¹⁰), directly contradicting the paper's own "no significant difference."

Rather than stopping there, we investigated *why*, as a disclosed, clearly-labeled follow-up (not part of the original preregistration). The answer: our 59-burst repeater sample was dominated by just two exceptionally prolific, nearby, low-dispersion repeating sources — they alone supplied 90% of the repeater bursts. When we reproduced the original paper's own method of using only each source's *first-detected* burst (reducing pseudo-replication from prolific repeaters), the discrepancy mostly, though not completely, resolved.

This is what honest science communication is supposed to look like: not "the paper was wrong" and not "we replicated everything perfectly," but a specific, traceable, disclosed reason why two careful analyses of the same real data can disagree.

## Try it yourself

The [interactive comparison](https://frb-atlas-interactive.lindgreendavid.workers.dev/#dm) lets you see both distributions overlaid, with every statistic — KS test, Anderson-Darling, bootstrap confidence intervals — shown before any "significant or not" conclusion.

## Learn more

- CHIME/FRB Collaboration, Amiri et al. (2021), *The First CHIME/FRB Fast Radio Burst Catalog*, The Astrophysical Journal Supplement Series, 257, 59 — the paper this project tests.
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
    body: `## The question

AlphaFold2 predicts protein structures and, crucially, tells you how confident it is in each part of that prediction — a per-residue score called pLDDT. A 2023 PNAS paper by Alderson et al. showed that low pLDDT is a useful signal for genuinely disordered protein regions — floppy, unstructured stretches with no fixed shape — but that some disordered regions still get *confident* pLDDT scores, because they can "conditionally fold" into structure when they bind a partner. We asked: on a fresh, independently drawn sample of real, curated data, does that relationship hold — and specifically where does it break?

## What we actually did

We joined 387 real human proteins' curated disorder annotations from DisProt (a database built entirely on published experimental evidence, not other predictions) to their real AlphaFold DB confidence scores, residue by residue — 228,662 residues in total. No model training, no synthetic data: just a statistical test of a specific claim against real data.

## What we found

The overall signal is strong and unambiguous: residues inside curated disorder regions have a **43-point lower median pLDDT** than residues outside them (88.8 vs. 45.1), and that difference is essentially certain (p ≈ 0 on two independent tests). A simple "pLDDT below 70 means disordered" classifier catches most real disorder (76.5% recall) but is only a moderately reliable predictor overall (34.1% precision).

Here's where it gets specific and useful, not just a summary statistic: precision **collapses to 6.3%** — from a 31% baseline — specifically on regions flagged as capable of conditionally folding, and recall drops to just 35.1% on disorder evidenced by hydrogen-deuterium exchange mass spectrometry (a technique that detects partial, dynamic structure). Named individual proteins in our report show this concretely: some proteins get every single disordered residue wrong in one direction or the other. This is exactly the failure mode the original paper's theory predicts — regions that *can* fold, under the right conditions, confuse a tool that only sees one static snapshot.

## Try it yourself

The [interactive threshold explorer](https://foldings-edge-interactive.lindgreendavid.workers.dev/#classifier) lets you drag the pLDDT cutoff from 0 to 100 and watch precision, recall, F1, and the confusion matrix update live from the real data — split by whether a region can conditionally fold — with one click back to the actual preregistered threshold. The hero animation traces one specific named protein's real per-residue confidence scores as a wiggling chain: watch it go from calm (ordered) to visibly restless (disordered) at the exact residue where the real data says the transition happens.

## Learn more

- Alderson, Pritišanac, Kolarić, Moses & Forman-Kay (2023), *Systematic Identification of Conditionally Folded Intrinsically Disordered Regions by AlphaFold2*, PNAS 120(44) — the paper motivating this project.
- Jumper et al. (2021), *Highly Accurate Protein Structure Prediction with AlphaFold*, Nature — the original AlphaFold2 paper.
- [DisProt](https://disprot.org) — the curated, expert-annotated intrinsic disorder database used as ground truth here, CC BY 4.0.
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
    body: `## The question

"Cities are warmer than their surroundings" is one of the most repeated facts in climate communication — the urban heat island effect. It's real, well-documented globally, and also frequently stated without a number, a source, or an uncertainty range attached. We asked a narrower, answerable version for one specific city: how much warmer is urban Frankfurt than its designated rural reference station, with an actual confidence interval, and has that gap changed over the last four decades?

## What we actually did

Germany's national weather service, DWD, operates a real program pairing urban climate stations with rural reference counterparts. We used their own designated Frankfurt pair — Frankfurt/Main-Westend (inner-city) against Frankfurt/Main (physically the airport, which we disclose rather than pretend is a pristine rural village) — across every day both stations recorded a valid reading from November 1985 through December 2025: 14,579 days.

## What we found

The gap is real but modest: **+0.455°C** on average (95% confidence interval 0.432 to 0.478 — the interval excludes zero, so we can say with confidence Westend is measurably warmer, not just "probably"). But the honest second half of the finding matters just as much: over this 40-year record, there is **no statistically significant trend** in that gap (p = 0.118). We don't get to say the urban heat island is visibly worsening at this station pair over this period — the data doesn't support that, so we don't claim it.

We also built something concrete out of the two stations' real coordinates: an interactive map computing the true straight-line distance (15.42 km) and bearing between them directly from their published locations — no map imagery library, just real trigonometry on real numbers.

## Try it yourself

The [interactive site](https://climate-twin-frankfurt-interactive.lindgreendavid.workers.dev) shows the full daily and seasonal breakdown, the year-by-year trend with its own confidence band, and the station map — uncertainty stated before any "warmer" or "trending" conclusion, the same discipline as every project in this series.

## Learn more

- [DWD Climate Data Center](https://opendata.dwd.de) — Germany's free, open weather and climate data archive, CC BY 4.0.
- [DWD's urban climate station program](https://www.dwd.de/EN/ourservices/urban_heatisland/urbanheatisland_en.html) — the real paired-station methodology this project reuses rather than inventing its own.
- The [source code](https://github.com/lindgreendavid/climate-twin-frankfurt) is MIT-licensed; the fetch script re-downloads DWD's own archived station files directly.`,
  }
];
