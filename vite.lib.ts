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
      renderChunk(code, chunk) {
        return chunk.isEntry ? { code: `import "./index.css";\n${code}`, map: null } : null
      },
    },
  ],
})
