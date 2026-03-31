<script setup lang="ts">
import { getCollections, resolveLocale, SITE_METADATA } from "~~/shared/site";

const { locale, t } = useI18n();

const currentLocale = computed(() => resolveLocale(locale.value));
const collections = computed(() => getCollections(locale.value));
const siteMeta = computed(() => SITE_METADATA[currentLocale.value]);

const { data: posts } = await useAsyncData(
  "posts-list",
  () =>
    queryCollection(collections.value.posts)
      .where("draft", "=", false)
      .order("date", "DESC")
      .all(),
  { watch: [locale] },
);

useSeoMeta(() => ({
  title: t("posts.metaTitle"),
  description: t("posts.description"),
  ogTitle: `${t("posts.title")} · ${siteMeta.value.name}`,
  ogDescription: t("posts.description"),
}));
</script>

<template>
  <div class="space-y-8">
    <section class="space-y-3">
      <p class="text-sm font-medium uppercase tracking-[0.24em] text-primary">
        {{ t("posts.latest") }}
      </p>
      <div class="space-y-3">
        <h1 class="font-serif text-4xl text-highlighted sm:text-5xl">
          {{ t("posts.title") }}
        </h1>
        <p class="max-w-2xl text-lg leading-8 text-toned">
          {{ t("posts.description") }}
        </p>
      </div>
    </section>

    <section v-if="posts?.length" class="grid gap-5 lg:grid-cols-2">
      <PostCard
        v-for="post in posts"
        :key="post.path"
        :title="post.title"
        :description="post.description"
        :date="post.date"
        :slug="post.stem.split('/').at(-1) || ''"
        :tags="post.tags"
      />
    </section>

    <UCard v-else>
      <p class="text-toned">{{ t("posts.empty") }}</p>
    </UCard>
  </div>
</template>
