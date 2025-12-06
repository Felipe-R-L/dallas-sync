// eslint.config.mjs
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '.eslintrc.js'],
  },
  // Configurações recomendadas do JS e TS
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Configuração principal
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Regras de Ordenação de Imports
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Regras do TypeScript (ajustadas para NestJS)
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Regras Gerais
      'no-console': 'warn',
    },
  },

  // Prettier deve vir por último para desativar regras conflitantes
  prettierConfig,
)
