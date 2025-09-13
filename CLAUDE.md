# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **WarpedPaperMod**, a Hugo theme based on PaperMod, specifically customized for WarpedVisions.org. It's a fast, clean, responsive theme optimized for essays, HOWTOs, and technical articles with high readability as a primary goal.

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
  - `warped.css` - Custom theme branding and features
- **`/assets/js/`** - JavaScript functionality:
  - `warped.js` - Custom theme features (rainbow links, brand bars)
  - `fastsearch.js` - Search implementation using Fuse.js
- **`/layouts/`** - Hugo templates:
  - `_default/` - Core page templates
  - `partials/` - Reusable template components
  - `shortcodes/` - Custom content blocks
- **`/i18n/`** - 40+ language translations

### Key Features
- Custom "Warped" branding with colorful top/bottom bars
- Rainbow-colored article links with hover effects
- Built-in search functionality
- Responsive design with mobile-first approach
- Comprehensive internationalization support
- Light/dark theme toggle using CSS custom properties

### Design System
Theme variables are defined in `/assets/css/core/theme-vars.css` with light/dark mode support. Custom branding colors and typography are in `/assets/css/warped.css`.

## Asset Pipeline

Hugo's built-in asset processing handles:
- CSS concatenation, minification, and fingerprinting
- JavaScript bundling
- Google Fonts integration with preload optimization
- No external build tools (webpack, npm) required

## Requirements

- **Hugo version**: 0.125.7 minimum (specified in theme.toml:40)
- **Go module**: References PaperMod structure
- **No Node.js dependencies** - pure Hugo implementation

## Key Files for Modifications

- `/layouts/partials/head.html` - HTML head modifications
- `/layouts/partials/header.html` - Site header template
- `/layouts/partials/footer.html` - Site footer template
- `/assets/css/core/theme-vars.css` - Design system variables