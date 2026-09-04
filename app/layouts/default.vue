<template>
  <div class="min-h-screen flex flex-col font-sans">

    <!-- Global nav: slim, frosted, always present — Apple's signature chrome -->
    <header class="sticky top-0 z-50 glass border-b border-black/5">
      <nav class="max-w-shell mx-auto px-6 h-12 flex items-center justify-center">
        <NuxtLink
          to="/"
          class="text-[15px] font-medium tracking-apple text-ink hover:text-ink-soft transition-colors duration-300 ease-apple"
        >
          Feed the Bradleys
        </NuxtLink>
      </nav>
    </header>

    <main class="flex-1 pb-8">
      <slot />
    </main>

  </div>
</template>
