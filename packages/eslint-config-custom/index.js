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

    'react/react-in-jsx-scope': 'off',

    // cva reorder 이슈가 해결되면 error로 변경할 것
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/no-custom-classname': 'off',

    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/ban-types': 'warn',

    'import/no-unresolved': 'off',
    'no-undef': 'off',
    'no-extra-semi': 'off',

    '@next/next/no-img-element': 'off',
    '@next/next/no-before-interactive-script-outside-document': 'off'
  },
  ignorePatterns: ['dist', 'build', 'public']
}
