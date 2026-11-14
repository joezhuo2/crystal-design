<h1 align="center">Crystal Design</h1>

<p align="center">
  <a href="https://crystal-design.vercel.app"><img src="https://img.shields.io/badge/playground-live-a8e0ff?logo=vercel&logoColor=white" alt="playground"></a>
  <a href="#features"><img src="https://img.shields.io/badge/components-6-a8e0ff" alt="6 components"></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white" alt="TypeScript 7"></a>
  <a href="https://vite.dev"><img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/joezhuo2/crystal-design?color=green" alt="license"></a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#install">Install</a> •
  <a href="#usage">Usage</a> •
  <a href="#theming">Theming</a> •
  <a href="#browser-support">Browser support</a> •
  <a href="#development">Development</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

> Crystal Design is a set of liquid glass React components. Each one refracts
> whatever sits behind it through an SVG displacement map, with a bright rim,
> frosted tint and soft shadow. Try every component, tune its settings and
> copy the code in the [playground](https://crystal-design.vercel.app).

## Features

- **[Glass Surface](https://crystal-design.vercel.app/#/surface-glass)** (`GlassSurface`, `@crystal-design/surface-glass`): the core panel that bends what is behind it. Every other component is built on it.
- **[Glass Button](https://crystal-design.vercel.app/#/button-glass)** (`GlassButton`, `@crystal-design/button-glass`): glass button with hover and press states.
- **[Glass Card](https://crystal-design.vercel.app/#/card-glass)** (`GlassCard`, `@crystal-design/card-glass`): padded panel for text, media or actions.
- **[Glass Navbar](https://crystal-design.vercel.app/#/navbar-glass)** (`GlassNavbar`, `@crystal-design/navbar-glass`): top bar pinned while the page scrolls.
- **[Glass Sidebar](https://crystal-design.vercel.app/#/sidebar-glass)** (`GlassSidebar`, `@crystal-design/sidebar-glass`): icon rail that expands on hover or keyboard focus.
- **[Glass Icon](https://crystal-design.vercel.app/#/icon-glass)** (`GlassIcon`, `@crystal-design/icon-glass`): glass tile around a glyph or logo, shaped by an optional image mask.

## Install

Get every component in one package:

```bash
npm install @crystal-design/glass
```

Or install only the ones you use:

```bash
npm install @crystal-design/button-glass
```

Needs React 18 or later.

## Usage

Place the component over an image, gradient or other visual content so the
refraction has something to bend:

```tsx
import { GlassButton, GlassCard } from '@crystal-design/glass'

<GlassCard>
  <GlassButton radius={12} strength={30} bezel={20}>Get started</GlassButton>
</GlassCard>
```

Importing from a single package works the same way:

```tsx
import { GlassButton } from '@crystal-design/button-glass'
```

Every component takes the same glass props:

| Prop       | Default | What it does                                  |
| ---------- | ------- | --------------------------------------------- |
| `radius`   | `12`    | Corner radius in px (`18` for Glass Card)     |
| `strength` | `30`    | How far the rim displaces the backdrop        |
| `bezel`    | `20`    | Width of the curved edge that refracts, in px |

## Theming

The glass look comes from CSS variables, so you can set them on the
component, any ancestor or `:root`:

```css
:root {
  --cg-tint: rgb(255 255 255 / 0.08);
  --cg-frost: 14px;
  --cg-blur: 2px;
  --cg-text: #fff;
  --cg-shadow: 0 10px 36px rgb(0 0 0 / 0.22);
}
```

## Browser support

Chromium browsers render the full refraction. Firefox and Safari fall back to
a frosted blur with the same tint, rim and shadow.

## Development

```bash
npm install
```

```bash
npm run dev
```

The playground runs at `http://localhost:5173`. Other scripts:

- `npm run build`: builds every package and the playground.
- `npm test`: runs the displacement map tests.
- `npm run typecheck`: type checks the playground and packages.

## Contributing

Bug reports and pull requests are welcome. See
[CONTRIBUTING.md](CONTRIBUTING.md), and please follow the
[Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE)
