/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        blue: '#3498db',
        purple: '#9b59b6',
        red: '#e74c3c',
        dark: '#1a1a2e',
        light: '#f7f7f7',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float-1': 'float-1 15s ease-in-out infinite',
        'float-2': 'float-2 15s ease-in-out infinite',
        'float-3': 'float-3 15s ease-in-out infinite',
        'blink': 'blink 1s infinite',
        'dot-pulse-1': 'dotPulse 1.5s infinite',
        'dot-pulse-2': 'dotPulse 1.5s infinite 0.3s',
        'dot-pulse-3': 'dotPulse 1.5s infinite 0.6s',
      },
      keyframes: {
        'gradient-shift': {
          '0%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
          '100%': { backgroundPosition: '0% center' },
        },
        'float-1': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(50px, 50px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'float-2': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-50px, -30px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'float-3': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -50px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'dotPulse': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(90deg, #3498db, #9b59b6, #e74c3c)',
        'gradient-button': 'linear-gradient(90deg, #3498db, #9b59b6, #e74c3c)',
      },
      opacity: {
        '15': '0.15',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}