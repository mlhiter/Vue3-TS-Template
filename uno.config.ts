// uno.config.js
import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      /* preset options */
    }),
  ],
  // ...UnoCSS options
})
