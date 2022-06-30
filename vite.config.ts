import { defineConfig } from 'vite'
import path from 'path'
import { sharedConfig } from './config/build'

// https://vitejs.dev/config/
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig(({ command, mode }) => {

  return {
    ...sharedConfig,
    input: 'src/manifest.json',
    output: {
      dir: 'dist',
      format: 'esm',
    },
    build: {
      rollupOptions: {
        input: 'src/manifest.json',
        output: {
          dir: 'dist',
          format: 'esm',
        },
        // make sure to externalize deps that shouldn't be bundled
        // into your library
      },
    },
  }
})
