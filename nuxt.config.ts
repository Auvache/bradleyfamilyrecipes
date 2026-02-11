// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
  ],

  css: ['~/assets/css/main.css'],

  // Static site generation
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  content: {
    // Content v3 settings are mainly in content.config.ts
    build: {
      markdown: {
        highlight: false,
      },
    },
  },

  app: {
    head: {
      title: 'Bradley Family Recipes',
      titleTemplate: '%s | Bradley Family Recipes',
      meta: [
        { name: 'description', content: 'Bradley Family Recipes - Our collection of favorite family recipes including German schnitzel, Puerto Rican rice dishes, comfort food soups, and more.' },
        { name: 'keywords', content: 'Bradley Family Recipes, Bradley family recipes, family recipes, home cooking' },
        { property: 'og:title', content: 'Bradley Family Recipes' },
        { property: 'og:description', content: 'Bradley Family Recipes - Our collection of favorite family recipes including German schnitzel, Puerto Rican rice dishes, comfort food soups, and more.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;700&display=swap',
        },
      ],
    },
  },

  compatibilityDate: '2025-01-01',
})
