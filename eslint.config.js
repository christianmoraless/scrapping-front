import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": "allow-with-description", // Permite @ts-ignore si tiene descripción
          "ts-expect-error": false, // Mantiene @ts-expect-error como obligatorio en otros casos
          "ts-nocheck": true, // Prohíbe @ts-nocheck (opcional)
          "ts-check": true, // Prohíbe @ts-check (opcional),
          "@typescript-eslint/no-explicit-any": "off",
          "ignoreRestSiblings": true,
          '@typescript-eslint/no-unused-vars': 'off',
          'no-unused-vars': 'off'
        },
      ]
    }
  },
])
