import { defineConfig } from 'vite'
import { sharedConfig } from './config/build'

// https://vitejs.dev/config/
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  ...sharedConfig,
})
