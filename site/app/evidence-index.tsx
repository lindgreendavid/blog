"use client";

import { useState } from "react";

type Relation = "Primary" | "Supports" | "Limits" | "Method";

interface EvidenceSource {
  relation: Relation;
  label: string;
  url: string;
}

interface EvidenceRecord {
  slug: string;
  name: string;
  field: string;
  evidenceType: string;
  assessment: string;
  sources: EvidenceSource[];
  dataset: { label: string; url: string };
  report: string;
  artifact: { label: string; url: string };
}

const evidence: EvidenceRecord[] = [
  {
    slug: "fairshift",
    name: "Fairshift Lab",
    field: "Responsible AI",
    evidenceType: "Controlled simulation plus one historical external dataset",
    assessment:
      "Strong for the tested failure mechanisms; limited for real deployment behavior or other populations.",
    sources: [
      {
        relation: "Primary",
        label: "Hardt, Price & Srebro (2016), Equality of Opportunity",
        url: "https://proceedings.neurips.cc/paper_files/paper/2016/hash/6a9659feb1216f14f7384ba499518b38-Abstract.html",
      },
      {
        relation: "Supports",
        label: "Ovadia et al. (2019), uncertainty under dataset shift",
        url: "https://proceedings.neurips.cc/paper_files/paper/2019/hash/8558cb408c1d76621371888657d2eb1d-Abstract.html",
      },
      {
        relation: "Limits",
        label: "Corbett-Davies et al. (2023), measure and mismeasure of fairness",
        url: "https://jmlr.org/papers/v24/22-1511.html",
      },
    ],
    dataset: { label: "UCI Adult dataset", url: "https://doi.org/10.24432/C5XW20" },
    report: "https://github.com/lindgreendavid/fairshift-lab/blob/main/docs/research-report.md",
    artifact: {
      label: "Reproduction guide",
      url: "https://github.com/lindgreendavid/fairshift-lab#quick-start",
    },
  },
  {
    slug: "three-body",
    name: "Three-Body Lab",
    field: "Computational physics",
    evidenceType: "Validated numerical experiment anchored to analytical results",
    assessment:
      "Strong for numerical behavior inside the frozen grid; not evidence of rigorous or long-term orbital stability.",
    sources: [
      {
        relation: "Primary",
        label: "Routh (1875), triangular-solution stability criterion",
        url: "https://doi.org/10.1112/plms/s1-6.1.86",
      },
      {
        relation: "Limits",
        label: "Roberts (2007), rigorous linear stability of the figure-eight orbit",
        url: "https://doi.org/10.1017/S0143385707000284",
      },
    ],
    dataset: {
      label: "Frozen 42-cell simulation registry",
      url: "https://github.com/lindgreendavid/three-body-lab/blob/main/reports/v0.1-lyapunov-registry.json",
    },
    report: "https://github.com/lindgreendavid/three-body-lab/blob/main/docs/research-report.md",
    artifact: {
      label: "Reproduction instructions",
      url: "https://github.com/lindgreendavid/three-body-lab#reproduce-the-registry",
    },
  },
  {
    slug: "frb",
    name: "FRB Atlas",
    field: "Astrophysics",
    evidenceType: "Single-catalog reanalysis with a disclosed post-hoc source-level check",
    assessment:
      "Moderate for this catalog's sample-dependent contrast; weak for distinct FRB populations or other surveys.",
    sources: [
      {
        relation: "Primary",
        label: "CHIME/FRB Catalog 1 (Amiri et al., 2021)",
        url: "https://doi.org/10.3847/1538-4365/ac33ab",
      },
      {
        relation: "Supports",
        label: "CHIME/FRB discovery of 25 repeating sources (2023)",
        url: "https://doi.org/10.3847/1538-4357/acc6c1",
      },
      {
        relation: "Limits",
        label: "Catalog erratum: all-sky rate only, not analyzed columns",
        url: "https://doi.org/10.3847/1538-4365/acb54c",
      },
    ],
    dataset: {
      label: "VizieR J/ApJS/257/59 table 2",
      url: "https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/ApJS/257/59",
    },
    report: "https://github.com/lindgreendavid/frb-atlas/blob/main/docs/research-report.md",
    artifact: {
      label: "Frozen result registry",
      url: "https://github.com/lindgreendavid/frb-atlas/blob/main/reports/v0.1-frb-registry.json",
    },
  },
  {
    slug: "folding",
    name: "Folding’s Edge",
    field: "Structural biology",
    evidenceType: "Curated database reanalysis with protein-cluster sensitivity",
    assessment:
      "Strong for the tested human-protein snapshot; limited by curation coverage, organism, and database version.",
    sources: [
      {
        relation: "Primary",
        label: "Alderson et al. (2023), conditionally folded IDRs",
        url: "https://doi.org/10.1073/pnas.2304302120",
      },
      {
        relation: "Supports",
        label: "Jumper et al. (2021), AlphaFold",
        url: "https://doi.org/10.1038/s41586-021-03819-2",
      },
      {
        relation: "Method",
        label: "ASA statement on p-values and scientific interpretation",
        url: "https://doi.org/10.1080/00031305.2016.1154108",
      },
    ],
    dataset: { label: "DisProt", url: "https://disprot.org/" },
    report: "https://github.com/lindgreendavid/foldings-edge/blob/main/docs/research-report.md",
    artifact: {
      label: "Protein-cluster sensitivity artifact",
      url: "https://github.com/lindgreendavid/foldings-edge/blob/main/reports/post-release-academic-sensitivity.json",
    },
  },
  {
    slug: "climate",
    name: "Climate Twin Frankfurt",
    field: "Climate science",
    evidenceType: "Paired observational station study with block and HAC sensitivities",
    assessment:
      "Strong for the measured Westend–airport temperature contrast; limited for city-wide causal attribution.",
    sources: [
      {
        relation: "Primary",
        label: "DWD urban-climate station program",
        url: "https://www.dwd.de/EN/ourservices/urban_heatisland/urbanheatisland_en.html",
      },
      {
        relation: "Method",
        label: "Newey & West (1987), HAC covariance",
        url: "https://doi.org/10.2307/1913610",
      },
      {
        relation: "Supports",
        label: "Santer et al. (2000), autocorrelation in climate trends",
        url: "https://doi.org/10.1029/1999JD901105",
      },
    ],
    dataset: {
      label: "DWD Climate Data Center",
      url: "https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/daily/kl/",
    },
    report: "https://github.com/lindgreendavid/climate-twin-frankfurt/blob/main/docs/research-report.md",
    artifact: {
      label: "HAC sensitivity artifact",
      url: "https://github.com/lindgreendavid/climate-twin-frankfurt/blob/main/reports/post-release-academic-sensitivity.json",
    },
  },
  {
    slug: "neuro",
    name: "Neuro Signal Lab",
    field: "Neuroscience",
    evidenceType: "Fixed endpoint transferred to an independent public EEG dataset",
    assessment:
      "Strong for the narrow P3b contrast in this sample; not brain localization, diagnosis, or a consciousness marker.",
    sources: [
      {
        relation: "Primary",
        label: "Kappenman et al. (2021), ERP CORE",
        url: "https://doi.org/10.1016/j.neuroimage.2020.117465",
      },
      {
        relation: "Limits",
        label: "Pitts et al. (2014), P3b and task relevance/report",
        url: "https://doi.org/10.3389/fpsyg.2014.01078",
      },
    ],
    dataset: {
      label: "OpenNeuro ds003061 v1.1.0",
      url: "https://doi.org/10.18112/openneuro.ds003061.v1.1.0",
    },
    report: "https://github.com/lindgreendavid/neuro-signal-lab/blob/main/docs/research-report.md",
    artifact: {
      label: "Frozen result registry",
      url: "https://github.com/lindgreendavid/neuro-signal-lab/tree/main/results",
    },
  },
  {
    slug: "contracts",
    name: "Data Contract Observatory",
    field: "Data observability",
    evidenceType: "Fault-suite validation plus an append-only prospective ledger",
    assessment:
      "Strong for controlled fault detection; early for real revision frequency, delay, and false-alarm behavior.",
    sources: [
      {
        relation: "Primary",
        label: "ECB Data Portal API specification",
        url: "https://data.ecb.europa.eu/help/api/data",
      },
      {
        relation: "Limits",
        label: "ECB reference-rate framework and publication purpose",
        url: "https://www.ecb.europa.eu/stats/pdf/exchange/Frameworkfortheeuroforeignexchangereferencerates.en.pdf",
      },
    ],
    dataset: {
      label: "ECB USD/EUR reference-rate series",
      url: "https://data.ecb.europa.eu/data/datasets/EXR/EXR.D.USD.EUR.SP00.A",
    },
    report: "https://github.com/lindgreendavid/data-contract-observatory/blob/main/README.md",
    artifact: {
      label: "Append-only evidence branch",
      url: "https://github.com/lindgreendavid/data-contract-observatory/tree/evidence",
    },
  },
  {
    slug: "reaction-integrity",
    name: "Reaction Integrity Lab",
    field: "Computational chemistry / machine learning",
    evidenceType: "Known-result reproduction with baseline, split, similarity, and provenance audits",
    assessment:
      "Strong for source identity, all four baselines, exact separation, and prespecified product-overlap evidence; neural checkpoints and patent-family inference remain unavailable.",
    sources: [
      {
        relation: "Primary",
        label: "Wigh et al. (2024), ORDerly",
        url: "https://doi.org/10.1021/acs.jcim.4c00292",
      },
      {
        relation: "Supports",
        label: "Schwaller et al. (2021), structural bias in reaction prediction",
        url: "https://doi.org/10.1038/s42256-021-00338-1",
      },
      {
        relation: "Limits",
        label: "Guo et al. (2025), harder chemistry-aware evaluation splits",
        url: "https://doi.org/10.1021/acscentsci.5c00055",
      },
    ],
    dataset: {
      label: "ORDerly benchmark v4",
      url: "https://doi.org/10.6084/m9.figshare.23298467.v4",
    },
    report:
      "https://github.com/lindgreendavid/reaction-integrity-lab/blob/main/docs/research-report.md",
    artifact: {
      label: "Machine-readable v1 similarity and provenance audit",
      url: "https://github.com/lindgreendavid/reaction-integrity-lab/blob/main/reports/v1-similarity-audit.json",
    },
  },
  {
    slug: "mathlab-wasm",
    name: "Mathlab WASM",
    field: "Numerical analysis / scientific computing",
    evidenceType: "Prespecified deterministic verification with bracket and safeguard traces",
    assessment:
      "Strong for twelve versioned method–scenario runs and the declared bracket invariants; deliberately uninformative about solver prevalence or real-workload performance.",
    sources: [
      {
        relation: "Primary",
        label: "NIST DLMF §3.8, Nonlinear Equations",
        url: "https://dlmf.nist.gov/3.8",
      },
      {
        relation: "Supports",
        label: "Brent (1971), safeguarded zero finding",
        url: "https://doi.org/10.1093/comjnl/14.4.422",
      },
      {
        relation: "Limits",
        label: "IEEE 754-2019 floating-point arithmetic",
        url: "https://doi.org/10.1109/IEEESTD.2019.8766229",
      },
    ],
    dataset: {
      label: "Frozen five-case v0.2 safeguarded protocol",
      url: "https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/protocol-v0.2.md",
    },
    report:
      "https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/research-report.md",
    artifact: {
      label: "Machine-readable v0.2 safeguarded traces",
      url: "https://github.com/lindgreendavid/mathlab-wasm/blob/main/reports/v0.2-safeguarded-root-finding.json",
    },
  },
];

