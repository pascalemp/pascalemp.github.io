---
title: My Note
date: 2026-06-03
description: A sample Obsidian-compatible note with local media and math rendering.
tags: [math, imaging, inverse-problems]
draft: false
---

This is the model for new writing: each post is a folder containing its Markdown plus any local media.

Here is inline math: $f : X \to Y$.

And display math:

$$
\operatorname*{argmin}_x \|Ax-y\|^2 + \lambda R(x)
$$

Use standard Markdown links and images for maximum portability:

```md
[Related note](../other-post/)
![A figure](./figure-1.png)
```

Obsidian-specific syntax such as `[[wikilinks]]`, `![[embedded-image.png]]`, callouts, and plugin blocks may need remark plugins or preprocessing later. Standard Markdown will render cleanly in both Obsidian and this site.
