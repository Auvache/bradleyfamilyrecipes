<script setup lang="ts">
const model = defineModel<string>({ required: true })

const input = ref<HTMLInputElement | null>(null)

function clear() {
  model.value = ''
  input.value?.focus()
}

// "/" focuses search, Escape clears it — the shortcuts people expect.
function onKeydown(e: KeyboardEvent) {
  if (e.key === '/' && document.activeElement !== input.value) {
    e.preventDefault()
    input.value?.focus()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="relative">
    <!-- Magnifier -->
    <svg
      class="absolute left-5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-ink-faint pointer-events-none"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>

    <input
      ref="input"
      v-model="model"
      type="search"
      inputmode="search"
      autocomplete="off"
      spellcheck="false"
      placeholder="Search recipes"
      aria-label="Search recipes"
      class="w-full h-12 pl-[52px] pr-12 rounded-full bg-surface-gray text-ink placeholder:text-ink-faint
             text-[17px] tracking-apple border border-transparent
             transition-all duration-300 ease-apple
             hover:bg-black/[0.06]
             focus:bg-white focus:border-accent-500/40 focus:outline-none
             focus:ring-4 focus:ring-accent-500/15"
    />

    <!-- Clear -->
    <button
      v-if="model"
      type="button"
      aria-label="Clear search"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 grid place-items-center
             rounded-full text-white bg-ink-faint/70 hover:bg-ink-soft
             transition-colors duration-200 ease-apple"
      @click="clear"
    >
      <svg
        class="w-3 h-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3.5"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </svg>
    </button>
  </div>
</template>
