const baseConfig = require('../../tailwind.config.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  corePlugins: {
    preflight: false
  },
  content: ['src/**/*.{ts,tsx}']
}
