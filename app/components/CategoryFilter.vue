<script setup lang="ts">
interface Props {
  categories: string[]
  activeCategory: string | null
}

defineProps<Props>()

const emit = defineEmits<{
  select: [category: string | null]
}>()

function toggle(category: string | null) {
  emit('select', category)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <!-- All button -->
    <button
      class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
      :class="
        activeCategory === null
          ? 'bg-accent-500 text-white shadow-sm'
          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
      "
      @click="toggle(null)"
    >
      All
    </button>

    <!-- Category buttons -->
    <button
      v-for="category in categories"
      :key="category"
      class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 capitalize"
      :class="
        activeCategory === category
          ? 'bg-accent-500 text-white shadow-sm'
          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
      "
      @click="toggle(category)"
    >
      {{ category }}
    </button>
  </div>
</template>
