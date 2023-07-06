const baseConfig = require('../../packages/tailwindcss/tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  theme: {
    extend: {
      keyframes: {
        playing: {
          '0%': {
            backgroundColor: 'rgba(30,215,96,.4)',
            transform: 'scale(.8)'
          },
          '80%': {
            backgroundColor: 'rgba(30,215,96,0)',
            transform: 'scale(2.2)',
            filter: 'blur(0.4px)'
          },
          '100%': {
            backgroundColor: 'rgba(30,215,96,0)',
            transform: 'scale(2.5)'
          }
        },
        'note-1': {
          '0%': {
            transform: 'translate(0) rotate(-30deg)'
          },
          '50%': {
            opacity: 1
          },
          '80%': {
            opacity: 0,
            filter: 'blur(2px)'
          },
          '100%': {
            opacity: 0,
            transform: 'translate(-3px, -55px) rotate(10deg)'
          }
        },
        'note-2': {
          '0%': {
            transform: 'translate(0) rotate(-30deg)'
          },
          '50%': {
            opacity: 1
          },
          '80%': {
            opacity: 0,
            filter: 'blur(2px)'
          },
          '100%': {
            opacity: 0,
            transform: 'translate(55px, -5px) rotate(0deg)'
          }
        },
        'note-3': {
          '0%': {
            transform: 'translate(0) rotate(20deg)'
          },
          '50%': {
            opacity: 1
          },
          '80%': {
            opacity: 0,
            filter: 'blur(1px)'
          },
          '100%': {
            opacity: 0,
            transform: 'translate(-55px, -15px) rotate(0deg)'
          }
        }
      },
      animation: {
        playing: 'playing 3.4s infinite',
        'note-1': 'note-1 2.35s infinite',
        'note-2': 'note-2 2.35s infinite',
        'note-3': 'note-3 2.35s infinite'
      }
    }
  }
}
