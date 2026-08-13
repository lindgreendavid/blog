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

## The question

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
- The [source code](https://github.com/lindgreendavid/three-body-lab) is MIT-licensed; the registry regenerates byte-for-byte deterministically if you want to check our work yourself.
