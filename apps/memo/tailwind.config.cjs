const baseConfig = require('../../tailwind.config.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ['src/**/*.{ts,tsx}'],
  plugins: [...baseConfig.plugins, require('@tailwindcss/typography')]
}
