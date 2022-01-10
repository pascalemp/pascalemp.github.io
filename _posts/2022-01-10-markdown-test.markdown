---
title: "Markdown Test (CycleGAN)"
# Title should be <= 45 characters but no less than 30.
layout: post
date: 2022-01-10 12:00
tag: mkdowntest
image: https://cdn-icons.flaticon.com/png/512/518/premium/518009.png?token=exp=1641817164~hmac=19ec001642a9de6e6b07c5995beee2e1
#image: https://github.com/pascalemp/pascalemp.github.io/blob/main/assets/images/virus.png
headerImage: true
projects: true
hidden: true # don't count this post in blog pagination
description: "This is a Markdown test for some Notion stuff I wrote"
category: project
author: pascalemp
externalLink: false
---

# CycleGAN UDA Research

## ***Architecture Considerations***

- As mentioned in [this](https://arxiv.org/pdf/2009.04985.pdf) paper, using traditional Conv2DTranspose layers can produce checkerboard artefacts, so by replacing Conv2DTranspose layers with Upsample2D using nearest neighbor approximation, followed by a traditional convolutional layer, we can eliminate these artefacts.
- The Lambda Identity term seems to be very important in not modifying the original morphology, but rather the observed intensity values - which is of particular importance within medical imaging.
- Add Gaussian Noise to outputs of all Convolutional Layers in the Discriminator to [improve performance and image quality](https://arxiv.org/pdf/1801.04406.pdf)?
- GAN is unstable - losses become NaN at times - need to find a way to rectify this. Check if any of the losses are < 0: this may cause potential instability with CrossEntropy Loss? If this is the case, consider clamping the loss values to be no smaller than 1e-9.

## ***Experimentation and Results***

***Quick Explanation of Conv2DTranspose:***

- It is ***not*** a deconvolution, they effectively act as upscalers and are often used in encoder-decoder networks. Deconvolution can be thought of as inputting an image into a network and returning the same image. The difference is, transposed convolutions will take an input image and return a transformed version, i.e. a probability heatmap of the image etc.
- Conv2DTranspose is used for super-resolution or semantic segmentation networks - they are also used to upsample images at intermediate layers in GANs.
    
    ***Illustrative Example of Conv2DTranspose:***
    
    - Suppose we have an input of size 2x2 and we wish to generate (upsample) to a 3x3 output.
    - We start with out 2x2 input and also a 2x2 convolutional kernel with a stride of 1 and pad of 0.
    - The calculation of the output is colour coded at each step, then any overlapping regions are summed to produce the final 3x3 output:
    
    ![Untitled](CycleGAN%20UDA%20Research%200742a0fe2bd64944bb50c4da45f23ae6/Untitled.png)
    
    - The output is then a 3x3 matrix with the following values:
    
    $$
    \begin{equation}\begin{array}{|c|c|c|}\hline 6 & 14 & 4 \\\hline 2 & 17 & 21 \\\hline 0 & 1 & 5 \\\hline\end{array}\end{equation}
    $$
    
    - Seeing as we have a convolutional kernel, the values within it are able to be trained as the network weights update, so not only does the image begin to upsample, it can also determine a kernel that provides the best means of upsampling (it may learn that bicubic upsamping is better in one case than nearest neighbour for instance).
    - Visually, what we are doing is taking the original input (2x2) and padding it with 0s before we convolve over it with the kernel:
    
    ![Input (Blue), Convolutional Kernel (Turquoise), Zero Padding (White Spaces)](CycleGAN%20UDA%20Research%200742a0fe2bd64944bb50c4da45f23ae6/Untitled%201.png)
    
    Input (Blue), Convolutional Kernel (Turquoise), Zero Padding (White Spaces)
    
    - In our example, the 2x2 input would be padded with 0s such that it becomes a 4x4 input with a 2x2 segment in the middle surrounded by 0s. You can see how much padding is applied to the input by taking the bottom corner of the 2x2 convolutional kernel and placing it in the top corner of the input kernel (before padding) and the overlapping region is where 0s need to be padded; as displayed in (2) below:
    
    $$
    \begin{equation}\begin{array}{|c|c|c|c|}\hline 0 & 0 & 0 & 0 \\\hline 0 & 1 & 1 & 0 \\\hline 0 & 1 & 1 & 0 \\\hline 0 & 0 & 0 & 0 \\\hline\end{array}\end{equation}
    $$
    

***Conv2DTranspose vs. Upsampling:***

- The inclusion of Upsampling, followed by a traditional Convolutional Layer removes checkerboard artefacts within the model, it tends to produce “cleaner” images from my experimentation, but often results in softer images and an inherent lack of detail during training, especially with complex scenes (such as Cardiac MRI).
- I performed a set of tests, comparing the results of traditional Conv2DTranspose, as displayed in the original CycleGAN paper and Upsampling layers followed by a traditional Convolutional Layer; the results are as follows:

![Figure 1: Upsample + Convolutional Layer - Source Image (Left) vs. Output (Right) after 10,000 iterations.](CycleGAN%20UDA%20Research%200742a0fe2bd64944bb50c4da45f23ae6/Untitled%202.png)

Figure 1: Upsample + Convolutional Layer - Source Image (Left) vs. Output (Right) after 10,000 iterations.

![Figure 2: Conv2DTranspose - Source Image (Left) vs. Output (Right) after 10,000 iterations.](CycleGAN%20UDA%20Research%200742a0fe2bd64944bb50c4da45f23ae6/Untitled%203.png)

Figure 2: Conv2DTranspose - Source Image (Left) vs. Output (Right) after 10,000 iterations.

- As can be seen from the above images, although there are significant artefacts present in Figure 2, the image is much sharper in the output. In comparison, Figure 1 has a much “cleaner” look, however it lacks intrinsic detail and appears more “smudged”. It is important to note that the upsample + convolution operation was only included in the upsampling portion of the generator architecture and not also adding convolutional block before each downsampling layer, as mentioned in [this](https://arxiv.org/pdf/2010.12347.pdf) paper.
- The “blurriness” may have been attributed to the fact that when using simple upsampling followed by a convolutional block, the upsample method is constant, and in this case was a nearest-neighbour upsample. Since upsample is not a trainable kernel, in contrast to Conv2DTranspose, this may have not been the best upsampling method that the network could have utilised. By utilising Conv2DTranspose, although there may be more checkerboard artefacts and it may result in slower training, the model has the potential to learn a more optimal upsampling method.
- Given more time, it may have been useful to investigate this architecture too, to see if it eliminates the blurriness; but for now, the traditional Conv2DTranspose CycleGAN has been utilised.

***Adding Gaussian Noise to Discriminator:***

- TODO - Mention how useful this was in slowing the discriminator training early and stabilising the GAN in general, producing more meaningful outputs and sharper images (justify this with evidence and a source).

***Addition of Lambda Identity and how essential it is:***

- TODO - Mention the fact it affects luminance (verify this) and how important that is for medical imaging.

***Mention GAN Instability - Losses becoming NaN:***

- TODO - Mention it may be to do with Cross Entropy Loss term having a value that is negative resulting in an imaginary number from the log output?
- [https://arxiv.org/pdf/1801.04406.pdf](https://arxiv.org/pdf/1801.04406.pdf)
- [https://stackoverflow.com/questions/40050397/deep-learning-nan-loss-reasons](https://stackoverflow.com/questions/40050397/deep-learning-nan-loss-reasons)

## Analysis of Failure Modes in Unsupervised Image-To-Image Translation

[[https://cs-people.bu.edu/usmn/pdf/oral_exam.pdf](https://cs-people.bu.edu/usmn/pdf/oral_exam.pdf)](https://www.youtube.com/watch?v=hptf391weV4&list=PLMIEcgjUYPH7boOkXDBw40HCalC85l6zF&index=1)

[https://cs-people.bu.edu/usmn/pdf/oral_exam.pdf](https://cs-people.bu.edu/usmn/pdf/oral_exam.pdf)

### Main Problem and Motivation

- Assume we have many source images and a set of target images (i.e. Cats and Dogs) and want to map each unique cat with all of it’s features (face, colour, age etc.) to a unique dog with all of these features.
- Formally, we assume we have two distributions $X,Y$ and we wish to define a function $F$ that ensures a bijective cross domain mapping:

$$
F_{XY}: X \rightarrow Y
$$

- This effectively means that if we apply this function to all images of cats, we will get all images of dogs, and each generated dog from a cat, will be semantically consistent (with it’s visual features).
- The issue is, we need to learn this cross-domain mapping $F_{XY}$ since we are attempting to generalise this in an unsupervised manner, with no labelled data.

### The Issue With This Generalisation

- Consider a dataset of males and females (CelebA for instance), if we want to learn a mapping from male to female, there is no direct feature on females that will determine whether or not the male should have a beard. What will likely happen is the model will arbitrarily choose a feature to represent a beard, in order to learn a bijective mapping.
- This will likely return a mapping that is discontinuous and not particularly meaningful - this is effectively analogous to learning a continuous mapping between two manifolds of different dimensions; and this would result in a many-to-many mapping:

![Untitled](CycleGAN%20UDA%20Research%200742a0fe2bd64944bb50c4da45f23ae6/Untitled%204.png)

- The many-to-many mapping problem is considerably more difficult to solve, and we need to first solve the much simpler one-to-one (bijective) mapping problem.
- This issue can also arise with the cat-to-dog example, but we are assuming (for simplicity) that this is a more simpler bijective mapping only.

### How to find a good \(F_{XY}\)?

- The assumption we make is that there is a true “correct” mapping that we wish to uncover between the two distributions.
- The goal is to take some image in the first distribution $X$ and pass to $F_{XY}$, such that we minimise the statistical distance between the output of $F_{XY}$ and the target distribution $Y$; formally we define this as follows:

---

Suppose that $F_{XY} : X \rightarrow Y$ is a function mapping $x \in X$ to $y \in Y$, where $X,Y$ are the source and target distributions respectively. We wish to minimise the statistical distance between the output of $F_{XY}$ and $Y$ in order to attain our goal of a bijective mapping:

$$
\begin{equation}\min _{F \in \mathcal{F}} d(F(A), B)+R(F)\end{equation}
$$

***Note:** Above in $(1)$, $R(F)$ defines a regularization term that restricts certain transformations; this will be formalised more later, but this is the general mathematical premise of $F_{XY}$.* 

---

Effectively, the smaller the returned distance, the closer the two images are, and the “stronger” the bijective mapping. By “stronger” I am referring to the fact that this is a heuristic approach to approximating this mapping, a true bijection would not be “strong” it would either map directly, or it wouldn’t!

This function allows initialisation of source domain images as noise, which will likely generate a high statistical distance, from which we can optimise $F_{XY}$ in order to minimise the distance and produce reliable examples from the target distribution as the source distribution begins to converge to the target distribution.

---