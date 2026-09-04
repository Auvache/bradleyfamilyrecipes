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
  <NuxtLink :to="`/recipes/${slug}`" class="group block">
    <!-- Image sits on the gray, corners rounded, no card chrome. -->
    <div class="relative aspect-[4/3] overflow-hidden rounded-apple bg-surface-gray">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-[600ms] ease-apple group-hover:scale-[1.04]"
        loading="lazy"
        decoding="async"
      />
      <!-- Hairline keeps pale photos from bleeding into the page. -->
      <div class="absolute inset-0 rounded-apple ring-1 ring-inset ring-black/[0.06]" />
    </div>

    <div class="mt-4">
      <h3 class="text-[19px] font-semibold tracking-apple text-ink leading-snug transition-colors duration-300 ease-apple group-hover:text-accent-500">
        {{ title }}
      </h3>

      <p class="mt-1.5 text-[14px] text-ink-soft tracking-apple">
        {{ formatTime(time) }}
        <span class="text-ink-faint px-1.5" aria-hidden="true">&middot;</span>
        <span class="capitalize">{{ tags.join(', ') }}</span>
      </p>
    </div>
  </NuxtLink>
</template>
