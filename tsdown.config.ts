import {defineConfig} from 'tsdown'

export default defineConfig({
    exports: true,
    unbundle: false,
    dts: {
        sourcemap: true,
    },
    entry: {
        index: './src/index.ts',
        outputs: './src/outputs/index.ts'
    },
    format: ['esm', 'cjs']
})
