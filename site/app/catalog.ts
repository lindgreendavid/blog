// Hand-maintained catalogue: what each item is, how finished it is, and what is featured.
// Keeping the three kinds apart is deliberate: a release is not an experiment and a proposal is not a product.

export type Kind = "release" | "experiment" | "proposed";

export type CatalogEntry = {
  title: string;
  field: string;
  kind: Kind;
  status: string;
  detail: string;
  // Present when a note page exists on this site.
  slug?: string;
  repo?: string;
};

export const FEATURED_SLUGS = [
  "data-contract-observatory-revision-evidence",
  "fairshift-lab-robustness",
  "backtests-lie-selection-bias",
] as const;

export const featuredCopy: Record<string, { question: string; summary: string; status: string }> = {
  "data-contract-observatory-revision-evidence": {
    question: "When does a public data feed stop telling the truth?",
    summary:
      "A real ECB series, a frozen consumer contract, and a monitor that keeps broken data apart from unusual data.",
    status: "Released v1.0.0 · post-release audit added",
  },
  "fairshift-lab-robustness": {
    question: "Does a fairness measurement survive a change in population?",
    summary:
      "Synthetic stress tests and governed historical evidence, with person-level uncertainty so gap reductions are not over-read.",
    status: "Released v1.3.0 · post-release audit added",
  },
  "backtests-lie-selection-bias": {
    question: "How good does the best of thousands of backtests look on pure noise?",
    summary:
      "The best of 4,916 rules shows a Sharpe ratio near 1.2 in-sample and about zero on new data. Limits stated first.",
    status: "Ready for review · not yet published",
  },
};

export const catalog: CatalogEntry[] = [
  { title: "Data Contract Observatory", field: "Data engineering", kind: "release", status: "Released v1.0.0, maintained", detail: "Real ECB feed, nine injected faults, 7,010-day replay.", slug: "data-contract-observatory-revision-evidence" },
  { title: "Fairshift Lab", field: "Responsible AI", kind: "release", status: "Released v1.3.0, maintained", detail: "Synthetic shifts, Adult-data external study, robustness lab.", slug: "fairshift-lab-robustness" },
  { title: "Backtests lie", field: "Quantitative finance", kind: "release", status: "Ready for review, unpublished", detail: "Selection bias across 4,916 rules; real EUR/USD walk-forward.", slug: "backtests-lie-selection-bias" },
  { title: "Climate Twin Frankfurt", field: "Climate data", kind: "release", status: "Released v1.0.0, frozen", detail: "Urban-heat-island gap with station-relocation steps.", slug: "climate-twin-frankfurt-heat-island" },
  { title: "FRB Atlas", field: "Astrophysics", kind: "release", status: "Released v1.0.0, frozen", detail: "Catalog reanalysis with cluster-aware inference.", slug: "frb-atlas-dispersion-measure" },
  { title: "Folding's Edge", field: "Structural biology", kind: "release", status: "Released v1.0.0, frozen", detail: "AlphaFold confidence against protein disorder.", slug: "foldings-edge-plddt-disorder" },
  { title: "Neuro Signal Lab", field: "Neuroscience", kind: "release", status: "Released v1.0.0, frozen", detail: "Fixed P3b endpoint on an independent EEG dataset.", slug: "neuro-signal-lab-p3b-robustness" },
  { title: "Reaction Integrity Lab", field: "Computational chemistry", kind: "release", status: "Released v1.0.0, frozen", detail: "Split integrity of a 691,142-reaction benchmark.", slug: "reaction-integrity-lab-cleaning-leakage" },
  { title: "Neural Geometry Lab", field: "Machine learning", kind: "release", status: "Released v1.0.0, frozen", detail: "Neural-collapse coordinates and accuracy.", slug: "neural-geometry-lab-collapse" },
  { title: "Snowflake Evolution Lab", field: "Evolutionary biology", kind: "release", status: "Released v1.0.1, frozen", detail: "Genome duplication and macroscopic size.", slug: "snowflake-evolution-lab-individuality" },
  { title: "Three-Body Lab", field: "Physics", kind: "release", status: "Released v1.0.0, frozen", detail: "Chaos boundary in a validated integrator.", slug: "three-body-lab-chaos-boundary" },
  { title: "Jovian Resonance Lab", field: "Astronomy", kind: "release", status: "Released v1.0.0, frozen", detail: "Laplace angle across two frozen decades.", slug: "jovian-resonance-lab-laplace-angle" },
  { title: "Mathlab WASM", field: "Numerical analysis", kind: "release", status: "Released v1.0.0, frozen", detail: "Root finding and what stopping rules certify.", slug: "mathlab-wasm-root-finding" },
  { title: "Wormhole Lab", field: "General relativity", kind: "experiment", status: "Exploratory, not audited, no note", detail: "Morris-Thorne wormhole with a frozen registry and a site; no paper reviewed yet.", repo: "https://github.com/lindgreendavid/wormhole-lab" },
  { title: "Zeta Zeros Lab", field: "Number theory", kind: "experiment", status: "Exploratory, no note", detail: "Zeros of the Riemann zeta function against random-matrix statistics.", repo: "https://github.com/lindgreendavid/zeta-zeros-lab" },
  { title: "Do ECB rate decisions move EUR/USD?", field: "Event study", kind: "proposed", status: "Proposed", detail: "Event study with bootstrap intervals. Not started." },
  { title: "How good is the yield curve as a recession signal?", field: "Macro", kind: "proposed", status: "Proposed", detail: "Base rates and tiny-sample honesty. Not started." },
];

export const kindCopy: Record<Kind, { title: string; blurb: string }> = {
  release: {
    title: "Research releases",
    blurb: "Versioned, with a protocol written before results, a reproducible registry and stated limits.",
  },
  experiment: {
    title: "Exploratory experiments",
    blurb: "Built and working, but not audited or written up as a note. Treat as learning material.",
  },
  proposed: {
    title: "Proposed",
    blurb: "Ideas worth doing. Nothing here exists yet.",
  },
};
