---
slug: mathlab-wasm-root-finding
title: "Newton found the root in four steps—and an exact two-cycle from another start."
project: Mathlab WASM
field: Numerical Analysis / Scientific Computing
date: 2026-08-14
repo: https://github.com/lindgreendavid/mathlab-wasm
tool: https://lindgreendavid.github.io/mathlab-wasm/
report: https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/research-report.md
---

**Current research status:** product v0.1.0 freezes a seven-case educational verification of
bisection, Newton, and secant root finding. All expected qualitative outcomes pass. The suite was
selected to expose established behavior; it is not a representative solver benchmark and makes no
claim of novel mathematics.

## The question

When a numerical method returns a root, what has actually been established? Mathlab WASM compares
three familiar one-dimensional methods under the same binary64 arithmetic, `10⁻¹⁰` position and
residual tolerances, and 80-iteration budget. The primary result is not speed. It is the reported
status: converged, invalid bracket, derivative failure, collapsed secant, non-finite iterate,
detected cycle, or exhausted budget.

## What we actually did

Before generating the committed report, we froze seven method–scenario runs. They include two
simple roots, the repeated root of `(x−1)²`, the Newton two-cycle produced by `x³−2x+2` from
`x₀=0`, and a secant update whose two starting function values are equal. We also froze the
stopping rules and denominator safeguards.

The numerical core is written once in Rust. Native tests, the machine-readable report, and the
browser's WebAssembly interface all use that same implementation. JavaScript renders the trace but
does not recompute the solver result.

## What we found

Bisection located the real root of `x³−x−2` at 1.5213797067990527 in 33 iterations and 35 function
evaluations. Its absolute residual was 3.28 × 10⁻¹¹, and its iteration count remained inside the
prespecified interval-halving bound. Newton reached 1.5213797068045676 from `x₀=1.5` in four
iterations and ten counted function/derivative evaluations.

The same Newton implementation did not always converge. For `x³−2x+2` from `x₀=0`, the trace was
exactly `0 → 1 → 0`; the method reported a cycle after two iterations instead of exhausting the
budget or claiming a root. For the repeated root `(x−1)²`, Newton converged in 34 iterations—an
inspectable reminder that its familiar quadratic rate is local to a simple root under suitable
conditions.

Secant iteration solved `cos(x)−x=0` at 0.7390851332151607 in seven iterations without an analytic
derivative. But when started at 0 and 2 for `(x−1)²`, both function values were 1. The slope
denominator therefore collapsed, and the implementation reported that failure rather than dividing
by zero.

Bisection rejected `[0,2]` for `(x−1)²` because both endpoint values have the same sign. That does
not mean the interval contains no root: the even-multiplicity root at 1 touches zero without changing
sign. The result is a failed bracket certificate, not a root-existence verdict.

## Try it yourself

The [interactive root-finding microscope](https://lindgreendavid.github.io/mathlab-wasm/) lets you
change function, method, starting values, tolerance, and iteration budget. It plots residual or
position, shows every exact iterate, and keeps method failure visible as a legitimate result.

## How to read the result

Bisection's slower progress buys an interval certificate only when continuity and a sign-changing
bracket hold. Newton's speed near a selected simple root does not create a global convergence
guarantee. Secant avoids an analytic derivative but still requires distinct enough function values.
A small residual is also not universally equivalent to small root error, especially near an
ill-conditioned zero.

## Learn more

- [NIST DLMF §3.8, Nonlinear Equations](https://dlmf.nist.gov/3.8) — authoritative formulas and bounded convergence statements.
- [Brent (1971)](https://doi.org/10.1093/comjnl/14.4.422) — a classic safeguarded combination of interpolation and bisection; cited for context, not implemented in v0.1.
- [IEEE 754-2019](https://doi.org/10.1109/IEEESTD.2019.8766229) — the floating-point standard underlying the arithmetic boundary.
- [Frozen protocol](https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/protocol.md) — scenarios, endpoints, tolerances, and acceptance criteria.
- [Machine-readable v0.1 report](https://github.com/lindgreendavid/mathlab-wasm/blob/main/reports/v0.1-root-finding.json) — every status, iterate, residual, and evaluation count.
- [Release audit](https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/v0.1-release-audit.md) — completed checks and remaining limits.

