# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **WarpedPaperMod**, a Hugo theme forked from PaperMod, specifically customized for WarpedVisions.org. It's a fast, clean, responsive theme optimized for essays, HOWTOs, and technical articles with high readability as a primary goal.

## Development Commands

Since this is a Hugo theme, development happens within a Hugo site that uses this theme. Common commands:

- `hugo server` - Start development server with live reloading
- `hugo server --disableFastRender` - Server with full rebuilds (useful for theme changes)
- `hugo` - Build the site

## Architecture

### Core Structure
- **`/assets/css/`** - Modular CSS architecture:
  - `core/` - Base styles (theme-vars.css contains design system)
  - `common/` - Page-specific styles 
- **`/assets/js/`** - JavaScript functionality:
  - `fastsearch.js` - Search implementation using Fuse.js
- **`/layouts/`** - Hugo templates:
  - `_default/` - Core page templates
  - `partials/` - Reusable template components
    - `projects_sidebar.html` - "Things I've made" from the site's `data/projects.yaml` (heading, items of name/url/icon/icon_dark/blurb; an `img` with an inline `--icon-dark: url(...)` swaps to it in dark mode, main.css); on list pages by default, on others only with `showProjects: true` (`false` hides it). Placed below the content at every width (after a list's posts, before its pagination; after a single page's article); `common/projects.css` drops the blurbs on phones
  - `shortcodes/` - Custom content blocks
    - `carousel` - a swipeable strip of screenshots written as Markdown images inside `{{< carousel >}}`; a caption's bold lead (`"**Label.** Caption"`) labels its pill, with dots when no slide has one. CSS in `common/carousel.css`; `js/carousel.js` loads only where `.HasShortcode "carousel"` (head.html). Without JS it's a scroll-snap strip with every caption showing
- **`/i18n/`** - English strings only (`en.yaml`)
- Branding JS/CSS (rainbow links, brand bars) is not in the theme: it loads from the URLs in the site's `warpedScript`/`warpedStyle` params (`cdn.warpedvisions.org`)

### Key Features
- Custom "Warped" branding with colorful top/bottom bars
- Rainbow-colored article links with hover effects
- Built-in search functionality
- Responsive design with mobile-first approach
- Light/dark theme toggle using CSS custom properties

### Design System
Theme variables are defined in `/assets/css/core/theme-vars.css` with light/dark mode support. Custom branding colors and typography live in the CDN-hosted `warped.css`.

## Asset Pipeline

Hugo's built-in asset processing handles:
- CSS concatenation, minification, and fingerprinting
- JavaScript bundling
- Google Fonts integration with preload optimization
- No external build tools (webpack, npm) required

## Requirements

- **Hugo version**: 0.158.0 minimum (theme.toml `min_version`, enforced in `baseof.html`)
- **Go module**: `github.com/robotpony/hugo-WarpedPaperMod`
- **No Node.js dependencies** - pure Hugo implementation

## Key Files for Modifications

- `/layouts/partials/head.html` - HTML head modifications
- `/layouts/partials/header.html` - Site header template
- `/layouts/partials/footer.html` - Site footer template
- `/assets/css/core/theme-vars.css` - Design system variables