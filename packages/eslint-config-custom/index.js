module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    jsx: true,
    useJSXTextNode: true
  },
  extends: [
    'turbo',
    'eslint-config-prettier',
    'eslint:recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'plugin:import/recommended'
  ],
  plugins: ['react-refresh', 'tailwindcss'],
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: '../tailwindcss/tailwind.config.js'
    },
    react: {
      version: 'detect'
    },
    next: {
      rootDir: ['../../apps/archive', '../../apps/link-in-bio']
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser'
    }
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'react/react-in-jsx-scope': 'off',
    // cva reorder 이슈가 해결되면 error로 변경할 것
    'tailwindcss/classnames-order': 'off',
    'import/no-unresolved': 'off'
  },
  ignorePatterns: ['dist', 'build', 'public']
}
