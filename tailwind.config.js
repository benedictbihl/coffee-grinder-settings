module.exports = {
  theme: {
    extend: {
      keyframes: {
        bounceInBefore: {
          '0%': {
              opacity: 0,
              transform: 'scale(0.3) translate(-50%, -50%) rotate(45deg)',
          },
          '50%': {
              opacity: 0.9,
              transform: 'scale(1.1) translate(-50%, -50%) rotate(45deg)',
          },
          '80%': {
              opacity: 1,
              transform: 'scale(0.89) translate(-50%, -50%) rotate(45deg)',
          },
          '100%': {
              opacity: 1,
              transform: 'scale(1) translate(-50%, -50%) rotate(45deg)',
          }
        },
        bounceInAfter: {
          '0%': {
              opacity: 0,
              transform: 'scale(0.3) translate(-50%, -50%) rotate(-45deg)',
          },
          '50%': {
              opacity: 0.9,
              transform: 'scale(1.1) translate(-50%, -50%) rotate(-45deg)',
          },
          '80%': {
              opacity: 1,
              transform: 'scale(0.89) translate(-50%, -50%) rotate(-45deg)',
          },
          '100%': {
              opacity: 1,
              transform: 'scale(1) translate(-50%, -50%) rotate(-45deg)',
          }
        },
        bounceInBeforeRev: {
          '0%': {
            opacity: 1,
            transform: 'scale(1) translate(-50%, -50%) rotate(45deg)',
          },
          '100%': {
            opacity: 0,
            transform: 'scale(0.3) translate(-50%, -50%) rotate(45deg)',
          }
        },
        bounceInAfterRev: {
          '0%': {
            opacity: 1,
            transform: 'scale(1) translate(-50%, -50%) rotate(-45deg)',
          },
          '100%': {
            opacity: 0,
            transform: 'scale(0.3) translate(-50%, -50%) rotate(-45deg)',
          }
        }
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Filenames to scan for classes
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.ts',
      './src/**/*.tsx',
      './public/index.html',
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      // safelist: [],
    },
  },
}
