<script setup lang="ts">
import { getCollections, resolveLocale, SITE_METADATA } from "~~/shared/site";

const { locale, t } = useI18n();

const currentLocale = computed(() => resolveLocale(locale.value));
const collections = computed(() => getCollections(locale.value));
const siteMeta = computed(() => SITE_METADATA[currentLocale.value]);

const { data: page } = await useAsyncData(
  "about-page",
  () => queryCollection(collections.value.pages).path("/about").first(),
  { watch: [locale] },
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t("about.title"),
  });
}

useSeoMeta(() => ({
  title: t("about.metaTitle"),
  description: page.value?.description || t("about.description"),
  ogTitle: `${t("about.title")} · ${siteMeta.value.name}`,
  ogDescription: page.value?.description || t("about.description"),
}));
</script>

<template>
  <div class="space-y-8">
    <section class="space-y-3">
      <p class="text-sm font-medium uppercase tracking-[0.24em] text-primary">
        {{ t("nav.about") }}
      </p>
      <div class="space-y-3">
        <h1 class="font-serif text-4xl text-highlighted sm:text-5xl">
          {{ t("about.title") }}
        </h1>
        <p class="max-w-2xl text-lg leading-8 text-toned">
          {{ page?.description || t("about.description") }}
        </p>
      </div>
    </section>

    <UCard>
      <ContentRenderer
        v-if="page"
        :value="page"
        class="space-y-6 text-[1.05rem] leading-8 text-default"
      />
    </UCard>
  </div>
</template>
