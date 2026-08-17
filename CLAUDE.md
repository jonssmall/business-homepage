# business-homepage

Marketing site for Jon's web development business. Plain HTML + Tailwind CSS v4.
No framework, no HTML build step — the `.html` files at the repo root *are* the site.

## Commands

```bash
npm run dev      # Tailwind watch mode — rebuilds css/style.css on change
npm run build    # one-off minified build
npm run serve    # static server on http://localhost:4321
npm start        # build once, then serve
```

## Node

Pinned to Node 24 via `.nvmrc`. Managed with nvm (`~/.nvm`), not apt — `/usr/bin/node`
is a stale 18.19.1 left in place as a system fallback.

**Non-interactive shells do not have nvm on PATH.** Any scripted/automated command that
needs `node` or `npm` must source it first:

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"
```

## Tailwind v4 — no JS config file

v4 is CSS-first. There is deliberately **no `tailwind.config.js`**; don't create one.

- Brand tokens (colors, fonts) are declared in the `@theme` block in `src/input.css`.
  Each token automatically becomes a utility: `--color-brand-600` → `bg-brand-600`.
- Content sources are auto-detected. There is no `content: []` array to maintain.
- Unused theme values are tree-shaken — defining a shade in `@theme` does not emit it
  unless some markup actually uses it. A missing color in the output usually means
  nothing references it yet, not that the token is broken.

## Layout

```
index.html        the site (repo root is the web root)
src/input.css     Tailwind entry + @theme brand tokens  <- edit this
css/style.css     BUILT OUTPUT, gitignored              <- never edit
```

`css/style.css` is gitignored because deploy hosts run `npm run build` themselves.
If the deploy target changes to something without a build step (plain GitHub Pages,
drag-and-drop upload), un-ignore it so the compiled stylesheet ships with the repo.

## Content conventions

All placeholder copy is wrapped in square brackets — `[Business Name]`,
`[Primary call to action]`. These are stand-ins, not real content. Grep for `\[` to
find everything still awaiting real words. Don't invent business details, client names,
metrics, or testimonials to fill them; ask instead.

## Accessibility

The skip link, heading hierarchy, `aria-label` on nav, and the reduced-motion block in
`src/input.css` are deliberate. This site is the shop's own portfolio piece — a11y
regressions here are a credibility problem, not just a lint failure.
