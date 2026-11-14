# Contributing

Bug reports, ideas and pull requests are welcome. By taking part you agree to
follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Reporting a bug

Open an [issue](https://github.com/joezhuo2/crystal-design/issues) with:

- the component and the props or settings you used
- your browser and version (refraction only runs in Chromium; other browsers
  get the frosted fallback)
- a screenshot or a short description of what looks wrong

## Pull requests

See [Development](README.md#development) for the setup. Before opening a PR,
run:

```bash
npm run typecheck
```

```bash
npm test
```

```bash
npm run build
```

Keep changes small and focused. For a visual change, check it in the
playground in both light and dark mode. The PR template has a checklist for
what to check.

### Adding a component

1. Create `packages/<name>` with a `package.json`, `src/index.ts` and the
   component, built on `GlassSurface` from `@crystal-design/glass`.
2. Add an entry to `playground/src/catalog.tsx` with its controls, preview and
   code snippet.
3. Add it to the [Features](README.md#features) list in the README.

Crystal Design aims to stay small: no runtime dependencies besides React.
Avoid adding one unless it clearly pulls its weight.
