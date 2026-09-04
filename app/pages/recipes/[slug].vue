<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: recipe } = await useAsyncData(`recipe-${slug}`, () =>
  queryCollection('recipes').path(`/recipes/${slug}`).first()
)

if (!recipe.value) {
  throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })
}

useHead({
  title: recipe.value?.title || 'Recipe',
  meta: [
    { name: 'description', content: recipe.value?.title ? `${recipe.value.title} - A Bradley Family Recipe` : 'Bradley Family Recipes' },
  ],
})
</script>

<template>
  <div v-if="recipe">
    <!-- Title first, image second: Apple leads with the words. -->
    <header class="px-6 pt-16 pb-10 md:pt-24 md:pb-12">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-[14px] font-medium tracking-apple text-ink-faint capitalize">
          {{ recipe.tags.join(' · ') }}
        </p>
        <h1 class="mt-3 text-[40px] md:text-[56px] leading-[1.05] font-semibold tracking-tightest text-ink">
          {{ recipe.title }}
        </h1>
        <p class="mt-4 text-[19px] text-ink-soft tracking-apple">
          {{ formatTime(recipe.time) }}
        </p>
      </div>
    </header>

    <!-- Full-bleed image on the gray -->
    <div class="px-6">
      <div class="max-w-shell mx-auto">
        <div class="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-surface-gray">
          <img
            :src="recipe.image"
            :alt="recipe.title"
            class="w-full h-full object-cover"
            decoding="async"
          />
          <div class="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-black/[0.06]" />
        </div>
      </div>
    </div>

    <!-- Body -->
    <article class="px-6 pt-16">
      <div
        class="max-w-[680px] mx-auto
               prose prose-neutral
               prose-headings:font-semibold prose-headings:tracking-tightest prose-headings:text-ink
               prose-h2:text-[32px] prose-h2:mt-16 prose-h2:mb-6
               prose-h3:text-[24px] prose-h3:mt-10 prose-h3:mb-4
               prose-p:text-[17px] prose-p:leading-[1.6] prose-p:text-ink-soft
               prose-li:text-[17px] prose-li:leading-[1.6] prose-li:text-ink-soft prose-li:my-1.5
               prose-strong:text-ink prose-strong:font-semibold
               prose-a:text-accent-500 prose-a:no-underline hover:prose-a:underline
               prose-hr:border-black/10"
      >
        <ContentRenderer :value="recipe" />
      </div>
    </article>

    <!-- Back -->
    <div class="px-6 pt-16">
      <div class="max-w-[680px] mx-auto">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1.5 text-[17px] text-accent-500 tracking-apple hover:underline underline-offset-4"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          All recipes
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
