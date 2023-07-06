const baseConfig = require('../../packages/tailwindcss/tailwind.config.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, require('@tailwindcss/typography')]
}
