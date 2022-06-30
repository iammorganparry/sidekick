import svgVite from 'vite-plugin-react-svg'
import react from '@vitejs/plugin-react'
import manifest from '../manifest.json'
import { crx } from "@crxjs/vite-plugin";

export const sharedConfig = {
    plugins: [svgVite(), react(), crx({ manifest })],
    esbuild: {
        jsxInject: `import React from 'react'`,
    },
    define: {
        'process.env': {},
    },
}
