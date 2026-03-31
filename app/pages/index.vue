<script setup lang="ts">
import { getCollections, resolveLocale, SITE_METADATA } from "~~/shared/site";

const { locale, t } = useI18n();
const localePath = useLocalePath();

const currentLocale = computed(() => resolveLocale(locale.value));
const collections = computed(() => getCollections(locale.value));
const siteMeta = computed(() => SITE_METADATA[currentLocale.value]);

const { data: posts } = await useAsyncData(
  "home-posts",
  () =>
    queryCollection(collections.value.posts)
      .where("draft", "=", false)
      .order("date", "DESC")
      .limit(3)
      .all(),
  { watch: [locale] },
);

useSeoMeta(() => ({
  title: t("home.metaTitle"),
  description: siteMeta.value.description,
  ogTitle: siteMeta.value.title,
  ogDescription: siteMeta.value.description,
}));
</script>

<template>
  <div class="space-y-10 md:space-y-14">
    <section
      class="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]"
    >
      <UCard
        class="overflow-hidden"
        :ui="{
          body: 'p-0',
          header: 'border-none px-6 py-6 sm:px-8 sm:py-8',
          footer: 'border-none px-6 pb-6 sm:px-8 sm:pb-8',
        }"
      >
        <template #header>
          <div class="space-y-5">
            <UBadge color="primary" :label="t('home.eyebrow')" variant="soft" />

            <div class="space-y-4">
              <h1
                class="max-w-3xl font-serif text-4xl tracking-tight text-highlighted sm:text-5xl"
              >
                {{ t("home.title") }}
              </h1>
              <p class="max-w-2xl text-lg leading-8 text-toned">
                {{ t("home.description") }}
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <UButton
                :to="localePath('/posts')"
                color="primary"
                size="lg"
                :label="t('home.primaryCta')"
              />
              <UButton
                :to="localePath('/about')"
                color="secondary"
                size="lg"
                :label="t('home.secondaryCta')"
                variant="soft"
              />
            </div>
          </div>
        </template>
      </UCard>

      <UCard>
        <template #header>
          <div class="space-y-2">
            <p
              class="text-sm font-medium uppercase tracking-[0.24em] text-primary"
            >
              {{ t("posts.latest") }}
            </p>
            <h2 class="font-serif text-2xl text-highlighted">
              {{ siteMeta.name }}
            </h2>
          </div>
        </template>

        <div class="space-y-4 text-sm leading-7 text-toned">
          <p>{{ siteMeta.description }}</p>
          <p>
            RSS, locale-prefixed routes, content collections, and theme
            switching are all wired into this starter so the content model
            scales cleanly.
          </p>
        </div>
      </UCard>
    </section>

    <section class="space-y-5">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p
            class="text-sm font-medium uppercase tracking-[0.24em] text-primary"
          >
            {{ t("home.latest") }}
          </p>
          <h2 class="mt-2 font-serif text-3xl text-highlighted">
            {{ t("nav.posts") }}
          </h2>
        </div>

        <UButton
          :to="localePath('/posts')"
          color="secondary"
          icon="i-lucide-arrow-up-right"
          trailing
          :label="t('home.primaryCta')"
          variant="ghost"
        />
      </div>

      <div v-if="posts?.length" class="grid gap-5 lg:grid-cols-3">
        <PostCard
          v-for="post in posts"
          :key="post.path"
          :title="post.title"
          :description="post.description"
          :date="post.date"
          :slug="post.stem.split('/').at(-1) || ''"
          :tags="post.tags"
        />
      </div>

      <UCard v-else>
        <p class="text-toned">{{ t("home.empty") }}</p>
      </UCard>
    </section>
  </div>
</template>
