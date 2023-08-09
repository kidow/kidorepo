/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'containers/**/*.{ts,tsx}',
    'templates/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    'content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dffc03'
      },
      keyframes: {
        ripple: {
          from: { transform: 'scale(0)' },
          to: { transform: 'scale(4)', opacity: 0 }
        },
        progress: {
          '0%': {
            backgroundPosition: '0 0'
          },
          '100%': {
            backgroundPosition: '60px 0'
          }
        }
      },
      animation: {
        ripple: 'ripple 0.6s linear',
        progress: 'progress 2s linear infinite'
      }
    }
  },
  plugins: [require('prettier-plugin-tailwindcss')]
}
