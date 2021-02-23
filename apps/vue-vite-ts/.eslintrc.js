module.exports = {
  extends: [
    '../../.eslintrc.json',
    'plugin:vue/vue3-recommended',
    'prettier/@typescript-eslint',
    'prettier/vue',
  ],
  ignorePatterns: ['!**/*'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
