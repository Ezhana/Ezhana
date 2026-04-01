<template>
  <div class="relative flex min-h-screen flex-col">
    <SiteHeader />

    <main class="flex-1 pb-16 pt-10 md:pb-24 md:pt-14">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>
