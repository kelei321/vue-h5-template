import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig, loadEnv } from 'vite'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const mockEnabled = env.VITE_MOCK_ENABLED === 'true'

  return {
    base: '/',
    plugins: [
      vue(),
      tailwindcss(),
      Components({
        dts: 'src/components.d.ts',
        resolvers: [VantResolver(), IconsResolver({ prefix: 'i' })]
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: false
      }),
      mockEnabled
        ? mockDevServerPlugin({
            prefix: '/api'
          })
        : null
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0'
    }
  }
})
