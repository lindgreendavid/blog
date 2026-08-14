---
slug: mathlab-wasm-root-finding
title: "When the fast step looks unsafe, the bracket takes over."
project: Mathlab WASM
field: Numerical Analysis / Scientific Computing
date: 2026-08-14
repo: https://github.com/lindgreendavid/mathlab-wasm
tool: https://lindgreendavid.github.io/mathlab-wasm/
report: https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/research-report.md
---

**Current research status:** product v0.2.0 adds a prespecified Brent–Dekker-style safeguarded
root finder to the unchanged seven-case v0.1 foundation. All five new qualitative expectations
pass. These are selected deterministic demonstrations of established numerical behavior—not a
representative solver benchmark, production-library reproduction, or claim of novel mathematics.

## The question

A fast numerical step can be attractive and still be unsafe. Can a hybrid use secant or
inverse-quadratic interpolation when the proposal is defensible, fall back to bisection when it is
not, and keep the containing bracket visible throughout?

Mathlab WASM now compares four one-dimensional methods under binary64 arithmetic, `10⁻¹⁰`
position and residual tolerances, and an 80-iteration budget. The primary result remains the solver
status. For the safeguarded method, each trace also records the accepted move and both bracket
endpoints.

## What was fixed before the result

The v0.2 protocol was published in commit
`e4c6f222c22f163b909503d05ead800394757f26` before the safeguarded solver was implemented or its
report generated. It fixed five cases: the cubic and cosine equations, the deliberately skewed
`x¹⁰−1` equation, an exact endpoint root, and an even-multiplicity root without an endpoint sign
change.

The acceptance rules required the expected status, root error below `10⁻⁹` where applicable,
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
- The skewed `x¹⁰−1` case reached 1 exactly in eleven iterations and thirteen evaluations. Its
  trace contains secant, inverse-quadratic, and bisection moves—the prespecified safeguard
  demonstration.
- The exact endpoint root of `x³` at zero was accepted with two initial evaluations and no
  iterative update.
- The interval `[0,2]` for `(x−1)²` was rejected because it lacks the required sign change. That is
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
`16 × ε × (1 + scale)`. The unchanged v0.1 report retains its byte comparison. Cross-platform byte
identity is withdrawn as an unsupported claim.

## Try it yourself

Open the [interactive root-finding microscope](https://lindgreendavid.github.io/mathlab-wasm/),
select **Safeguarded hybrid**, then choose `x¹⁰−1`. The table labels every accepted move as secant,
inverse quadratic, or bisection and shows the retained bracket beside the residual and iterate.

## How to read the result

The hybrid does not make interpolation globally safe by assertion. Its protection comes from the
sign-changing bracket and the explicit decision to reject unsuitable proposals. That guarantee
still depends on continuity, finite evaluations, a valid starting bracket, and the documented
floating-point safeguards. A small residual alone remains insufficient as a universal root-error
certificate.

## Learn more

- [NIST DLMF §3.8, Nonlinear Equations](https://dlmf.nist.gov/3.8) — authoritative definitions and bounded convergence statements.
- [Brent (1971)](https://doi.org/10.1093/comjnl/14.4.422) — the primary guaranteed-convergence construction combining interpolation and bracketing.
- [Frozen v0.2 protocol](https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/protocol-v0.2.md) — scenarios, acceptance criteria, and dated amendment.
- [Machine-readable v0.2 report](https://github.com/lindgreendavid/mathlab-wasm/blob/main/reports/v0.2-safeguarded-root-finding.json) — traces, brackets, step kinds, and acceptance checks.
- [v0.2 release audit](https://github.com/lindgreendavid/mathlab-wasm/blob/main/docs/v0.2-release-audit.md) — completed gates and remaining limits.
- [Unchanged v0.1 report](https://github.com/lindgreendavid/mathlab-wasm/blob/main/reports/v0.1-root-finding.json) — the original bisection, Newton, and secant foundation.
