# Changelog

The w42 theme's changes, newest first. Versions are `major.minor.patch`, pre-1.0. Changes from before the fork's cleanup on 2026-10-15 are in the git history.

## 0.8.0 — 2026-10-27

### Changed

- Timeline, flow and tabs blocks are read by hugo-warped, imported as a Hugo module, and draw and warn exactly as before. A site that takes the theme as a git submodule adds hugo-warped beside it and a `[module] replacements` line mapping `github.com/robotpony/hugo-warped` to that folder.

## 0.7.5 — 2026-10-26

### Changed

- A `← note` after a tabs block's `tab:` label is dropped, as in timeline and flow lines; a `tab:` line that's only a note draws "Tab" with a warning. A `←` in a panel's body is still ordinary text.

## 0.7.4 — 2026-10-26

### Changed

- In a flow block, a lowercase keyword line it doesn't take (`note: rest after`) is skipped with a warning instead of drawn as a step; `Note: rest` is still a step. A second `caption:` is skipped with a warning, and the first one stands.
- A timeline's `caption:` line now warns as an unknown keyword rather than a bad year. It was already skipped.

## 0.7.3 — 2026-10-26

### Fixed

- A timeline, flow or tabs warning about one line gives that line's number, not the block's opening fence. Too many steps, rows or tabs warns at the first one past the limit.

## 0.7.2 — 2026-10-26

### Changed

- Build warnings from timeline, flow and tabs blocks carry the shared spec's code after the type, as in `flow [too-many-cells]: skipped …`. A bare year in a timeline now warns as a missing label, not a bad year.

## 0.7.0 — 2026-10-26

### Removed

- The `{{< tabs >}}` and `{{< tab >}}` shortcodes. Write a ```` ```tabs ```` block instead, with a `tab: <label>` line before each panel and `{layout="side"}` or `{layout="stack"}` for the layout.

## 0.6.0 — 2026-10-26

### Added

- A ```` ```tabs ```` block does what the tabs shortcode does: `tab: <label>` lines start panels, and `{layout="side"}` or `{layout="stack"}` sets the layout. Give the outer fence more backticks than any fence inside it. The shortcode still works for now.
- Timeline and flow lines can end in a note, `← text` or `<- text`, for whoever reads the source. It's never drawn; write `\←` for a literal arrow.

### Changed

- A timeline or flow block with no valid lines shows its source as plain preformatted text, with a build warning, instead of nothing.

## 0.5.1 — 2026-10-25

### Changed

- A blog post shows its date under its title, in small caps ("25 OCT 2026"). Other pages, lists, and projects don't.

## 0.5.0 — 2026-10-23

### Added

- Timeline and flow blocks have an (i) button that swaps the drawing for the fenced source that draws it, and back. Without JavaScript, only the drawing shows.
- A flow block can draw up to three parallel rows. Start it with `row: <label>` lines; step n of every row lines up in one column. See `docs/flow.md`.
- `{{< tabs layout="stack" >}}` shows every panel full width, one under another beneath its label, for lines too long for columns.

### Changed

- A post's description shows under its title only when its front matter sets `showDescription: true`. Otherwise it goes only into the meta tags and share card. The Space Command series sets it in its cascade.
- Timeline labels sit over their leader lines on the page background, in taller rows.
- Links that hold code or sit inside emphasis get the same tinted underline as other links in a post.

## 0.4.0 — 2026-10-22

### Added

- A Recently read shelf under the projects block on the home page: every book being read, then the six most recently finished, with covers and star ratings. `showReading: true` adds it to other pages.
- The /reading/ section lists every finished book by year, 24 to a page, with Reading now first. The shelf's last link goes there instead of to Goodreads.
- A ```` ```timeline ```` block draws `YEAR Label` lines as dots on a track of decades, with labels above and below it; `~YEAR` draws faint. Phones get a list. See `docs/timeline.md`.
- A ```` ```flow ```` block draws `Label | note` steps as boxes joined by arrows, with an optional `caption:` line. Phones get a column. See `docs/flow.md`.
- `{{< tabs >}}` with `{{< tab "Label" >}}` panels shows the same thing two ways, with no JavaScript. `layout="side"` shows the panels as columns on screens 840px and wider.
- An image with a `-dark` sibling in its bundle (`shot.png` and `shot-dark.png`) shows the sibling in dark mode.

### Changed

- The fonts load from the same CDN as warped.css instead of Google Fonts.
- The pager under a list is shared by the posts and the reading section, each with its own label for older pages.

## 0.3.0 — 2026-10-18

### Added

- A "Things I've made" block from the site's `data/projects.yaml`, below the posts on list pages and on any page with `showProjects: true` (`false` hides it). Each project has a 24px icon, an `icon_dark` for dark mode, and a blurb that phones leave out.
- `{{< carousel >}}` turns the Markdown images inside it into a swipeable strip of screenshots. A caption's bold lead labels its pill; with no labels it shows dots.
- A wordmark share card for pages without their own image, and Twitter card tags on the live site.

### Changed

- Post tags are outlined chips under "Filed under", with a series' tag first and tinted.
- The tags page shows the most-used tags, then every tag from A to Z.
- Newer and older buttons sit either side of the page numbers, in place of the Next pill.
- The header tagline's links are rainbow-tinted chips.
- Buttons and tags share one small corner radius.
- Project icons get a new URL whenever they're redrawn, so browsers don't show a stale copy.

### Removed

- The Safari pinned-tab icon, which pointed at a missing file. The web app manifest keeps only the basics.

## 0.2.0 — 2026-10-17

### Added

- A page's `icon` front matter puts an inline icon in its title, before the phrase named in `iconFor` or before the whole title. It takes a bundle image or a site URL.
- Section and tag pages have a small labelled RSS link to the right of their titles.
- A text adventure set in a maker's workshop replaces the stock 404 page.

### Changed

- Post descriptions match the home page intro, at 18px with a rule below.

### Fixed

- Draft posts show in list previews again; warped.css had been hiding them.

## 0.1.0 — 2026-10-15

### Changed

- The theme needs Hugo 0.158.0 or later.
- The Mastodon profile link is a `rel="me"` link in the page head.

### Removed

- The non-English translations.
- The bundled copy of the branding script. Branding loads only from the CDN.
- Security meta tags that browsers ignore.
