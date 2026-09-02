import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },

  // Base JS recommended
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // React hooks rules
  {
    plugins: { 'react-hooks': reactHooks },
    rules:   reactHooks.configs.recommended.rules,
  },

  // Global environment
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals:     globals.browser,
    },
  },

  // Project-specific rule overrides
  {
    rules: {
      // Allow underscore-prefixed unused vars (common pattern for type-only imports)
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Allow explicit `any` with a warning (useful during scaffolding)
      '@typescript-eslint/no-explicit-any': 'warn',
      // Enforce consistent type imports
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },

  // Prettier must be last — disables conflicting style rules
  prettierConfig,
)
