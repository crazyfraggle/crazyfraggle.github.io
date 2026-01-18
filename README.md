## crazyfraggle.github.io

This is the repository from which I publish my blog. You can find that at the
actual blog site https://crazyfraggle.github.io/.

If you want to use this repository as a guide to how to set up a blog using
SvelteKit 5 with static site generation, feel free.

## Tech Stack

- **SvelteKit 5** with runes syntax
- **mdsvex** for Markdown processing with Svelte components
- **@sveltejs/adapter-static** for static site generation
- **GitHub Actions** for automatic deployment to GitHub Pages

## Project Structure

```
src/
├── lib/
│   ├── components/     # Svelte components (Figure, Header, Footer, etc.)
│   ├── posts.ts        # Post loading utilities
│   └── mdsvex-layout.svelte
├── routes/
│   ├── +layout.svelte  # Main layout with two-column design
│   ├── +page.svelte    # Homepage
│   └── posts/[slug]/   # Dynamic post pages
├── app.html
└── app.css             # Global styles with CSS custom properties
content/
└── posts/              # Markdown blog posts
static/
├── fonts/              # Junction font files
└── images/             # Post images
```

## Running Locally

Make sure you have Node.js installed (v18+), then:

```sh
npm install
npm run dev
```

The site will be available at http://localhost:5173/

## Building

To build the static site:

```sh
npm run build
```

The output will be in the `build/` directory. Preview with:

```sh
npm run preview
```

## Writing Posts

Posts are Markdown files in `content/posts/` with YAML frontmatter:

```markdown
---
title: "My Post Title"
date: 2024-01-15 12:00:00 +0100
categories: misc
---

Your content here...
```

For posts using custom components (like `Figure`), add a script import:

```markdown
<script>
import Figure from '$lib/components/Figure.svelte';
</script>

<Figure file="/images/example.jpg" caption="Example image" />
```

## Deployment

The site automatically deploys to GitHub Pages via GitHub Actions when pushing
to the `master` branch. See `.github/workflows/deploy.yml`.
