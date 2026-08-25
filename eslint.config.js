import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'no-console': 'off',
      'node/prefer-global/process': 'off',
      'ts/no-unused-expressions': 'off',
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'unpackage',
      '**/.output',
      'types/auto-imports.d.ts',
      'src/components.d.ts',
    ],
  },
)
