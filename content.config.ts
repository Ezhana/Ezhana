import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  cover: z.string().optional(),
});

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().default(false),
});

export default defineContentConfig({
  collections: {
    postsZh: defineCollection({
      type: "page",
      source: { include: "zh/posts/**/*.md", prefix: "/posts" },
      schema: postSchema,
    }),
    postsEn: defineCollection({
      type: "page",
      source: { include: "en/posts/**/*.md", prefix: "/posts" },
      schema: postSchema,
    }),
    pagesZh: defineCollection({
      type: "page",
      source: { include: "zh/pages/**/*.md", prefix: "/" },
      schema: pageSchema,
    }),
    pagesEn: defineCollection({
      type: "page",
      source: { include: "en/pages/**/*.md", prefix: "/" },
      schema: pageSchema,
    }),
  },
});
