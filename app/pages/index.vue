<script setup lang="ts">
// SEO
useHead({
  title: 'Home',
  meta: [
    { name: 'description', content: 'Bradley Family Recipes - Browse our collection of favorite family recipes including German schnitzel, Puerto Rican rice dishes, comfort food soups, and more.' },
  ],
})

// Fetch all recipes
const { data: recipes } = await useAsyncData('recipes', () =>
  queryCollection('recipes').order('title', 'ASC').all()
)

// Active filter state
const activeCategory = ref<string | null>(null)

// Extract unique tags from all recipes
const allCategories = computed(() => {
  if (!recipes.value) return []
  const tagSet = new Set<string>()
  for (const recipe of recipes.value) {
    for (const tag of recipe.tags) {
      tagSet.add(tag)
    }
  }
  return [...tagSet].sort()
})

// Filtered recipes
const filteredRecipes = computed(() => {
  if (!recipes.value) return []
  if (!activeCategory.value) return recipes.value
  return recipes.value.filter((r) => r.tags.includes(activeCategory.value!))
})

// Extract slug from path (e.g., "/recipes/tomato-basil-pasta" → "tomato-basil-pasta")
function getSlug(path: string): string {
  return path.split('/').pop() || ''
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-slate-600">
      <div class="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <h1 class="text-4xl md:text-5xl text-white mb-8">
          Bradley Family Recipes
        </h1>

        <!-- Category Filters -->
        <CategoryFilter
          :categories="allCategories"
          :active-category="activeCategory"
          @select="activeCategory = $event"
        />
      </div>
    </section>

    <!-- Recipe Grid -->
    <section class="max-w-6xl mx-auto px-4 py-10">
      <!-- Results count -->
      <p class="text-sm text-gray-400 mb-6">
        {{ filteredRecipes.length }} recipe{{ filteredRecipes.length === 1 ? '' : 's' }}
        <span v-if="activeCategory"> tagged "{{ activeCategory }}"</span>
      </p>

      <!-- Grid -->
      <div
        v-if="filteredRecipes.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
      <div v-else class="text-center py-16">
        <p class="text-5xl mb-4">🍽️</p>
        <p class="text-gray-400 text-lg">No recipes found for this category.</p>
      </div>
    </section>
  </div>
</template>
