module.exports = {
  extends: [
    'turbo',
    'prettier',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended'
  ],
  plugins: ['tailwindcss', 'react', 'react-refresh'],
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: '../tailwindcss/tailwind.config.js'
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser'
    }
  ]
}
