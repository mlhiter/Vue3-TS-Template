import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from 'vite-plugin-style-import'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import UnoCSS from 'unocss/vite'

// 获取dirName
function getCurrentDir() {
  const fileName = fileURLToPath(import.meta.url)
  const dirName = dirname(fileName)
  return dirName
}

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ],
      dts: 'types/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      extensions: ['vue'],
      dts: 'types/components.d.ts',
      // 全局注册组件不需要导入，手动注册类型
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      resolvers: [
        ElementPlusResolver(),
        // icon auto import: {prefix}-{collection}-{icon}
        IconsResolver({
          prefix: 'icon',
          // enabledCollections: ['bx'],
          // customCollections: ['custom'], custom icon: Icons/customCollections
        }),
      ],
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
    }),
    Icons({
      scale: 1.125,
      compiler: 'vue3',
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(getCurrentDir(), 'src') }],
  },
})
