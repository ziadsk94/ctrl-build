/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'syne': ['Syne', 'sans-serif'],
        'fraunces': ['Fraunces', 'serif'],
      },
      colors: {
        'cream': '#fcfaf7',
        'black': '#020202',
        'pink': '#fac6db',
        'green': '#3c8669',
      },
      animation: {
        'pinwheel': 'pinwheel 0.2s ease-in-out',
        'slide-in': 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'expand': 'expand 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        pinwheel: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(90deg)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        expand: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
