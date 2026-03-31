---
title: About Ezhana
description: How this site organizes content and why the current technical stack was chosen.
---

## What this site is about

Ezhana is primarily a place for notes on:

- frontend engineering
- design systems and information structure
- long-term writing

## Why this stack

`Nuxt UI`, `Nuxt Content`, and `Nuxt i18n` were chosen because their responsibilities stay clear:

- the component layer stays separate from the theme layer
- the content model is durable
- localized routing does not need patch-style workarounds

## Rich text strategy

Here, "rich text" means Markdown and MDC by default, not a browser editor embedded into the public blog.

That keeps:

1. content stable
2. version control clear
3. migration costs low

If an editor is needed later, it should be introduced as a dedicated workflow rather than mixed into the publishing frontend.
