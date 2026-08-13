"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Track = "all" | "ai-data" | "science";

interface Project {
  slug: string;
  name: string;
  field: string;
  track: Exclude<Track, "all">;
  question: string;
  evidence: string;
  finding: string;
  boundary: string;
  article: string;
  tool: string;
}

const projects: Project[] = [
  {
    slug: "fairshift",
    name: "Fairshift Lab",
    field: "Responsible AI",
    track: "ai-data",
    question: "Do fairness measurements survive distribution shift, noise, and misspecification?",
    evidence: "Inspectable synthetic generators plus governed 1994 Census evidence",
    finding:
      "Accuracy, calibration, and group-fairness metrics can degrade in different directions under the same stress.",
    boundary:
      "The robustness study is synthetic; the external study is one historical dataset, not a deployment guarantee.",
    article: "/posts/fairshift-lab-robustness",
    tool: "https://fairshift-lab.lindgreendavid.chatgpt.site",
  },
  {
    slug: "climate",
    name: "Climate Twin Frankfurt",
    field: "Climate / data engineering",
    track: "ai-data",
    question: "How much warmer is Westend than its DWD reference station?",
    evidence: "14,579 paired daily observations from two real DWD stations",
    finding:
      "The mean gap is +0.455°C; its confidence interval excludes zero, while the 40-year linear trend does not.",
    boundary:
      "This is one station pair, daily mean temperature, and the reference site is physically an airport.",
    article: "/posts/climate-twin-frankfurt-heat-island",
    tool: "https://climate-twin-frankfurt-interactive.lindgreendavid.workers.dev",
  },
  {
    slug: "data-contracts",
    name: "Data Contract Observatory",
    field: "Data engineering / observability",
    track: "ai-data",
    question: "When does a live public-data response stop satisfying its declared contract?",
    evidence: "One prospective ECB run, 7,010 retrospective prefixes, and nine controlled faults",
    finding:
      "All controlled faults were classified as expected; the current live response passed, while longitudinal evidence has only begun.",
    boundary:
      "Synthetic detection and a current-vintage replay cannot establish historical revision rates or production reliability.",
    article: "/posts/data-contract-observatory-revision-evidence",
    tool: "https://lindgreendavid.github.io/data-contract-observatory/",
  },
  {
    slug: "frb",
    name: "FRB Atlas",
    field: "Astrophysics",
    track: "science",
    question: "Does a key CHIME/FRB Catalog 1 comparison replicate?",
    evidence: "497 analyzed bursts from the public 536-burst catalog",
    finding:
      "Width and bandwidth replicated; the burst-level dispersion-measure result did not, largely because two repeaters dominate the sample.",
    boundary:
      "One survey, one observing band, 18 repeater sources, and a disclosed post-hoc source-level check.",
    article: "/posts/frb-atlas-dispersion-measure",
    tool: "https://frb-atlas-interactive.lindgreendavid.workers.dev",
  },
  {
    slug: "folding",
    name: "Folding’s Edge",
    field: "Structural biology",
    track: "science",
    question: "When does AlphaFold2 confidence predict curated protein disorder?",
    evidence: "228,662 residues across 387 real human proteins",
    finding:
      "pLDDT is a strong overall signal, but a threshold classifier is noisy and fails systematically on specific evidence types.",
    boundary:
      "A fixed human DisProt sample and a protein-level proxy for conditional folding; no AlphaFold3 claim.",
    article: "/posts/foldings-edge-plddt-disorder",
    tool: "https://foldings-edge-interactive.lindgreendavid.workers.dev",
  },
  {
    slug: "three-body",
    name: "Three-Body Lab",
    field: "Computational physics",
    track: "science",
    question: "Can one short-window Lyapunov threshold map a clean chaos boundary?",
    evidence: "42 preregistered sweep cells with validated conservation checks",
    finding:
      "Every tested cell crossed the threshold; Lagrange and Euler were less stable than generic cases at equal masses.",
    boundary:
      "A small planar grid, short integration windows, and an explicitly arbitrary classification threshold.",
    article: "/posts/three-body-lab-chaos-boundary",
    tool: "https://three-body-lab-interactive.lindgreendavid.workers.dev",
  },
  {
    slug: "neuro-signal",
    name: "Neuro Signal Lab",
    field: "Neuroscience",
    track: "science",
    question: "Does a fixed P3b target enhancement survive an independent auditory dataset?",
    evidence: "38 eligible runs from 13 participants in OpenNeuro ds003061 v1.1.0",
    finding:
      "All 13 participant contrasts were positive; the mean was +5.65 µV with a 95% CI from +4.83 to +6.48 µV.",
    boundary:
      "A cross-paradigm robustness confirmation, not a direct replication, brain localization, or diagnostic result.",
    article: "/posts/neuro-signal-lab-p3b-robustness",
    tool: "https://lindgreendavid.github.io/neuro-signal-lab/",
  },
];

const filters: { value: Track; label: string }[] = [
  { value: "all", label: "All research" },
  { value: "ai-data", label: "AI & data" },
  { value: "science", label: "Science" },
];

export default function ResearchExplorer() {
  const [track, setTrack] = useState<Track>("all");
  const visible = useMemo(
    () => projects.filter((project) => track === "all" || project.track === track),
    [track],
  );
  const [selectedSlug, setSelectedSlug] = useState(projects[0].slug);
  const selected =
    visible.find((project) => project.slug === selectedSlug) ?? visible[0];

  return (
    <section className="research-explorer" id="explore" aria-labelledby="explore-title">
      <div className="section-heading">
        <p className="eyebrow">Explore the evidence</p>
        <h2 id="explore-title">Research questions. Inspectable answers.</h2>
        <p>
          Filter the portfolio, choose a study, and inspect its question, evidence,
          result, and boundary before opening the full laboratory.
        </p>
      </div>

      <div className="explorer-filters" aria-label="Filter projects by research track">
        {filters.map((filter) => (
          <button
            className="filter-button"
            type="button"
            key={filter.value}
            aria-pressed={track === filter.value}
            onClick={() => setTrack(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="explorer-layout">
        <ul className="project-selector" aria-label="Research projects">
          {visible.map((project) => (
            <li key={project.slug}>
              <button
                type="button"
                className="project-choice"
                aria-pressed={project.slug === selected.slug}
                onClick={() => setSelectedSlug(project.slug)}
              >
                <span>{project.field}</span>
                <strong>{project.name}</strong>
              </button>
            </li>
          ))}
        </ul>

        <article className="evidence-panel" aria-live="polite" aria-labelledby="selected-project">
          <p className="evidence-panel__field">{selected.field}</p>
          <h3 id="selected-project">{selected.name}</h3>
          <dl>
            <div>
              <dt>Question</dt>
              <dd>{selected.question}</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>{selected.evidence}</dd>
            </div>
            <div>
              <dt>Finding</dt>
              <dd>{selected.finding}</dd>
            </div>
            <div>
              <dt>Boundary</dt>
              <dd>{selected.boundary}</dd>
            </div>
          </dl>
          <div className="evidence-panel__actions">
            <Link className="button button--primary" href={selected.article}>
              Read the article
            </Link>
            <a className="button button--ghost" href={selected.tool} target="_blank" rel="noreferrer">
              Open the interactive lab
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
