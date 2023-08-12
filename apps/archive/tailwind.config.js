const baseConfig = require('../../packages/tailwindcss/tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  darkMode: 'class',
  theme: {
    ...baseConfig.theme,
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    }
  },
  plugins: [...baseConfig.plugins, require('@tailwindcss/typography')]
}
