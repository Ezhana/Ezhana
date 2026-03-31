<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtRouteAnnouncer />
    <main
      class="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-10 lg:px-8"
    >
      <section
        class="rounded-3xl border border-border bg-surface px-6 py-8 shadow-soft"
      >
        <p class="text-sm font-medium uppercase tracking-[0.24em] text-primary">
          Ezhana
        </p>
        <h1
          class="mt-3 font-display text-4xl tracking-tight text-secondary sm:text-5xl"
        >
          Nuxt 4 Tailwind Theme
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-7 text-muted">
          The project now includes explicit Tailwind entry styles, theme tokens,
          and reusable font stacks for primary, secondary, and accent styling.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <span
            class="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Primary
          </span>
          <span
            class="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
          >
            Secondary
          </span>
          <span
            class="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
          >
            Accent
          </span>
        </div>
      </section>

      <section
        class="rounded-3xl border border-border bg-surface/80 p-4 shadow-soft backdrop-blur"
      >
        <NuxtWelcome />
      </section>
    </main>
  </div>
</template>
