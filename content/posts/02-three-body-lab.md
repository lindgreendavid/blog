---
slug: three-body-lab-chaos-boundary
title: "The three-body problem can't be solved. That's not the interesting part."
project: Three-Body Lab
field: Physics
date: 2026-08-13
repo: https://github.com/lindgreendavid/three-body-lab
tool: https://three-body-lab-interactive.lindgreendavid.workers.dev
report: https://github.com/lindgreendavid/three-body-lab/blob/main/docs/research-report.md
---

**Stable release:** [Three-Body Lab v1.0.0](https://github.com/lindgreendavid/three-body-lab/releases/tag/v1.0.0). The product is stable; the preregistered v0.1 study and its 42-cell registry remain unchanged and reproducible.

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
- The [source code](https://github.com/lindgreendavid/three-body-lab) is MIT-licensed; the registry regenerates byte-for-byte deterministically if you want to check our work yourself.
