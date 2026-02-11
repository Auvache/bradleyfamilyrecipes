<script setup lang="ts">
interface Props {
  title: string
  image: string
  time: number
  tags: string[]
  slug: string
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="`/recipes/${slug}`"
    class="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
  >
    <!-- Image -->
    <div class="aspect-[4/3] overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col gap-2">
      <h3 class="font-semibold text-gray-900 text-lg leading-snug group-hover:text-accent-600 transition-colors">
        {{ title }}
      </h3>

      <!-- Footer: time + tags -->
      <div class="flex items-center justify-between gap-3 mt-2 pt-3 border-t border-gray-100">
        <!-- Time -->
        <div class="flex items-center gap-1.5 text-sm text-gray-400 shrink-0">
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
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{{ time }} min</span>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap justify-end gap-1.5">
          <span
            v-for="tag in tags"
            :key="tag"
            class="px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
