const baseConfig = require('../../tailwind.config.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ['app/**/*.{ts,tsx}']
}
