# The flow block

A fenced code block with the info string `flow` draws a short sequence of steps as one row, with arrows between them. This file is the shared spec for warpedvisions.org (the w42 theme) and bruce-loves-to-cook.ca (the Fugu theme). w42 owns it; each site keeps its own hook and CSS, and the syntax below is what both accept. It's modelled on the cookbook's `formula` diagrams in their `→` mode, without icons.

The reference hook is w42's `layouts/_default/_markup/render-codeblock-flow.html`, with its CSS in `assets/css/common/flow.css`.

## Syntax

````markdown
```flow
Markdown | in git
Hugo
public/
rsync
Dreamhost
caption: How a post gets to the server
```
````

One step per line, in order:

1. **Label.** Everything before the `|`, or the whole line when there's no `|`. Keep it to one or two short words.
2. **Note.** Optional: everything after the `|`. It's drawn under the label, quieter than the label.
3. **Arrow prefix.** Lines after the first may start with `→ ` or `-> `, which is dropped; the hook draws the arrows itself. This lets a cookbook formula sequence paste in once its icon column is removed:

   ````markdown
   ```flow
   Roast    | deep brown
   → Extract  | bones set the time
   → Reduce   | by half
   → Strain
   ```
   ````

4. **Caption.** An optional `caption: <text>` line, last in the block, is drawn under the row. It uses the same keyword as `formula`.

Leading and trailing whitespace around a line, a label or a note is ignored, and blank lines are skipped. Labels, notes and the caption are inline Markdown, rendered with the page's own `RenderString` and `"display" "inline"`, so each site's render hooks apply.

Keep a block to about five steps. More still draw, with a warning, since they crowd the row.

## Use

The diagram illustrates the text; it MUST NOT replace it. Only draw a sequence the surrounding prose already states. The block has to read as plain text where it's written (Obsidian, GitHub), which this syntax does.

## Accessibility

The row reads as one image, with an `aria-label` that names the steps in order, each label followed by its note and joined by ", then ": "Markdown in git, then Hugo, then public/, then rsync, then Dreamhost". The caption is a real `figcaption`, outside that image.

## Lines that don't match

A line that doesn't match isn't drawn. The hook prints a build warning that quotes the line and gives the block's position:

```
WARN  flow: skipped "A | b | c" (want "Label | note") in "…/index.md:30:1"
```

These warn:

- More than one `|`: `A | b | c`
- No label: `| a note`
- A step after the caption: the caption goes last
- An arrow on the first line (`→ Markdown`): the arrow is dropped and the step is drawn, with a warning
- More than five steps: drawn, with a warning
- No steps at all: nothing is drawn

A warning means "not drawn this way yet", not "never valid". Any extension (branches, step links, more columns) must be agreed between both sites and written here first, and must keep every line that's valid today drawing the same way.

## Rendering in w42

Not part of the spec; for reference when porting.

- Classes all start with `flow` (`.flow`, `.flow-row`, `.flow-step`, `.flow-label`, `.flow-note`, `.flow-arrow`, `.flow-cap`), so they don't collide with the cookbook's `.formula` / `.f-*`. The hook writes classes only; colours come from each theme's CSS.
- Each label sits in a small box (`--entry` fill, `--tertiary` border) in Lora, with its note under it in italic `--secondary`. The arrows are `--series-ink`, level with the boxes. The caption is centred under the row in `--secondary`. These are the timeline's tokens, so dark mode follows the theme.
- At 640px and below, the row becomes a centred column with the arrows pointing down.
