# Warped Visions Hugo theme (a PaperMod fork)

Hugo WarpedPaperMod is a fork of [PaperMod](https://github.com/adityatelange/hugo-PaperMod) (itself derived from [hugo-paper](https://github.com/nanxiaobei/hugo-paper)), customized for [warpedvisions.org](https://warpedvisions.org/).

Goals:
- high readability
- simple layout
- support essays, HOWTO's, and technical articles
- simple and compliant HTML, CSS, JS
- straightforward and correct SEO and other meta data

## Requirements

- Hugo 0.158.0 or newer (extended not required)

## Site params the theme expects

- `warpedScript`, `warpedStyle`: URLs for the branding JS and CSS. These live in the warped.js project and are served from `cdn.warpedvisions.org`; the theme doesn't bundle them.
- `author`: a name string, or a map with `name` and `email` (used in RSS).
- `mainSections`: sections listed on the home page.

## Security headers

`layouts/partials/security.html` sets the Content-Security-Policy and referrer policy as meta tags. Headers that only work as real HTTP headers (HSTS, `X-Content-Type-Options`, `Permissions-Policy`) belong in the site's server config, e.g. `static/.htaccess`.
