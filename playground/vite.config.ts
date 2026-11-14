import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@crystal-design\/([^/]+)$/,
        replacement: resolve(import.meta.dirname, '../packages/$1/src/index.ts'),
      },
    ],
  },
})
