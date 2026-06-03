---
title: Unsupervised Super-Resolution of 3D Medical Images
date: 2024-10-15
description: MPhil thesis on unsupervised learning for generalised super-resolution of anisotropic 3D medical imaging via domain transfer.
tags: [medical imaging, inverse problems, deep learning, super-resolution]
featured: true
links: []
---

## Background

This thesis was written during my MPhil in Machine Learning at University College London:
*Unsupervised Learning for Generalised Super-Resolution of 3D Anisotropic Medical Images via Domain Transfer*.

## Abstract

Three-dimensional imaging is popular in medical applications, but anisotropic 3D volumes with thick, low-spatial-resolution slices are often acquired to reduce scan times. Deep learning offers a route to recover high-resolution features through super-resolution reconstruction.

The thesis proposed CLADE: Cycle Loss Augmented Degradation Enhancement. CLADE uses a modified CycleGAN-based architecture with a cycle-consistent gradient mapping loss and a weight demodulation process. The approach is trained without paired supervision to learn super-resolution reconstruction of the low-resolution dimension from disjoint patches of the high-resolution plane within the anisotropic 3D volume data itself.
