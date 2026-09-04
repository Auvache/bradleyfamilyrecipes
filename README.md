# 🍳 Bradley Family Recipes — Nuxt 4 SSG Recipe Site

A clean, minimal recipe website built with Nuxt 4, Nuxt Content v3, TypeScript, and Tailwind CSS. Recipes are written as Markdown files and the whole site generates as static HTML.

---

## Quick Start

```bash
# 1. Create a new directory and copy all project files into it, then:
cd recipe-site

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev

# 4. Generate the static site
npm run generate

# 5. Preview the generated site
npm run preview
```

The generated output will be in `.output/public/` — deploy that folder to any static host (Cloudflare Pages, Netlify, Vercel, etc.).

---

## Project Structure

```
recipe-site/
├── app/
│   ├── app.vue                     # Root component
│   ├── layouts/
│   │   └── default.vue             # Site layout (header + footer)
│   ├── pages/
│   │   ├── index.vue               # Home page (grid + filters)
│   │   └── recipes/
│   │       └── [slug].vue          # Dynamic recipe detail page
│   └── components/
│       ├── RecipeCard.vue           # Card component for the grid
│       └── CategoryFilter.vue       # Filter pill buttons
├── content/
│   └── recipes/                     # ← Your recipe .md files go here
│       ├── tomato-basil-pasta.md
│       ├── slow-cooker-chili.md
│       └── ...
├── public/
│   └── images/                      # ← Your recipe photos go here
│       ├── tomato-basil-pasta.jpg
│       └── ...
├── content.config.ts                # Nuxt Content collection schema
├── nuxt.config.ts                   # Nuxt configuration
├── tailwind.config.ts               # Tailwind configuration
├── package.json
└── tsconfig.json
```

---

## How to Add a New Recipe

### 1. Add the image

Drop a photo into `public/images/`. Use a descriptive filename like `my-new-recipe.jpg`. Supported formats: `.jpg`, `.png`, `.webp`.

### 2. Create the Markdown file

Create a new `.md` file in `content/recipes/`. The filename becomes the URL slug:

`content/recipes/my-new-recipe.md` → `yoursite.com/recipes/my-new-recipe`

### 3. Fill in the template

Every recipe Markdown file has two parts: **frontmatter** (metadata between the `---` fences) and **body** (the ingredients and directions).

```md
---
title: My New Recipe
description: A short, enticing description for the recipe card. Keep it to 1-2 sentences.
image: /images/my-new-recipe.jpg
prepTime: 15
cookTime: 30
servings: 4
tags:
  - chicken
  - one-pan
  - weeknight
---

## Ingredients

- 1 lb chicken breast
- 2 tbsp olive oil
- Salt and pepper to taste

## Directions

1. First step of the recipe. Be descriptive but concise.

2. Second step. Each numbered item becomes a clear step.

3. Third step. Serve and enjoy!
```

### Frontmatter fields

| Field         | Type       | Description                                       |
|---------------|------------|---------------------------------------------------|
| `title`       | string     | Recipe name (shown on card and detail page)       |
| `description` | string     | 1-2 sentence summary (shown on card)             |
| `image`       | string     | Path to image in `/public` (e.g. `/images/x.jpg`)|
| `prepTime`    | number     | Prep time in minutes                              |
| `cookTime`    | number     | Cook time in minutes                              |
| `servings`    | number     | Number of servings                                |
| `tags`        | string[]   | Category tags for filtering                       |

### Tags

Tags power the filter buttons on the home page. They're automatically collected from all recipes — you don't need to register them anywhere. Just add whatever tags make sense:

```yaml
tags:
  - crockpot
  - vegetarian
  - comfort food
  - dessert
  - chicken
  - pasta
  - one-pan
  - weeknight
  # ... anything you want
```

A recipe can have as many tags as you like. The filter buttons on the home page will update automatically.

---

## How It Works

### Home Page (`app/pages/index.vue`)

- Queries all recipes from the `recipes` content collection
- Extracts all unique tags to build the filter buttons
- Filters recipes client-side when a category button is pressed
- Renders a responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop

### Recipe Detail Page (`app/pages/recipes/[slug].vue`)

- Single dynamic page that handles all recipe URLs
- Loads the matching `.md` file by slug via `queryCollection`
- Renders the frontmatter as structured metadata (times, servings, tags)
- Renders the markdown body (ingredients + directions) via `<ContentRenderer>`
- Shows a 404 if no matching recipe is found

### Content Schema (`content.config.ts`)

Defines the `recipes` collection with typed frontmatter fields using Zod. This gives you TypeScript autocompletion when querying recipes and build-time validation of your frontmatter.

---

## Customization

### Changing the accent color

Edit `tailwind.config.ts` — the `accent` color is currently set to Tailwind's orange palette. Swap it for any color you like:

```ts
colors: {
  accent: {
    500: '#10b981',  // emerald
    // ...
  },
},
```

### Changing fonts

The site uses the **system font stack** (`-apple-system` / SF Pro on Apple devices), set as `fontFamily.sans` in `tailwind.config.ts`. There is no webfont request — nothing to load, nothing to block rendering. To use a webfont instead, add the `<link>` to `nuxt.config.ts` and update `fontFamily` there.

### Adding new frontmatter fields

1. Add the field to the Zod schema in `content.config.ts`
2. Add it to your `.md` frontmatter
3. Use it in your components/pages

---

## Building

**Requires Node 22** — `better-sqlite3` (a `@nuxt/content` dependency) publishes
prebuilt binaries only through Node 25, and the source compile fails on newer
versions. `.nvmrc` pins this.

```bash
nvm use          # reads .nvmrc
npm ci
npm run generate # output lands in .output/public
npx serve .output/public
```

`.output/` is generated and not committed — build it wherever you deploy from.

---

## Troubleshooting

**"Cannot find module @nuxt/content"** — Make sure you ran `npm install`. Content v3 is a dev dependency.

**Images not showing** — The placeholder `.jpg` files included are not real images. Replace them with actual photos at the same paths referenced in your frontmatter.

**Tags not appearing as filter buttons** — Tags are case-sensitive. `"Pasta"` and `"pasta"` would create two separate filter buttons. Keep tags lowercase for consistency.

**Recipe not showing on homepage** — Make sure the `.md` file is in `content/recipes/` and has valid frontmatter with all required fields.
