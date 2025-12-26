/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'peel-orange': '#E67E50',
        'peel-brown': '#8B4513',
        'peel-sage': '#9CAF88',
        'peel-bg': '#FAFAF8',
        'peel-text': '#2D2D2D',
      },
      fontFamily: {
        'sans': ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
