import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    recipes: defineCollection({
      type: 'page',
      source: 'recipes/*.md',
      schema: z.object({
        title: z.string(),
        image: z.string(),
        time: z.number(),
        tags: z.array(z.string()),
      }),
    }),
  },
})
