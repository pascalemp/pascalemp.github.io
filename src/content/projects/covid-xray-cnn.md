---
title: COVID-19 X-Ray Feature Inference using CNNs
date: 2021-03-10
description: CNN-based image classification project with intermediate feature visualisation for radiographs.
tags: [Python, CNNs, medical imaging, interpretability]
featured: true
links:
  - label: Code
    href: https://github.com/pascalemp/med-cnn-feature-extraction
---

## Aim

This project implemented a convolutional neural network to classify chest X-ray images and examine features learned at different depths of the network.

The motivation was interpretability: neural networks can classify medical images effectively, but it is useful to inspect the intermediate convolutional layer outputs to better understand the visual structures being used during classification.

## Dataset

The dataset contained grayscale paediatric X-ray images labelled as pneumonia or normal, with training, testing, and validation splits.
