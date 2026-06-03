# pascalemp.github.io

Modern academic and industry CV site built with Astro.

## Local development

```bash
npm install
npm run dev
```

## Add a blog post from Obsidian

Create a folder under `src/content/blog/`:

```text
src/content/blog/2026-06-03-my-note/
  index.md
  figure-1.png
  diagram.svg
```

Use frontmatter at the top of `index.md`:

```md
---
title: My Note
date: 2026-06-03
description: Short summary for the blog index.
tags: [math, imaging, inverse-problems]
draft: false
---
```

Standard Markdown images and links are the most reliable:

```md
![A figure](./figure-1.png)
[Related note](../other-post/)
```

Inline math such as `$Ax=y$` and display math using `$$...$$` are enabled through `remark-math` and `rehype-katex`.

## Update CV data

Edit:

- `src/data/profile.json`
- `src/data/cv.json`
- `src/data/publications.json`
- `src/data/talks.json`

## Update publications

Add and edit publication entries in `src/data/publications.json`. Use `summary` to control the description shown on the site, `href` for a publication link, and `featured: true` for publications that should appear on the homepage.
