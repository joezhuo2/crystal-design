<h1 align="center">Crystal Design</h1>

<p align="center">
  <a href="https://crystal-design.vercel.app"><img src="https://img.shields.io/badge/playground-live-a8e0ff?logo=vercel&logoColor=white" alt="playground"></a>
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

- **[Surface](https://crystal-design.vercel.app/#/glass)** (`@crystal-design/glass`): the core panel that bends what is behind it. Every other component is built on it.
- **[Button](https://crystal-design.vercel.app/#/button)** (`@crystal-design/button`): glass button with hover and press states.
- **[Card](https://crystal-design.vercel.app/#/card)** (`@crystal-design/card`): padded panel for text, media or actions.
- **[Navbar](https://crystal-design.vercel.app/#/navbar)** (`@crystal-design/navbar`): top bar pinned while the page scrolls.
- **[Sidebar](https://crystal-design.vercel.app/#/sidebar)** (`@crystal-design/sidebar`): icon rail that expands on hover or keyboard focus.
- **[Icon](https://crystal-design.vercel.app/#/icon)** (`@crystal-design/icon`): glass tile around a glyph or logo, shaped by an optional image mask.

## Install

Install only the components you use:

```bash
npm install @crystal-design/button
```

Needs React 18 or later.

## Usage

Place the component over an image, gradient or other visual content so the
refraction has something to bend:

```tsx
import { Button } from '@crystal-design/button'

<Button radius={12} strength={30} bezel={20}>Get started</Button>
```

Every component takes the same glass props:

| Prop       | Default | What it does                                  |
| ---------- | ------- | --------------------------------------------- |
| `radius`   | `12`    | Corner radius in px (`18` for Card)           |
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
