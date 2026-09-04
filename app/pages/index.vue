<script setup lang="ts">
useHead({
  title: 'Home',
  meta: [
    { name: 'description', content: 'Bradley Family Recipes - Browse our collection of favorite family recipes including German schnitzel, Puerto Rican rice dishes, comfort food soups, and more.' },
  ],
})

const { data: recipes } = await useAsyncData('recipes', () =>
  queryCollection('recipes').order('title', 'ASC').all()
)

const query = ref('')

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

// Every keystroke re-runs this computed. An empty query shows everything.
const filteredRecipes = computed(() => {
  const all = recipes.value ?? []
  const terms = normalize(query.value).split(/\s+/).filter(Boolean)
  if (!terms.length) return all

  return all.filter((recipe) => {
    const haystack = normalize([recipe.title, ...recipe.tags].join(' '))
    // Every term has to land somewhere, so "chicken soup" narrows rather than widens.
    return terms.every((term) => haystack.includes(term))
  })
})

function getSlug(path: string): string {
  return path.split('/').pop() || ''
}
</script>

<template>
  <div>
    <!-- Search -->
    <section class="px-6 pt-10 pb-8 md:pt-14 md:pb-10">
      <div class="max-w-shell mx-auto">
        <div class="max-w-xl mx-auto">
          <SearchBar v-model="query" />
        </div>
      </div>
    </section>

    <!-- Grid -->
    <section class="px-6">
      <div class="max-w-shell mx-auto">
        <p class="text-[13px] text-ink-faint mb-6 h-5" aria-live="polite">
          <template v-if="query">
            {{ filteredRecipes.length }}
            {{ filteredRecipes.length === 1 ? 'result' : 'results' }} for &ldquo;{{ query }}&rdquo;
          </template>
          <template v-else>
            {{ filteredRecipes.length }} recipes
          </template>
        </p>

        <div
          v-if="filteredRecipes.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
        >
          <RecipeCard
            v-for="recipe in filteredRecipes"
            :key="recipe.path"
            :title="recipe.title"
            :image="recipe.image"
            :time="recipe.time"
            :tags="recipe.tags"
            :slug="getSlug(recipe.path)"
          />
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-24">
          <p class="text-[21px] font-semibold tracking-apple text-ink">
            No recipes found
          </p>
          <p class="mt-2 text-[17px] text-ink-soft">
            Try a different ingredient, dish, or tag.
          </p>
          <button
            type="button"
            class="mt-6 text-[15px] text-accent-500 hover:underline underline-offset-4"
            @click="query = ''"
          >
            Clear search
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
