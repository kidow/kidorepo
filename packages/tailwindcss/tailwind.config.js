/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    'content/**/*.{md,mdx}'
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