export default function EvidenceIndex() {
  const [selectedSlug, setSelectedSlug] = useState("frb");
  const selected = evidence.find((record) => record.slug === selectedSlug) ?? evidence[0];

  return (
    <section className="evidence-index" id="evidence-index" aria-labelledby="evidence-index-title">
      <div className="section-heading">
        <p className="eyebrow">Academic evidence index</p>
        <h2 id="evidence-index-title">Trace every claim to evidence—and its limit.</h2>
        <p>
          “Strength” here is always scoped: confidence in the narrow tested claim, never a
          universal score across disciplines.
        </p>
      </div>

      <div className="evidence-index__layout">
        <ul className="evidence-index__selector" aria-label="Choose a project evidence record">
          {evidence.map((record) => (
            <li key={record.slug}>
              <button
                type="button"
                aria-pressed={record.slug === selected.slug}
                onClick={() => setSelectedSlug(record.slug)}
              >
                <span>{record.field}</span>
                <strong>{record.name}</strong>
              </button>
            </li>
          ))}
        </ul>

        <article className="evidence-record" aria-live="polite">
          <p className="evidence-record__field">{selected.field}</p>
          <h3>{selected.name}</h3>
          <dl className="evidence-record__summary">
            <div>
              <dt>Evidence design</dt>
              <dd>{selected.evidenceType}</dd>
            </div>
            <div>
              <dt>Evidence assessment</dt>
              <dd>{selected.assessment}</dd>
            </div>
          </dl>

          <h4>Supporting or limiting evidence</h4>
          <ul className="evidence-sources">
            {selected.sources.map((source) => (
              <li key={source.url}>
                <span>{source.relation}</span>
                <a href={source.url}>{source.label}</a>
              </li>
            ))}
          </ul>

          <div className="evidence-record__artifacts">
            <a href={selected.dataset.url}>
              <span>Dataset</span>
              <strong>{selected.dataset.label}</strong>
            </a>
            <a href={selected.report}>
              <span>Interpretation</span>
              <strong>Full research report</strong>
            </a>
            <a href={selected.artifact.url}>
              <span>Reproduce</span>
              <strong>{selected.artifact.label}</strong>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
