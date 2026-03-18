<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: recipe } = await useAsyncData(`recipe-${slug}`, () =>
  queryCollection('recipes').path(`/recipes/${slug}`).first()
)

// 404 if not found
if (!recipe.value) {
  throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })
}

// SEO
useHead({
  title: recipe.value?.title || 'Recipe',
  meta: [
    { name: 'description', content: recipe.value?.title ? `${recipe.value.title} - A Bradley Family Recipe` : 'Bradley Family Recipes' },
  ],
})
</script>

<template>
  <div v-if="recipe">
    <!-- Hero image -->
    <div class="w-full max-h-[400px] overflow-hidden bg-gray-200">
      <img
        :src="recipe.image"
        :alt="recipe.title"
        class="w-full h-full object-cover max-h-[400px]"
      />
    </div>

    <!-- Recipe content -->
    <article class="max-w-3xl mx-auto px-4 py-10">
      <!-- Back link -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent-600 transition-colors mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to recipes
      </NuxtLink>

      <!-- Title -->
      <h1 class="text-3xl md:text-4xl text-gray-900 mb-6">
        {{ recipe.title }}
      </h1>

      <!-- Meta bar -->
      <div class="flex flex-wrap gap-4 items-center py-4 mb-8 border-y border-gray-200">
        <!-- Time -->
        <div class="flex items-center gap-1.5 text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-accent-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span><strong>Time:</strong> {{ formatTime(recipe.time) }}</span>
        </div>

        <!-- Divider -->
        <div class="hidden sm:block w-px h-5 bg-gray-200" />

        <!-- Tags -->
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in recipe.tags"
            :key="tag"
            class="px-2.5 py-0.5 text-xs font-medium bg-accent-50 text-accent-700 rounded-full capitalize"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Rendered markdown body (ingredients + directions) -->
      <div class="prose prose-gray max-w-none prose-headings:font-display prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-li:text-gray-700 prose-ol:text-gray-700 prose-p:text-gray-700">
        <ContentRenderer :value="recipe" />
      </div>
    </article>
  </div>
</template>
