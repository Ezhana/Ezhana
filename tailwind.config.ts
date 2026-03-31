import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,vue}",
    "./components/**/*.{js,ts,jsx,tsx,vue}",
    "./layouts/**/*.{js,ts,jsx,tsx,vue}",
    "./pages/**/*.{js,ts,jsx,tsx,vue}",
    "./plugins/**/*.{js,ts,jsx,tsx}",
    "./composables/**/*.{js,ts,jsx,tsx}",
    "./error.vue",
    "./app.config.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          foreground: "rgb(var(--color-accent-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          '"Noto Serif SC"',
          '"Songti SC"',
          '"STSong"',
          "ui-serif",
          "Georgia",
          "serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"SFMono-Regular"',
          "ui-monospace",
          "monospace",
        ],
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgb(var(--color-secondary) / 0.28)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
} satisfies Config;
