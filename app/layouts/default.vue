<template>
  <div class="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-100 mt-16">
      <div class="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
        Made with ❤️ and good ingredients
      </div>
    </footer>
  </div>
</template>
