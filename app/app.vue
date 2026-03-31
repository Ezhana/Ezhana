<script setup lang="ts">
import { resolveLocale, SITE_METADATA } from "~~/shared/site";

const { locale } = useI18n();
const localeHead = useLocaleHead({ seo: true });

const siteMeta = computed(() => SITE_METADATA[resolveLocale(locale.value)]);

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  bodyAttrs: localeHead.value.bodyAttrs,
  link: localeHead.value.link,
  meta: localeHead.value.meta,
  titleTemplate: (titleChunk) =>
    titleChunk
      ? `${titleChunk} · ${siteMeta.value.name}`
      : siteMeta.value.title,
}));
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
