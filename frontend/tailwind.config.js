/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-blue', 'bg-purple', 'bg-red',
    'text-blue', 'text-purple', 'text-red',
    'from-blue', 'from-purple', 'from-red',
    'via-blue', 'via-purple', 'via-red',
    'to-blue', 'to-purple', 'to-red',
    'animate-float-1', 'animate-float-2', 'animate-float-3',
    'animate-dot-pulse-1', 'animate-dot-pulse-2', 'animate-dot-pulse-3',
    'animate-gradient-shift'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
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
        'dot-pulse-1': 'dot-pulse-1 1.5s infinite',
        'dot-pulse-2': 'dot-pulse-2 1.5s infinite 0.3s',
        'dot-pulse-3': 'dot-pulse-3 1.5s infinite 0.6s',
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
        'dot-pulse-1': {
          '0%, 100%': { opacity: '0' },
          '40%': { opacity: '1' },
          '80%': { opacity: '0' },
        },
        'dot-pulse-2': {
          '0%, 100%': { opacity: '0' },
          '40%': { opacity: '0' },
          '80%': { opacity: '1' },
        },
        'dot-pulse-3': {
          '0%, 100%': { opacity: '0' },
          '40%': { opacity: '0' },
          '80%': { opacity: '0' },
          '100%': { opacity: '1' },
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
