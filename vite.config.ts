import { defineConfig } from 'vite'
import path from 'path'
import { sharedConfig } from './config/build'
// https://vitejs.dev/config/
export default defineConfig({
  ...sharedConfig,
  build: {
    outDir: path.resolve(__dirname, 'dist/content'),
    lib: {
      entry: path.resolve(__dirname, 'src/content/index.tsx'),
      name: 'VideoScript',
      fileName: `video`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
    },
  },
})
