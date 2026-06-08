---
title: "Bounded Variation: The Mathematical Foundation of TV Regularization"
date: 2026-06-08
description: A collection of useful preliminary definitions etc.
tags: [math, imaging, inverse-problems]
draft: false
---

# Bounded Variation (BV): Definitions and Key Facts

## Definition of Bounded Variation

Let $\Omega \subset \mathbb{R}^N$ be open and let $u \in L^1(\Omega)$.

The total variation of $u$ in $\Omega$ is defined by

$$
V(u,\Omega)
=
\sup \Bigg\{
\int_\Omega u\,\operatorname{div}(\varphi)\,dx
:
\varphi \in C_c^1(\Omega;\mathbb{R}^N),
\ \|\varphi\|_\infty \le 1
\Bigg\}.
$$

We say that $u$ has bounded variation if

$$
V(u,\Omega) < \infty.
$$

The space of functions of bounded variation is

$$
BV(\Omega)
=
\Big\{
u \in L^1(\Omega)
:
V(u,\Omega)<\infty
\Big\}.
$$

---

## Distributional Characterization

A function $u \in L^1(\Omega)$ belongs to $BV(\Omega)$ if and only if its distributional derivative can be represented by a finite vector-valued Radon measure.

More precisely,

$$
Du \in \mathcal{M}(\Omega;\mathbb{R}^N),
$$

where

$$
\mathcal{M}(\Omega;\mathbb{R}^N)
=
\left\{
\text{finite }\mathbb{R}^N\text{-valued Radon measures on }\Omega
\right\}.
$$

The distributional derivative is defined by the integration-by-parts identity

$$
\int_\Omega u\, \partial_i\varphi\, dx
=
-\int_\Omega \varphi\,dD_i u,
\qquad
\forall \varphi \in C_c^\infty(\Omega).
$$

Writing

$$
Du=(D_1u,\dots,D_Nu),
$$

each component $D_i u$ is a signed Radon measure.

---

## Total Variation Measure

The total variation measure associated with $Du$ is denoted by $|Du|$.

For every Borel set $A\subset\Omega$,

$$
|Du|(A)
=
\sup
\left\{
\int_A \varphi\,dDu
:
\varphi \in C_c(A;\mathbb{R}^N),
\ \|\varphi\|_\infty \le 1
\right\}.
$$

The measure $|Du|$ is positive and records the magnitude of the distributional derivative.

---

## Fundamental Identity

A key result is

$$
\boxed{
V(u,\Omega)=|Du|(\Omega)
}
$$

Indeed,

$$
\int_\Omega u\operatorname{div}\varphi\,dx
=
-\int_\Omega \varphi\, dDu,
$$

so the definition of total variation coincides exactly with the definition of the total variation measure evaluated on $\Omega$.

---

## Relation to Sobolev Spaces

Every Sobolev function belongs to $BV$:

$$
W^{1,1}(\Omega)
\subset
BV(\Omega).
$$

If $u\in W^{1,1}(\Omega)$, then the distributional derivative is absolutely continuous with respect to Lebesgue measure and

$$
Du
=
\nabla u,\mathcal{L}^N,
$$

where $\mathcal{L}^N$ denotes $N$-dimensional Lebesgue measure.

The inclusion is strict:

$$
W^{1,1}(\Omega)
\subsetneq
BV(\Omega).
$$

A classical example of a function in $BV(\Omega)$ but not in $W^{1,1}(\Omega)$ is the Heaviside function.

---

## Useful Facts

- $u \in BV(\Omega)$ if and only if its distributional derivative $Du$ is a finite $\mathbb{R}^N$-valued Radon measure.

- The derivative of a $BV$ function need not be a function; it may contain singular parts concentrated on lower-dimensional sets.

- Functions in $BV$ are allowed to have jump discontinuities.

- The total variation of a $BV$ function is exactly the mass of the measure $|Du|$:

  $$
  V(u,\Omega)=|Du|(\Omega).
  $$

- Every Sobolev function belongs to $BV$:

  $$
  W^{1,1}(\Omega)\subset BV(\Omega).
  $$

- The inclusion is strict:

  $$
  W^{1,1}(\Omega)\subsetneq BV(\Omega).
  $$

- The Heaviside function belongs to $BV$ but not to $W^{1,1}$.

---

## Geometric Intuition

Bounded variation measures the total amount of oscillation of a function.

Unlike Sobolev spaces, $BV$ permits jump discontinuities while still retaining a meaningful notion of derivative through Radon measures. This makes $BV$ the natural setting for:

- functions with jumps,
- image processing and total variation regularization,
- sets of finite perimeter,
- geometric measure theory,
- conservation laws and weak solutions of PDEs.