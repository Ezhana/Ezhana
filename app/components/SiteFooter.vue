<script setup lang="ts">
import { getFeedPath } from "~~/shared/site";

const year = new Date().getFullYear();
const localePath = useLocalePath();
const { locale, t } = useI18n();

const links = computed(() => [
  { label: t("nav.posts"), to: localePath("/posts"), external: false },
  { label: t("nav.about"), to: localePath("/about"), external: false },
  { label: t("nav.rss"), to: getFeedPath(locale.value), external: true },
]);
</script>

<template>
  <footer class="border-t border-default/70 bg-muted/30">
    <UContainer
      class="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between"
    >
      <div class="space-y-1">
        <p class="font-serif text-base text-highlighted">Ezhana</p>
        <p class="text-sm text-toned">
          {{ t("footer.note") }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <UButton
          v-for="link in links"
          :key="link.to"
          v-bind="
            link.external ? { href: link.to, external: true } : { to: link.to }
          "
          color="secondary"
          :label="link.label"
          size="sm"
          variant="ghost"
        />
      </div>

      <p class="text-sm text-muted">© {{ year }} Ezhana</p>
    </UContainer>
  </footer>
</template>
