# Prashant Verma: Portfolio & Blog

 Built with [Astro](https://astro.build) and TypeScript.

## Features

- Typography-first minimal design with system fonts
- Light/dark mode via `prefers-color-scheme`
- Markdown blog with validated frontmatter and an RSS feed
- Static output, deployed to GitHub Pages with GitHub Actions

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run preview  # preview the build
```


## Project structure

```
src/
├── components/   # reusable UI pieces
├── content/blog/ # blog posts in Markdown
├── data/site.ts  # site-wide settings (name, tagline, links)
├── layouts/      # page layouts
├── pages/        # routes (home, blog, projects, about, RSS feed)
└── styles/       # global CSS
```

## Deployment

Every push to `main` triggers a GitHub Actions workflow that builds the site and publishes it to GitHub Pages.