# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev      # dev server at http://localhost:5173
npm run build    # static site to build/
npm run preview  # preview build locally
```

No lint or test commands — this project has no test suite or configured linter.

## Architecture

A **SvelteKit 5** static blog using **mdsvex** to render Markdown posts as Svelte components. The adapter is `@sveltejs/adapter-static`, so all routes are prerendered at build time.

**Post loading** (`src/lib/posts.ts`): Uses Vite's `import.meta.glob` to eagerly import all `content/posts/*.md` files. Slugs are derived by stripping the `YYYY-MM-DD-` date prefix and lowercasing the filename. Frontmatter (`title`, `date`, `categories`) is exposed via mdsvex as `metadata`.

**Routing**: The only dynamic route is `src/routes/posts/[slug]/`, which calls `getPost(slug)` and exports `entries()` so SvelteKit can prerender all posts statically.

**mdsvex layout**: Every Markdown post is wrapped by `src/lib/mdsvex-layout.svelte`, which receives frontmatter as props.

## Writing Posts

Add a Markdown file to `content/posts/` named `YYYY-MM-DD-Title.md` with frontmatter:

```markdown
---
title: "Post Title"
date: 2024-01-15 12:00:00 +0100
categories: misc
---
```

To use Svelte components inside a post (e.g. `Figure`, `CodePen`):

```markdown
<script>
import Figure from '$lib/components/Figure.svelte';
</script>

<Figure file="/images/example.jpg" caption="Caption text" />
```

Draft posts go in `content/drafts/` and are not picked up by the glob.

## Deployment

Pushing to `master` triggers GitHub Actions to build and deploy to GitHub Pages (`crazyfraggle.github.io`). The `static/CNAME` file sets the custom domain.
