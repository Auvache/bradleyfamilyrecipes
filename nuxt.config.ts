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

    // Back the build-time content DB with Node's built-in `node:sqlite`
    // instead of the better-sqlite3 native addon. better-sqlite3 12.x cannot
    // compile on Node 26+ (it calls v8::PropertyCallbackInfo::This(), removed
    // in V8 14), and even on older Node its prebuilt binary is ABI-locked to
    // one major version. node:sqlite is unflagged from Node 24 on, so the
    // build no longer cares which Node runs it.
    experimental: {
      sqliteConnector: 'native',
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
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  compatibilityDate: '2025-01-01',
})
