import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
    {
        name: 'app/files-to-lint',
        files: ['**/*.{js,mjs,jsx,vue}'],
    },

    {
        name: 'app/files-to-ignore',
        ignores: [
            '**/dist/**',
            '**/dist-ssr/**',
            '**/coverage/**',
            'node_modules/**',
        ],
    },

    js.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    skipFormatting,

    {
        rules: {
            'no-console': 'off',
            'no-debugger': 'off',
            'vue/script-indent': ['off', 4],
            'vue/html-indent': ['off', 4],
            'vue/multi-word-component-names': 'off',
            // 禁止使用拖尾逗号
            'comma-dangle': [1, 'never'],
            // 禁止使用分号
            'semi': [1, 'never'],
            // 使用单引号
            'quotes': [1, 'single'],
            // 禁用行尾空白
            'no-trailing-spaces': [1],
            // 强制一行的最大长度
            'max-len': 0
        },
        settings: {
            'vue': {
                'version': 3
            }
        }
    }
]
