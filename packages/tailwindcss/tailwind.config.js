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
        },
        'fade-up': {
          from: {
            opacity: 0,
            transform: 'translate3d(0, -16px, 0)'
          },
          '60%': {
            opacity: 1
          },
          to: {
            transform: 'none'
          }
        },
        'toast-open': {
          from: {
            opacity: 0,
            transform: 'translateX(3000px)'
          },
          '60%': {
            opacity: 1,
            transform: 'translateX(-25px)'
          },
          '75%': {
            transform: 'translateX(10px)'
          },
          '90%': {
            transform: 'translateX(-5px)'
          },
          to: {
            transform: 'none'
          }
        }
      },
      animation: {
        ripple: 'ripple 0.6s linear',
        progress: 'progress 2s linear infinite',
        'fade-up': 'fade-up 0.2s linear',
        'toast-open': 'toast-open 0.6s linear'
      }
    }
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('tailwindcss-animate')
  ]
}
