# Prashant Verma — Portfolio & Blog

A personal portfolio and digital garden built with [Astro](https://astro.build) and [TypeScript](https://www.typescriptlang.org/). Built with an accessible, typography-first minimal design, system fonts, native light/dark mode support, RSS feed, and full content collection validation.

---

## ⚙️ Centralized Configuration (`src/data/site.ts`)

All personal information, placeholders, and links are centralized in a single file:
👉 **[`src/data/site.ts`](file:///Users/prashantverma/Desktop/projects/portfolio/src/data/site.ts)**

In that file, update the following fields marked with `TODO`:
- `siteUrl`: Your live production domain (e.g., `https://prashantverma.dev`)
- `name`: Your display name
- `tagline`: Your personal tagline
- `homeIntro`: Your 2–3 sentence home intro
- `about.intro` & `about.philosophy`: Your personal about bio and engineering philosophy
- `links.github`, `links.linkedin`, `links.email`: Your contact URLs

All pages, layouts, feeds, and configurations automatically read from this file.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.17.1 or higher)
- npm (bundled with Node.js)

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:4321`. Changes in files are automatically reflected with hot module reloading.

---

## 🛠️ Building for Production

1. **Create a production build**:
   ```bash
   npm run build
   ```
   This compiles your site into static assets located in the `dist/` directory.

2. **Preview the production build locally**:
   ```bash
   npm run preview
   ```

---

## ✍️ How to Add a Blog Post (Step by Step)

Posts are stored as Markdown files inside `src/content/blog/`.

### Step 1: Create a new `.md` file
Inside `src/content/blog/`, create a new file named using kebab-case (this filename will become the URL slug of the post).

For example:
```
src/content/blog/understanding-jwt-authentication.md
```

### Step 2: Add the required frontmatter
Every post must include a YAML frontmatter block at the top of the file enclosed by triple dashes (`---`). The schema is strictly validated:

```markdown
---
title: "Understanding JWT Authentication in Node.js"
description: "A deep dive into how stateless tokens work, how to sign and verify them, and token rotation."
date: 2026-10-15
starred: true
draft: false
---
```

#### Frontmatter Fields Explained:
| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | **Required**. The title displayed in the post header, lists, and meta tags. |
| `description` | `string` | **Required**. A concise summary used for RSS feeds, search engines, and Open Graph previews. |
| `date` | `YYYY-MM-DD` | **Required**. Publication date used for chronological sorting and year groupings. |
| `starred` | `boolean` | **Optional** (defaults to `false`). Set to `true` to highlight the post with a star (`★`) across the site. |
| `draft` | `boolean` | **Optional** (defaults to `false`). Set to `true` to keep the post hidden from the website and RSS feed while in progress. |

### Step 3: Write your post in Markdown
Beneath the frontmatter, write your content using standard Markdown syntax. Code blocks automatically support syntax highlighting:

````markdown
## Introduction

Here is an example code block with syntax highlighting:

```typescript
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: 123 }, process.env.JWT_SECRET!, { expiresIn: '1h' });
```
````

---

## 🎨 Design & Accessibility Features

- **Typography-first**: System serif stack for body (`Palatino, Georgia`), system sans-serif for headings, and system monospace for header and code blocks.
- **Fluid scaling**: Utilizes `clamp()` for smooth responsive font sizing without abrupt media query jumps.
- **Light/Dark theme**: Automatically switches via `prefers-color-scheme` using warm off-white (`#faf7f2`) and warm dark brown (`#1c1815`) tones with warm gold accents.
- **No external frameworks or web fonts**: Clean, handwritten CSS with zero runtime overhead or layout shifts.
- **Accessible**: Complies with `prefers-reduced-motion`, visible focus indicators, and semantic HTML structure.
