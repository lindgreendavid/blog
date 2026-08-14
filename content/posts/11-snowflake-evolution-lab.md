---
slug: snowflake-evolution-lab-individuality
title: "A yeast cluster became 20,000 times larger. When did it become an individual?"
project: Snowflake Evolution Lab
field: Experimental Evolution / Multicellularity
date: 2026-08-14
repo: https://github.com/lindgreendavid/snowflake-evolution-lab
tool: https://lindgreendavid.github.io/snowflake-evolution-lab/
report: https://github.com/lindgreendavid/snowflake-evolution-lab/blob/main/docs/research-report-v0.1.md
---

**Current research status:** product v0.1.0 is a protocol-frozen reanalysis of published MuLTEE
figure-source data. It reproduces a directional relationship already motivated by the primary
paper; it is not an independent wet-lab replication or a claim to have rediscovered
multicellularity.

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

## Three newer pieces of the story

Later MuLTEE work makes the transition more interesting rather than more linear.

First, genome duplication arose early. Diploid ancestors evolved into tetraploids in both
mixotrophic and anaerobic populations, but only the anaerobic populations later became
macroscopic. Genome duplication can therefore provide larger and longer cells without being, by
itself, a sufficient explanation for macroscopic size.

Second, a small-cluster lineage and a large-cluster lineage evolved from one ancestor and remained
together for roughly 4,300 generations. Their coexistence was maintained by a trade-off between
rapid growth and survival during settling, mediated by dissolved oxygen. A new level of biological
individuality created room for ecological diversification.

Third, macroscopic clusters appear able to move nutrients without a circulatory system. Their own
metabolism creates density differences that drive fluid through the cluster. Above a size
threshold, those flows can relieve limits expected from diffusion alone. Larger size can therefore
create a physical process that makes still larger size possible.

These findings motivate a future coupled-threshold hypothesis: **genomic size amplification and an
entangling cellular geometry may need to coincide before robust macroscopic bodies emerge.** This
is a testable proposal, not a v0.1 result. A future protocol must link genomic and morphological
timing before inspecting the combined outcome.

## Try it yourself

The [interactive Snowflake Evolution Lab](https://lindgreendavid.github.io/snowflake-evolution-lab/)
lets you replay each population from transfer 0 to 600, switch between the published cluster-size
and cell-shape trajectories, and compare all metabolic treatments at day 600. The animated cluster
is deliberately labelled as an explanatory geometry model. It helps you reason about packing and
entanglement, but it is not microscopy, a fitted biological simulator, or an unobserved ancestral
reconstruction.

## Stop at the boundary

- These are five selected laboratory populations, not a random sample of evolutionary histories.
- The reanalysis uses the original authors' published means and is not an independent replication.
- Association through time does not isolate elongation from selection, mutations, or other changes.
- Snowflake yeast are undifferentiated clonal clusters, not miniature animals or plants.
- Nothing here shows that historical multicellular lineages followed the same route.

## Inspect and reproduce

- [Bozdag et al. (2023), *De novo evolution of macroscopic multicellularity*](https://doi.org/10.1038/s41586-023-06052-1) — primary experiment and mechanism.
- [Pineau et al. (2024), stable coexistence in MuLTEE](https://doi.org/10.1038/s41559-024-02367-y) — ecological diversification and oxygen-mediated trade-off.
- [Genome duplication in MuLTEE](https://pmc.ncbi.nlm.nih.gov/articles/PMC12256070/) — early tetraploidy and later aneuploid adaptation.
- [Metabolically driven flows](https://pmc.ncbi.nlm.nih.gov/articles/PMC11213004/) — emergent nutrient transport in macroscopic clusters.
- [Frozen v0.1 protocol](https://github.com/lindgreendavid/snowflake-evolution-lab/blob/main/docs/protocol-v0.1.md) — endpoints, exclusions, sensitivities, and boundaries.
- [Machine-readable result](https://github.com/lindgreendavid/snowflake-evolution-lab/blob/main/reports/results-v0.1.json) — all five coefficients and exploratory timing outputs.
- [v0.1.0 release](https://github.com/lindgreendavid/snowflake-evolution-lab/releases/tag/v0.1.0) — exact public research-product identity.
