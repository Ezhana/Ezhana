<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const options = computed(() =>
  (locales.value as Array<{ code: string; name?: string }>).map((item) => ({
    code: item.code,
    label: item.code === "zh" ? "中文" : "EN",
    to: switchLocalePath(item.code),
  })),
);
</script>

<template>
  <div
    class="inline-flex items-center gap-1 rounded-full border border-default bg-default/80 p-1"
  >
    <UButton
      v-for="option in options"
      :key="option.code"
      :to="option.to"
      color="secondary"
      :label="option.label"
      :variant="locale === option.code ? 'solid' : 'ghost'"
      size="xs"
    />
  </div>
</template>
