<script setup lang="ts">
import { getFeedPath } from "~~/shared/site";

const route = useRoute();
const localePath = useLocalePath();
const { locale, t } = useI18n();

const links = computed(() => [
  { label: t("nav.home"), to: localePath("/") },
  { label: t("nav.posts"), to: localePath("/posts") },
  { label: t("nav.about"), to: localePath("/about") },
]);

const feedPath = computed(() => getFeedPath(locale.value));

function isActive(target: string) {
  if (target === localePath("/")) {
    return route.path === target;
  }

  return route.path === target || route.path.startsWith(`${target}/`);
}
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-default/70 bg-default/80 backdrop-blur"
  >
    <UContainer class="flex flex-wrap items-center justify-between gap-4 py-4">
      <div class="flex min-w-0 items-center gap-4">
        <NuxtLink :to="localePath('/')" class="min-w-0">
          <div class="flex items-center gap-3">
            <div
              class="size-10 rounded-2xl bg-primary/12 ring-1 ring-primary/20"
            />
            <div class="min-w-0">
              <p class="truncate font-serif text-lg text-highlighted">Ezhana</p>
              <p class="truncate text-sm text-toned">Nuxt UI Blog Starter</p>
            </div>
          </div>
        </NuxtLink>

        <nav class="hidden items-center gap-1 md:flex">
          <UButton
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            color="secondary"
            :label="link.label"
            :variant="isActive(link.to) ? 'soft' : 'ghost'"
            size="sm"
          />
        </nav>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <UButton
          :href="feedPath"
          color="accent"
          external
          icon="i-lucide-rss"
          :label="t('nav.rss')"
          size="sm"
          variant="soft"
        />
        <LocaleSwitch />
        <ThemeSwitch />
      </div>
    </UContainer>

    <div class="border-t border-default/60 md:hidden">
      <UContainer class="flex flex-wrap gap-2 py-3">
        <UButton
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          color="secondary"
          :label="link.label"
          :variant="isActive(link.to) ? 'soft' : 'ghost'"
          size="sm"
        />
      </UContainer>
    </div>
  </header>
</template>
