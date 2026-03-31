---
title: Rebuilding the blog foundation with Nuxt UI
description: A lighter UI layer, structured content collections, and a cleaner theme system for long-term publishing.
date: 2026-03-31
tags:
  - Nuxt
  - UI System
  - Blogging
featured: true
---

## Why rebuild the foundation

When a blog is meant to last, the first thing that should stabilize is not the page chrome but the publishing model behind it.

- Clear routes
- Reliable RSS
- Consistent i18n
- A theme that scales

This rebuild is about getting those fundamentals right.

::callout{color="accent" icon="i-lucide-rss"}
This starter ships with RSS, theme switching, and a bilingual content structure by default.
::

## What stays

1. `Nuxt UI` for the component layer and theme tokens
2. `Nuxt Content` for posts and pages
3. `Nuxt i18n` for route prefixes and interface copy

## What changes

The older, scattered setup is gone. The new stack avoids carrying Tailwind v3 habits into Nuxt UI v4's CSS-first theming model.

```ts
const stack = ["@nuxt/ui", "@nuxt/content", "@nuxtjs/i18n"];
```

## Next

The next step is to expand tags, summaries, SEO details, and richer writing templates.
