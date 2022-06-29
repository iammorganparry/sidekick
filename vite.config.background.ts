// vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'
import { sharedConfig } from './config/build'

export default defineConfig({
    ...sharedConfig,
    build: {
        outDir: path.resolve(__dirname, 'dist/background'),
        lib: {
            entry: path.resolve(__dirname, 'src/background/background.ts'),
            name: 'BackgroundScript',
            fileName: `background`,
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
        },
    },
})
