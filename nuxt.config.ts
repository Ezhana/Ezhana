const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxtjs/i18n", "@nuxt/eslint"],
  runtimeConfig: {
    public: {
      siteUrl,
    },
  },
  nitro: {
    prerender: {
      routes: ["/feed.xml", "/en/feed.xml"],
    },
  },
  content: {
    experimental: {
      sqliteConnector: "native",
    },
  },
  ui: {
    fonts: false,
    theme: {
      colors: [
        "primary",
        "secondary",
        "accent",
        "success",
        "info",
        "warning",
        "error",
      ],
    },
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },
  i18n: {
    baseUrl: siteUrl,
    defaultLocale: "zh",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    langDir: "locales",
    locales: [
      { code: "zh", language: "zh-CN", name: "简体中文", file: "zh.ts" },
      { code: "en", language: "en-US", name: "English", file: "en.ts" },
    ],
  },
});
