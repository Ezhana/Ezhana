import { queryCollection } from "@nuxt/content/server";
import { setHeader, type H3Event } from "h3";
import {
  DEFAULT_SITE_URL,
  getCollections,
  getFeedPath,
  SITE_METADATA,
  type SiteLocale,
  withLocalePath,
} from "~~/shared/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function absoluteUrl(siteUrl: string, path: string) {
  return new URL(path, siteUrl).toString();
}

export async function createFeed(event: H3Event, locale: SiteLocale) {
  const config = useRuntimeConfig(event);
  const siteUrl = config.public.siteUrl || DEFAULT_SITE_URL;
  const siteMeta = SITE_METADATA[locale];
  const collection = getCollections(locale).posts;

  const posts = await queryCollection(event, collection)
    .where("draft", "=", false)
    .order("date", "DESC")
    .all();

  const channelLink = absoluteUrl(siteUrl, withLocalePath("/posts", locale));
  const feedLink = absoluteUrl(siteUrl, getFeedPath(locale));

  const items = posts
    .map((post) => {
      const link = absoluteUrl(siteUrl, withLocalePath(post.path, locale));
      const publishedAt = new Date(post.date).toUTCString();
      const updatedAt = new Date(post.updatedAt || post.date).toUTCString();

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${link}</link>`,
        `<guid>${link}</guid>`,
        `<pubDate>${publishedAt}</pubDate>`,
        `<description>${escapeXml(post.description)}</description>`,
        `<author>${escapeXml(siteMeta.name)}</author>`,
        `<lastBuildDate>${updatedAt}</lastBuildDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  const latestDate =
    posts[0]?.updatedAt || posts[0]?.date || new Date().toISOString();

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${escapeXml(siteMeta.title)}</title>`,
    `<link>${channelLink}</link>`,
    `<description>${escapeXml(siteMeta.description)}</description>`,
    `<language>${locale === "zh" ? "zh-CN" : "en-US"}</language>`,
    `<atom:link href="${feedLink}" rel="self" type="application/rss+xml" />`,
    `<lastBuildDate>${new Date(latestDate).toUTCString()}</lastBuildDate>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  setHeader(event, "content-type", "application/rss+xml; charset=utf-8");

  return xml;
}
