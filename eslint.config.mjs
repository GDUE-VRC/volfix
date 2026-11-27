import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: ['server/db/migrations/**'],
  },
  {
    rules: {
      'antfu/reasonable-newline': 'off',
      'no-undef': 'off',
    },
  },
)
