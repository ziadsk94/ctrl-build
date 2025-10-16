/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#F9F9F7',
        charcoal: '#1E1E1E',
        stone: '#A1A1A5',
        'studio-green': '#3A4B40',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        tiempos: ['TiemposHeadline', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        'architectural': '0.05em',
        'blueprint': '0.1em',
      },
      animation: {
        'rotate-plus': 'rotatePlus 300ms ease-in-out',
        'underline-draw': 'underlineDraw 250ms ease-out',
      },
      scale: {
        '98': '0.98',
        '102': '1.02',
      },
      keyframes: {
        rotatePlus: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(45deg)' },
        },
        underlineDraw: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
