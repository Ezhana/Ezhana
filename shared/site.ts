export const SITE_NAME = "Ezhana";
export const DEFAULT_SITE_URL = "http://localhost:3000";
export const POSTS_PATH = "/posts";

export const CONTENT_COLLECTIONS = {
  zh: {
    posts: "postsZh",
    pages: "pagesZh",
  },
  en: {
    posts: "postsEn",
    pages: "pagesEn",
  },
} as const;

export const FEED_PATHS = {
  zh: "/feed.xml",
  en: "/en/feed.xml",
} as const;

export const SITE_METADATA = {
  zh: {
    name: SITE_NAME,
    title: `${SITE_NAME} 博客`,
    description: "一个围绕写作、设计与前端工程展开的个人博客。",
  },
  en: {
    name: SITE_NAME,
    title: `${SITE_NAME} Blog`,
    description:
      "A personal blog about writing, design, and frontend engineering.",
  },
} as const;

export type SiteLocale = keyof typeof CONTENT_COLLECTIONS;

export function resolveLocale(locale?: string): SiteLocale {
  return locale === "en" ? "en" : "zh";
}

export function getCollections(locale?: string) {
  return CONTENT_COLLECTIONS[resolveLocale(locale)];
}

export function getFeedPath(locale?: string) {
  return FEED_PATHS[resolveLocale(locale)];
}

export function buildPostPath(slug: string) {
  return `${POSTS_PATH}/${slug}`;
}

export function resolveSlug(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value.join("/");
  }

  return value || "";
}

export function withLocalePath(path: string, locale?: string) {
  const resolvedLocale = resolveLocale(locale);

  if (resolvedLocale === "en") {
    return path === "/" ? "/en" : `/en${path}`;
  }

  return path;
}

export function formatDisplayDate(value: string, locale?: string) {
  return new Intl.DateTimeFormat(
    resolveLocale(locale) === "zh" ? "zh-CN" : "en-US",
    { dateStyle: "long" },
  ).format(new Date(value));
}
