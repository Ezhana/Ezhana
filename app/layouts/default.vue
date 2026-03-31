<template>
  <div class="relative min-h-screen">
    <SiteHeader />

    <main class="pb-16 pt-10 md:pb-24 md:pt-14">
      <UContainer>
        <slot />
      </UContainer>
    </main>

    <SiteFooter />
  </div>
</template>
