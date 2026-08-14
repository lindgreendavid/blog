---
slug: snowflake-evolution-lab-individuality
title: "A yeast cluster became 20,000 times larger. When did it become an individual?"
project: Snowflake Evolution Lab
field: Experimental Evolution / Multicellularity
date: 2026-08-14
repo: https://github.com/lindgreendavid/snowflake-evolution-lab
tool: https://lindgreendavid.github.io/snowflake-evolution-lab/
report: https://github.com/lindgreendavid/snowflake-evolution-lab/blob/main/docs/research-report-v1.0.md
---

**Current research status:** stable product v1.0.1 preserves the frozen v0.1 morphology study and
frozen v1.0 genome-duplication result. The patch clarifies the explanatory animation without
changing either analysis. Both studies reanalyse source-author data; neither is an independent
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
- the `Fig1e` cluster-radius and `Fig2d` cell-aspect-ratio sheets;
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
`1/2⁵ = 0.03125`. That number describes directional convergence across these five lines. It is not
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
has probability `1/70 = 0.0143`; both remain below 0.05 after Holm correction (`0.0286`). Cell
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
labelled as an explanatory geometry model. Solid links are permanent chitinous parent–daughter
junctions; dashed amber links are steric contacts rather than bonds; red gaps are modelled fractures.
The packing and fracture views isolate those mechanisms, while the colony view combines them. These
cues help you reason about the proposed mechanism, but they are not microscopy, fitted biological
simulation, measured entanglement, or an unobserved ancestral reconstruction.

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
- [v1.0.1 release](https://github.com/lindgreendavid/snowflake-evolution-lab/releases/tag/v1.0.1) — current product and clarified animation semantics; frozen v0.1 and v1.0 evidence remains unchanged.
