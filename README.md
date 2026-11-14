<h1 align="center">Crystal Design</h1>

<p align="center">
  <a href="https://crystal-design.vercel.app"><img src="https://img.shields.io/badge/playground-live-a8e0ff?logo=vercel&logoColor=white" alt="playground"></a>
  <a href="#features"><img src="https://img.shields.io/badge/components-52-a8e0ff" alt="52 components"></a>
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

Liquid glass components:

- **[Glass Surface](https://crystal-design.vercel.app/#/surface-glass)** (`GlassSurface`, `@crystal-design/surface-glass`): the core panel that bends what is behind it. Every other component is built on it.
- **[Glass Button](https://crystal-design.vercel.app/#/button-glass)** (`GlassButton`, `@crystal-design/button-glass`): glass button with hover and press states.
- **[Glass Card](https://crystal-design.vercel.app/#/card-glass)** (`GlassCard`, `@crystal-design/card-glass`): padded panel for text, media or actions.
- **[Glass Navbar](https://crystal-design.vercel.app/#/navbar-glass)** (`GlassNavbar`, `@crystal-design/navbar-glass`): top bar pinned while the page scrolls.
- **[Glass Sidebar](https://crystal-design.vercel.app/#/sidebar-glass)** (`GlassSidebar`, `@crystal-design/sidebar-glass`): icon rail that expands on hover or keyboard focus.
- **[Glass Icon](https://crystal-design.vercel.app/#/icon-glass)** (`GlassIcon`, `@crystal-design/icon-glass`): glass tile around a glyph or logo, shaped by an optional image mask.
- **[Glass Tabs](https://crystal-design.vercel.app/#/tabs-glass)** (`GlassTabs`, `@crystal-design/tabs-glass`): segmented tabs with a stretchy thumb that leads with its edge.
- **[Glass Select](https://crystal-design.vercel.app/#/select-glass)** (`GlassSelect`, `@crystal-design/select-glass`): glass listbox with a gliding highlight and full keyboard support.
- **[Glass Tooltip](https://crystal-design.vercel.app/#/tooltip-glass)** (`GlassTooltip`, `@crystal-design/tooltip-glass`): glass tooltip with a warm window so neighbours show instantly.
- **[Glass Menu](https://crystal-design.vercel.app/#/menu-glass)** (`GlassMenu`, `GlassContextMenu`, `@crystal-design/menu-glass`): dropdown and context menu with a springy entrance and gliding highlight.
- **[Glass Modal](https://crystal-design.vercel.app/#/modal-glass)** (`GlassModal`, `GlassDrawer`, `@crystal-design/modal-glass`): native dialog modal and drawer on a glass panel.
- **[Glass Toast](https://crystal-design.vercel.app/#/toast-glass)** (`GlassToaster`, `toast`, `@crystal-design/toast-glass`): glass toasts with a border that burns down like a fuse.
- **[Glass Command Palette](https://crystal-design.vercel.app/#/command-palette-glass)** (`GlassCommandPalette`, `@crystal-design/command-palette-glass`): searchable command list in a glass overlay, opened with Ctrl or Cmd K.
- **[Glass Switch](https://crystal-design.vercel.app/#/switch-glass)** (`GlassSwitch`, `@crystal-design/switch-glass`): glass switch with a spring knob.
- **[Glass Checkbox](https://crystal-design.vercel.app/#/checkbox-glass)** (`GlassCheckbox`, `@crystal-design/checkbox-glass`): glass checkbox that draws its check.
- **[Glass Progress Ring](https://crystal-design.vercel.app/#/progress-ring-glass)** (`GlassProgressRing`, `@crystal-design/progress-ring-glass`): progress ring set on a round glass disc.
- **[Glass Timed Button](https://crystal-design.vercel.app/#/timed-button-glass)** (`GlassTimedButton`, `@crystal-design/timed-button-glass`): glass action button that arms a timed undo window with a burning fuse.
- **[Glass Accordion](https://crystal-design.vercel.app/#/accordion-glass)** (`GlassAccordion`, `@crystal-design/accordion-glass`): collapsible sections in one glass container.
- **[Glass Skeleton](https://crystal-design.vercel.app/#/skeleton-glass)** (`GlassSkeleton`, `@crystal-design/skeleton-glass`): frosted placeholder blocks with a sweeping shimmer.
- **[Glass Island](https://crystal-design.vercel.app/#/island-glass)** (`GlassIsland`, `@crystal-design/island-glass`): a pill that morphs into a panel.

Themed components and effects, styled with plain CSS variables instead of glass:

- **[Spotlight](https://crystal-design.vercel.app/#/spotlight)** (`useSpotlight`, `@crystal-design/spotlight`): cursor-lit border and inner glow that follow the pointer, also available as the `spotlight` prop on every glass component.
- **[Stardust](https://crystal-design.vercel.app/#/stardust)** (`Stardust`, `@crystal-design/stardust`): twinkling particle trail that follows the cursor inside a container or the whole window.
- **[Animated Number](https://crystal-design.vercel.app/#/animated-number)** (`AnimatedNumber`, `@crystal-design/animated-number`): number that tweens to its new value and retargets smoothly when interrupted.
- **[Feedback Button](https://crystal-design.vercel.app/#/feedback-button)** (`FeedbackButton`, `@crystal-design/feedback-button`): button that swaps to busy, done or error content while its action runs, like Copy to Copied.
- **[Checkbox](https://crystal-design.vercel.app/#/checkbox)** (`Checkbox`, `@crystal-design/checkbox`): native checkbox with a spring fill, drawn check mark and squish.
- **[Color Picker](https://crystal-design.vercel.app/#/color-picker)** (`ColorPicker`, `@crystal-design/color-picker`): swatch button opening an HSV picker with hue slider, presets and hex input.
- **[Tooltip](https://crystal-design.vercel.app/#/tooltip)** (`Tooltip`, `@crystal-design/tooltip`): CSS-only themed tooltip that shows on hover and focus.
- **[Smooth Scroll](https://crystal-design.vercel.app/#/smooth-scroll)** (`smoothScroll`, `useSmoothScroll`, `@crystal-design/smooth-scroll`): inertial wheel scrolling for the window or any scrollable element.
- **[Position](https://crystal-design.vercel.app/#/position)** (`place`, `useDismiss`, `@crystal-design/position`): popup placement that flips and clamps, plus a layered dismiss hook.
- **[Navbar](https://crystal-design.vercel.app/#/navbar)** (`Navbar`, `@crystal-design/navbar`): solid themed top bar.
- **[Sidebar](https://crystal-design.vercel.app/#/sidebar)** (`Sidebar`, `SidebarItem`, `@crystal-design/sidebar`): solid themed icon rail that expands on hover or focus.
- **[Progress Ring](https://crystal-design.vercel.app/#/progress-ring)** (`ProgressRing`, `@crystal-design/progress-ring`): circular progress that shifts colour at warn and high thresholds, with a centre slot and optional pulse.
- **[Timed Button](https://crystal-design.vercel.app/#/timed-button)** (`TimedButton`, `@crystal-design/timed-button`): action button that arms a timed undo window with a burning fuse.
- **[Smooth Range](https://crystal-design.vercel.app/#/smooth-range)** (`SmoothRange`, `@crystal-design/smooth-range`): native range input whose value eases toward the clicked point.
- **[Intro Loader](https://crystal-design.vercel.app/#/intro-loader)** (`IntroLoader`, `@crystal-design/intro-loader`): boot-style loading overlay that steps through stages with a progress bar and flickering hex readout.

Effects, animations and transitions that wrap any element, glass or not:

- **[Glide Effect](https://crystal-design.vercel.app/#/glide-effect)** (`GlideEffect`, `@crystal-design/glide-effect`): stretchy indicator that glides behind the active tab, navbar link or sidebar row.
- **[Follow Effect](https://crystal-design.vercel.app/#/follow-effect)** (`FollowEffect`, `@crystal-design/follow-effect`): highlight pill that follows the pointer or keyboard focus across lists, navbars and grids.
- **[Focus Effect](https://crystal-design.vercel.app/#/focus-effect)** (`FocusEffect`, `@crystal-design/focus-effect`): jelly springs that swell the active item of a group and nudge its neighbours aside.
- **[Click Effect](https://crystal-design.vercel.app/#/click-effect)** (`ClickEffect`, `@crystal-design/click-effect`): size-aware press with spring release and ring, shake, spin, pop or jelly click animations.
- **[Orbit Effect](https://crystal-design.vercel.app/#/orbit-effect)** (`OrbitEffect`, `@crystal-design/orbit-effect`): a bright highlight orbiting the border, always or on hover.
- **[Shimmer Effect](https://crystal-design.vercel.app/#/shimmer-effect)** (`ShimmerEffect`, `@crystal-design/shimmer-effect`): a diagonal band of light sweeping across, looping or on hover.
- **[Fuse Effect](https://crystal-design.vercel.app/#/fuse-effect)** (`FuseEffect`, `@crystal-design/fuse-effect`): a fuse that burns along the border or a bottom bar over a set duration, with pause.
- **[Pop Effect](https://crystal-design.vercel.app/#/pop-effect)** (`PopEffect`, `usePresence`, `@crystal-design/pop-effect`): springy scale and fade entrance and exit, unmounting after the exit.
- **[Fade In Effect](https://crystal-design.vercel.app/#/fade-in-effect)** (`FadeInEffect`, `@crystal-design/fade-in-effect`): fades elements or text in from the bottom, top, a side or in place, optionally word by word.
- **[Collapse Effect](https://crystal-design.vercel.app/#/collapse-effect)** (`CollapseEffect`, `@crystal-design/collapse-effect`): animates content open and closed, keeping it mounted but inert while closed.
- **[Morph Effect](https://crystal-design.vercel.app/#/morph-effect)** (`MorphEffect`, `@crystal-design/morph-effect`): morphs a panel from a pill into its full shape, clipping backdrop blur cleanly.
- **[Swap Effect](https://crystal-design.vercel.app/#/swap-effect)** (`SwapEffect`, `@crystal-design/swap-effect`): swaps content with a blur, fade and slide while the width animates.
- **[Draw Effect](https://crystal-design.vercel.app/#/draw-effect)** (`DrawEffect`, `@crystal-design/draw-effect`): draws an inline SVG stroke by stroke, or wipes it in.
- **[Pulse Effect](https://crystal-design.vercel.app/#/pulse-effect)** (`PulseEffect`, `@crystal-design/pulse-effect`): a breathing opacity, scale or glow pulse.
- **[Text Scramble](https://crystal-design.vercel.app/#/text-scramble)** (`TextScramble`, `@crystal-design/text-scramble`): text that decodes into place through look-alike glyphs.
- **[Glitch Text](https://crystal-design.vercel.app/#/glitch-text)** (`GlitchText`, `@crystal-design/glitch-text`): text that glitches in and out with RGB-split slices and a displacement filter.
- **[Ripple Hover Effect](https://crystal-design.vercel.app/#/ripple-hover-effect)** (`RippleHoverEffect`, `@crystal-design/ripple-hover-effect`): characters lift and swell around the pointer, with a wave from where it enters.

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
| `spotlight` | off    | Light that follows the cursor; pass a color string to tint it |

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

The themed components read their own variables:

```css
:root {
  --cd-accent: #a8e0ff;
  --cd-fg: #fff;
  --cd-bg: #000;
  --cd-raised: #111;
  --cd-line: rgb(255 255 255 / 0.2);
  --cd-muted: rgb(255 255 255 / 0.65);
  --cd-radius: 8px;
  --cd-radius-lg: 18px;
  --cd-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
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
- `npm test`: runs the unit tests.
- `npm run typecheck`: type checks the playground and packages.

## Contributing

Bug reports and pull requests are welcome. See
[CONTRIBUTING.md](CONTRIBUTING.md), and please follow the
[Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE)
