/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
     colors: {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',       // ✅ added
    500: '#059669',
    600: '#047857',
    700: '#065f46',
    800: '#064e3b',       // ✅ added
  },
  secondary: {
    50: '#f0f9ff',
    100: '#dbeafe',       // ✅ optional (for consistency)
    500: '#0284c7',
    600: '#0369a1',
    700: '#0c4a6e',
    800: '#1e3a8a',       // ✅ optional
  },
  accent: {
    500: '#f97316',
    600: '#ea580c',
  }
},

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}