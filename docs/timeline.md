# The timeline block

A ```` ```timeline ```` block draws dated entries as dots on a track of decades. Its syntax lives in hugo-warped's fences/ ([on GitHub](https://github.com/robotpony/hugo-warped/tree/main/fences); locally `~/projects/sites/hugo-warped/fences/timeline.md`, with the shared grammar, notes and bad-line rules in `README.md` there), shared by w42, the cookbook and Scorekeep. Spec changes go to the hugo-warped agent, not here.

w42's hook is `layouts/_default/_markup/render-codeblock-timeline.html`. It hands the block to `layouts/partials/diagrams/timeline.html`, which draws it (CSS in `assets/css/common/timeline.css`), by way of `layouts/partials/diagram.html`, which adds the (i) toggle to the fenced source, and shows the source instead when no line is valid. hugo-warped's `partials/hugo-warped/parse.html` reads the block first (notes dropped, bad lines warned), so the theme only draws. The toggle is w42's, not part of the spec.

## Rendering in w42

- Classes all start with `tline` (`.tline`, `.tline-track`, `.tline-list`, `.tline-mark`, `.tline-dot`, `.tline-name`, `.tline-year`, `.tline-ticks`, `.tline-tick`), so they don't collide with the cookbook's lineage (`.timeline`, `.tl-*`). The hook writes classes and inline position variables only (`left`, `--row`, `--up`, `--down`); colours come from each theme's CSS.
- A tick crosses the track at each decade, with its year centred just under it. Tracks over 80 years name every other decade. The track is inset 16px at each side so the end years fit inside the column.
- Labels alternate above and below the track by entry order. A label that would go below, but whose leader would cross a decade's year, goes above instead, and the next one goes below. On each side, a label takes the nearest row its estimated width clears. Every label has a leader to its dot.
- Labels near either end align to their dot's side so they stay on the track.
- Faint entries have a hollow dot and a muted label.
- At 640px and below, the track becomes a vertical list with each year after its label.
