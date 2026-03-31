<script setup lang="ts">
const colorMode = useColorMode();
const { t } = useI18n();

const options = computed(() => [
  { key: "light", label: t("theme.light"), icon: "i-lucide-sun-medium" },
  { key: "dark", label: t("theme.dark"), icon: "i-lucide-moon-star" },
  { key: "system", label: t("theme.system"), icon: "i-lucide-monitor-cog" },
]);
</script>

<template>
  <div
    class="inline-flex items-center gap-1 rounded-full border border-default bg-default/80 p-1"
  >
    <UButton
      v-for="option in options"
      :key="option.key"
      :icon="option.icon"
      :label="option.label"
      color="secondary"
      :variant="colorMode.preference === option.key ? 'solid' : 'ghost'"
      size="xs"
      @click="colorMode.preference = option.key"
    />
  </div>
</template>
