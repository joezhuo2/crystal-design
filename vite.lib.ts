import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const pkg = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'))
const deps = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })

export default defineConfig({
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index', cssFileName: 'index' },
    rolldownOptions: {
      external: (id) => deps.some((dep) => id === dep || id.startsWith(`${dep}/`)),
    },
  },
  plugins: [
    {
      name: 'import-own-css',
      enforce: 'post',
      generateBundle(_, bundle) {
        const entry = bundle['index.js']
        if (bundle['index.css'] && entry?.type === 'chunk') entry.code = `import "./index.css";\n${entry.code}`
      },
    },
  ],
})
