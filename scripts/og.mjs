// Renders public/og.svg → public/og.png at 1200×630 for social previews.
// Runs automatically before every `npm run build`.

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { Resvg } from '@resvg/resvg-js'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const svgPath = resolve(root, 'public/og.svg')
const pngPath = resolve(root, 'public/og.png')

const svg = await readFile(svgPath, 'utf-8')

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: {
    // System fonts are fine as fallback. Google Fonts in the SVG won't
    // load here, but resvg will substitute reasonable alternatives.
    loadSystemFonts: true,
  },
  background: '#0a0b0d',
})

const png = resvg.render().asPng()
await writeFile(pngPath, png)
console.log(`✓ og.png · ${(png.length / 1024).toFixed(1)} KB`)
