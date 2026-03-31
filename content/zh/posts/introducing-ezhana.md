---
title: 以 Nuxt UI 重建博客基础设施
description: 用更轻的 UI 层、结构化内容集合和清晰的主题体系，为长期写作打底。
date: 2026-03-31
tags:
  - Nuxt
  - UI System
  - Blogging
featured: true
---

## 为什么重新搭建

当一个博客要长期写下去，最先需要稳定下来的不是页面样式，而是内容组织方式。

- 路由是否清晰
- RSS 是否可靠
- 多语言是否一致
- 主题是否能持续扩展

这次重建的目标，就是把这些底层问题一次性理顺。

::callout{color="accent" icon="i-lucide-rss"}
这个骨架默认包含 RSS、主题切换和中英文内容结构。
::

## 这次保留了什么

1. 使用 `Nuxt UI` 管理组件与主题 token
2. 使用 `Nuxt Content` 管理文章与页面内容
3. 使用 `Nuxt i18n` 管理路由前缀与界面文案

## 这次去掉了什么

去掉了旧的、分散的配置方式，避免把 Tailwind v3 的习惯继续带进 Nuxt UI v4 的 CSS-first 主题体系里。

```ts
const stack = ["@nuxt/ui", "@nuxt/content", "@nuxtjs/i18n"];
```

## 接下来

下一步会继续补标签页、摘要卡片、SEO 细节，以及更完整的内容模板。
