/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dffc03'
      }
    }
  },
  plugins: [require('prettier-plugin-tailwindcss')]
}
