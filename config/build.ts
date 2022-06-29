import svgVite from 'vite-plugin-react-svg'
import react from '@vitejs/plugin-react'

export const sharedConfig = {
    plugins: [svgVite(), react()],
    esbuild: {
        jsxInject: `import React from 'react'`,
    },
    define: {
        'process.env': {},
    },
}
