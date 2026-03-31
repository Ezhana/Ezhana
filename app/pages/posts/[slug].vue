<script setup lang="ts">
import {
  buildPostPath,
  formatDisplayDate,
  getCollections,
  resolveLocale,
  resolveSlug,
  SITE_METADATA,
} from "~~/shared/site";

const route = useRoute();
const { locale, t } = useI18n();
const localePath = useLocalePath();

const currentLocale = computed(() => resolveLocale(locale.value));
const collections = computed(() => getCollections(locale.value));
const slug = computed(() => resolveSlug(route.params.slug));
const path = computed(() => buildPostPath(slug.value));
const siteMeta = computed(() => SITE_METADATA[currentLocale.value]);

const { data: post } = await useAsyncData(
  "post-detail",
  () => queryCollection(collections.value.posts).path(path.value).first(),
  { watch: [locale, slug] },
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t("posts.notFound"),
  });
}

const publishedAt = computed(() =>
  formatDisplayDate(post.value?.date || "", locale.value),
);

useSeoMeta(() => ({
  title: post.value?.title,
  description: post.value?.description,
  ogTitle: post.value?.title || siteMeta.value.title,
  ogDescription: post.value?.description || siteMeta.value.description,
  articlePublishedTime: post.value?.date,
}));
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
    <article class="space-y-8">
      <UButton
        :to="localePath('/posts')"
        color="secondary"
        icon="i-lucide-arrow-left"
        :label="t('posts.back')"
        variant="ghost"
      />

      <div class="space-y-5">
        <div class="flex flex-wrap items-center gap-2">
          <UBadge
            v-for="tag in post?.tags || []"
            :key="tag"
            color="accent"
            :label="tag"
            size="sm"
            variant="subtle"
          />
        </div>

        <div class="space-y-4">
          <h1
            class="max-w-3xl font-serif text-4xl tracking-tight text-highlighted sm:text-5xl"
          >
            {{ post?.title }}
          </h1>
          <p class="max-w-2xl text-lg leading-8 text-toned">
            {{ post?.description }}
          </p>
        </div>

        <div class="text-sm text-toned">
          {{ t("posts.publishedOn") }}
          <time :datetime="post?.date" class="font-medium text-highlighted">
            {{ publishedAt }}
          </time>
        </div>
      </div>

      <UCard>
        <ContentRenderer
          v-if="post"
          :value="post"
          class="space-y-6 text-[1.05rem] leading-8 text-default"
        />
      </UCard>
    </article>

    <aside class="space-y-4">
      <UCard>
        <template #header>
          <h2 class="font-serif text-xl text-highlighted">
            {{ siteMeta.name }}
          </h2>
        </template>

        <p class="text-sm leading-7 text-toned">
          {{ siteMeta.description }}
        </p>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="font-serif text-xl text-highlighted">
            {{ t("nav.posts") }}
          </h2>
        </template>

        <UButton
          :to="localePath('/posts')"
          color="primary"
          :label="t('home.primaryCta')"
          variant="soft"
          block
        />
      </UCard>
    </aside>
  </div>
</template>
