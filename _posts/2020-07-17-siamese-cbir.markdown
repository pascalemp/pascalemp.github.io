---
title: "Content Based Image Retrieval using Siamese Neural Networks"
layout: post
date: 2020-07-17 13:00
tag: cbir
image: https://image.flaticon.com/icons/png/512/2103/2103658.png
#image: https://github.com/pascalemp/pascalemp.github.io/blob/main/assets/images/virus.png
headerImage: true
projects: true
hidden: true # don't count this post in blog pagination
description: "This project was created at University as part of my final year undergraduate project."
category: project
author: pascalemp
externalLink: false
---

## Background

This project was created at University as part of my final year project in order to learn more about the use of Convolutional Neural Networks and their efficacy within the branch of computer vision known as Content Based Image Retrieval.

![Network Structure](https://d3i71xaburhd42.cloudfront.net/f216444d4f2959b4520c61d20003fa30a199670a/4-Figure4-1.png)

## Abstract 

Content Based Image Retrieval, otherwise known as *‘CBIR’* is a method used to extract visually similar images from a large database, based on the features of a given query image. This project explores and presents a modified approach to CBIR by using artificial neural networks, as opposed to classical computer vision techniques. The method presented in the report utilises a *Siamese Neural Network* paired with a variation of One Shot Learning, which is trained on pairs of dissimilar images in order to extract image feature vectors. Visual similarity is then deduced by utilising a distance function that compares the distance between the two feature vectors returned by the network and this will therefore provide a measure of similarity based on the image content learned by the network.

## Code Repository and Datasets

You can access the full PDF write-up <a href="https://pascalemp.github.io/CBIR-siamese-cnn/pdf/cbir.pdf" target="_blank">here</a> and the code associated with the project <a href="https://github.com/pascalemp/CBIR-siamese-cnn/" target="_blank">here</a>.

The datasets used within this project were the <a href="https://github.com/brendenlake/omniglot" target="_blank">Omniglot</a> dataset and a modifed version of the <a href="http://vision.stanford.edu/aditya86/ImageNetDogs/" target="_blank">Stanford Dogs</a> dataset.  

## Credits

The implemented network architecture is based on that of Gregory Koch et al. with the original paper is listed <a href="https://www.cs.cmu.edu/~rsalakhu/papers/oneshot1.pdf">here</a>. 

---