<template>
  <div class="min-h-screen flex flex-col font-sans">

    <!-- Global nav: slim, frosted, always present — Apple's signature chrome -->
    <header class="sticky top-0 z-50 glass border-b border-black/5">
      <nav class="max-w-shell mx-auto px-6 h-12 flex items-center justify-center">
        <NuxtLink
          to="/"
          class="text-[15px] font-medium tracking-apple text-ink hover:text-ink-soft transition-colors duration-300 ease-apple"
        >
          Bradley Family Recipes
        </NuxtLink>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer: Apple's is quiet, small, and sits on the gray -->
    <footer class="bg-surface-gray border-t border-black/5 mt-24">
      <div class="max-w-shell mx-auto px-6 py-8">
        <p class="text-xs text-ink-faint leading-relaxed">
          Made at home, with good ingredients.
        </p>
      </div>
    </footer>
  </div>
</template>
