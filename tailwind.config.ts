import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Apple's own stack — resolves to SF Pro on Apple devices, graceful elsewhere.
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        // Apple's neutrals
        ink: {
          DEFAULT: '#1d1d1f',
          soft: '#6e6e73',
          faint: '#86868b',
        },
        surface: {
          DEFAULT: '#ffffff',
          gray: '#f5f5f7',
          subtle: '#fbfbfd',
        },
        accent: {
          50: '#e8f2fd',
          100: '#d1e5fb',
          200: '#a3ccf7',
          300: '#6bb0f2',
          400: '#2f92ec',
          500: '#0071e3',
          600: '#0077ed',
          700: '#0059b3',
          800: '#004085',
          900: '#002a58',
        },
      },
      letterSpacing: {
        tightest: '-0.025em',
        apple: '-0.015em',
      },
      borderRadius: {
        apple: '18px',
        card: '12px',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
      },
      maxWidth: {
        shell: '1024px',
      },
    },
  },
  plugins: [typography],
} satisfies Config
