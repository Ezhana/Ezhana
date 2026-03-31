<script setup lang="ts">
import { buildPostPath, formatDisplayDate } from "~~/shared/site";

const props = defineProps<{
  title: string;
  description: string;
  date: string;
  slug: string;
  tags?: string[];
}>();

const localePath = useLocalePath();
const { locale, t } = useI18n();

const postPath = computed(() => localePath(buildPostPath(props.slug)));
const publishedAt = computed(() => formatDisplayDate(props.date, locale.value));
</script>

<template>
  <UCard class="h-full">
    <template #header>
      <div class="space-y-3">
        <div class="flex flex-wrap items-center gap-2 text-sm text-toned">
          <span>{{ t("posts.publishedOn") }}</span>
          <time :datetime="date" class="font-medium text-highlighted">
            {{ publishedAt }}
          </time>
        </div>

        <div class="space-y-2">
          <h3 class="font-serif text-2xl text-highlighted">
            <NuxtLink :to="postPath" class="transition hover:text-primary">
              {{ title }}
            </NuxtLink>
          </h3>
          <p class="leading-7 text-toned">
            {{ description }}
          </p>
        </div>
      </div>
    </template>

    <div class="flex flex-wrap gap-2" v-if="tags?.length">
      <UBadge
        v-for="tag in tags"
        :key="tag"
        color="accent"
        :label="tag"
        size="sm"
        variant="subtle"
      />
    </div>

    <template #footer>
      <UButton
        :to="postPath"
        color="primary"
        icon="i-lucide-arrow-right"
        trailing
        :label="t('posts.readMore')"
        variant="soft"
      />
    </template>
  </UCard>
</template>
