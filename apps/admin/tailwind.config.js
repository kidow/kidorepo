const baseConfig = require('../../packages/tailwindcss/tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, require('@tailwindcss/typography')]
}
