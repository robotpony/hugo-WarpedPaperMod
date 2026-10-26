# The flow block

A ```` ```flow ```` block draws a short sequence of steps as a row joined by arrows, or up to three parallel rows. Its syntax lives in hugo-warped's fences/ (`~/projects/sites/hugo-warped/fences/flow.md`, with the shared grammar, notes and bad-line rules in `README.md` there), shared by w42, the cookbook and Scorekeep. Spec changes go to the hugo-warped agent, not here.

w42's hook is `layouts/_default/_markup/render-codeblock-flow.html`. It hands the block to `layouts/partials/diagrams/flow.html`, which draws it (CSS in `assets/css/common/flow.css`), by way of `layouts/partials/diagram.html`, which adds the (i) toggle to the fenced source, and shows the source instead when no line is valid. `partials/fences/line.html` drops each line's `←` note first. The toggle is w42's, not part of the spec.

## Rendering in w42

- Classes all start with `flow` (`.flow`, `.flow-row`, `.flow-step`, `.flow-label`, `.flow-note`, `.flow-arrow`, `.flow-cap`, and for rows `.flow-rows`, `.flow-grid`, `.flow-head`, `.flow-item`), so they don't collide with the cookbook's `.formula` / `.f-*`. The hook writes classes only; colours come from each theme's CSS.
- Each label sits in a small box (`--entry` fill, `--tertiary` border) in Lora, with its note under it in italic `--secondary`. The arrows are `--series-ink`, level with the boxes. The caption is centred under the row in `--secondary`. These are the timeline's tokens, so dark mode follows the theme.
- Parallel rows share one CSS grid: the row labels in the first column (small, monospace, `--secondary`, right-aligned), and each row's `<ol>` a subgrid across the rest, so columns line up whatever the label widths. An item after the first holds its arrow and its step.
- At 640px and below, a single row becomes a centred column with the arrows pointing down. Parallel rows stack instead, each label centred above its row and the row wrapping as needed; columns don't line up there.
