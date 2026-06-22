import js from '@eslint/js'
import prettierConfig from '@vue/eslint-config-prettier'
import { withVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import type { Linter } from 'eslint'

const config = withVueTs(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'src/components.d.ts',
      '*.js',
      '*.d.ts',
      'mock/**/*.js',
      'mock/**/*.d.ts',
      'src/**/*.js',
      'src/**/*.d.ts'
    ]
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    files: ['**/*.{ts,vue}'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  prettierConfig
)

export default config as unknown as Linter.Config[]
