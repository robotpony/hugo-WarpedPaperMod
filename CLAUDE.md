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
  - `_default/single.html` - a post's page. Its description shows under the title only with `showDescription: true` (the site sets it in the Space Command series cascade); otherwise it goes only into the meta tags, schema and OG
  - `partials/` - Reusable template components
    - `projects_sidebar.html` - "Things I've made" from the site's `data/projects.yaml` (heading, items of name/url/icon/icon_dark/blurb; an `img` with an inline `--icon-dark: url(...)` swaps to it in dark mode, main.css). Icon URLs go through `templates/_funcs/versioned-url.html`, which adds `?v=` and a content hash so a redrawn icon skips browser caches; on list pages by default, on others only with `showProjects: true` (`false` hides it). Placed below the content at every width (after a list's posts, before its pagination; after a single page's article); `common/projects.css` drops the blurbs on phones
    - `reading.html` - "Recently read" from the site's `data/reading.json` (profile, books newest first): every `currently-reading` book, then the six newest `read` ones with star ratings. Covers come from the site's `assets/<cover>` through `reading_cover.html`, filled to 200x300. On the home page by default, elsewhere only with `showReading: true`. Placed right after the projects block; `common/reading.css` sets it apart with whitespace only (no visible heading; the aside's aria-label names it), its first label 24px below the projects' closing line. It ends with a link to the site's `/reading/` section when there is one. `reading_book.html` (a cover-and-title row) and `reading_stars.html` are shared with that section
    - `pager.html` - the pager under a paginated list, from a dict of `Paginator` and `Older` (the first page's label for the next one: "Older posts", "Older books")
  - `reading/list.html` - the site's `/reading/` section: every finished book grouped by year, 24 to a page, with "Reading now" leading page 1 and a Goodreads link on every page. The books are unrendered pages (`build: {render: never, list: local}`) from the site's content adapter, `content/reading/_content.gotmpl`, with params author, rating, book_url, and cover, so they never reach site-wide lists, feeds, or the sitemap
  - `shortcodes/` - Custom content blocks
    - `carousel` - a swipeable strip of screenshots written as Markdown images inside `{{< carousel >}}`; a caption's bold lead (`"**Label.** Caption"`) labels its pill, with dots when no slide has one. CSS in `common/carousel.css`; `js/carousel.js` loads only where `.HasShortcode "carousel"` (head.html). Without JS it's a scroll-snap strip with every caption showing
    - `tabs` / `tab` - the same thing shown two ways: `{{< tabs >}}{{< tab "Text" >}}…{{< /tab >}}{{< tab "Label" >}}…{{< /tab >}}{{< /tabs >}}`. Each tab's body renders as Markdown (chroma, render-image.html). No JS: a hidden radio per tab, the first checked, with `common/tabs.css` showing the matching panel (up to six tabs). `{{< tabs layout="side" >}}` shows every panel at once as equal columns from 840px (code at 12.5px, images at column width), and is tabs again below that; `{{< tabs layout="stack" >}}` shows every panel full width, one under another under its label, at every width (no radios), for lines too long for columns
  - `_default/_markup/render-codeblock-timeline.html` - a one-line hook for a ```` ```timeline ```` block, one `YEAR Label` per line (inline Markdown label; `~YEAR` draws faint), drawn in year order as dots on a track of decades. Labels alternate above and below the track, stacking in rows by estimated width, each with a leader to its dot. The syntax is shared with the cookbook (Fugu): `docs/timeline.md` mirrors the shared fence spec in `~/writing/not-a-chef/docs/fences/`, which is the one to change (with the cookbook's agreement). Classes are `.tline-*` (the cookbook's lineage owns `.timeline` and `.tl-*`). Drawn by `partials/diagrams/timeline.html` through `partials/diagram.html`. CSS in `common/timeline.css`, which turns it into a vertical list under 640px
  - `_default/_markup/render-codeblock-flow.html` - a one-line hook for a ```` ```flow ```` block, one `Label | note` step per line (a leading `→ ` or `-> ` is dropped; an optional last `caption:` line), drawn as boxed labels in a row joined by arrows, with an aria-label reading the steps in order. `row: <label>` lines (up to three, the first line when used) draw parallel rows, one `<ol>` each, with step n of every row in one column (a CSS subgrid). The syntax is shared with the cookbook: `docs/flow.md` mirrors the shared fence spec in `~/writing/not-a-chef/docs/fences/`. Classes are `.flow-*`. Drawn by `partials/diagrams/flow.html` through `partials/diagram.html`. CSS in `common/flow.css`, which stacks it as a column under 640px (parallel rows wrap under their labels instead)
  - `_default/_markup/render-codeblock-tabs.html` - a ```` ```tabs ```` block, the fence form of the tabs shortcode, writing the same HTML (so `common/tabs.css` draws both; ids are `tabs-fence-N`). `tab: <label>` lines start panels (inline Markdown labels); each body renders as block Markdown, and `tab:` lines inside a nested fence aren't breaks (the outer fence takes more backticks). `{layout="side"}` or `{layout="stack"}` as on the shortcode. No (i) toggle; a block with no `tab:` lines shows its source. Spec: `tabs.md` in the shared fence spec (`~/writing/not-a-chef/docs/fences/`). The shortcode stays until the manifesto's blocks are migrated
  - `partials/fences/line.html` - drops a `←`/`<-` note from a line of a line-read fence (timeline, flow) and trims it; `\←` and `\<-` stay as literal arrows
  - `partials/diagram.html` - wraps every drawn code-block microformat (`timeline`, `flow`; new ones should call it the same way, from a one-line hook) with an (i) toggle to the fenced source that drives it, fences included and highlighted like other code. The source starts hidden; `js/diagram.js`, which head.html loads only when the page holds a `.diagram`, shows the button (a real `<button>` with `aria-pressed`) and swaps the two. Without JS only the drawing shows. A block with no valid lines shows its source as preformatted text, with a warning. CSS in `common/diagram.css`
  - `_default/_markup/render-image.html` - resolves an image against the page bundle, then site assets. When the image has a `-dark` sibling (`shot.png` and `shot-dark.png`), it adds an inline `--icon-dark` so main.css shows the sibling in dark mode
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
- Fonts (Montserrat, Lora, Alumni Sans Pinstripe) are self-hosted with warped.css: its @font-face rules load fonts/*.woff2 beside it, and head.html preloads Montserrat from there
- No external build tools (webpack, npm) required

## Requirements

- **Hugo version**: 0.158.0 minimum (theme.toml `min_version`, enforced in `baseof.html`)
- **Go module**: `github.com/robotpony/hugo-WarpedPaperMod`
- **No Node.js dependencies** - pure Hugo implementation

## Versions and the changelog

Modelled on Space Command's (`~/projects/utilities/warped-space-command/docs/changelog-style.md` has the full writing rules).

- The version is `version` in `theme.toml`: `major.minor.patch`, pre-1.0. Minor for a capability added or removed (a shortcode, block, layout, front matter param); patch for fixes, visual tweaks, refactors, and docs. Borderline is patch; a fix bundled with a feature is minor. Major only when Bruce asks.
- Every commit that changes the theme bumps the version, and `CHANGELOG.md` gets a `## <version> — <YYYY-MM-DD>` entry in the same commit, with `### Added`, `### Changed`, `### Fixed`, `### Removed` (only those used). A change nobody would notice (docs, refactors) still bumps but gets no entry, so the top entry can be older than the version.
- Write for a post author or a reader: what changed on the page or in the front matter, shortcodes and blocks, by the names they use. Present tense, one or two sentences, about 40 words. Say what an author has to change. A fix names what went wrong, not its cause. How it's built and who asked go in the commit message.
- No tags per version.

## Key Files for Modifications

- `/layouts/partials/head.html` - HTML head modifications
- `/layouts/partials/header.html` - Site header template
- `/layouts/partials/footer.html` - Site footer template
- `/assets/css/core/theme-vars.css` - Design system variables