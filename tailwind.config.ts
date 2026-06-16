/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDeep: '#080C1A',
        bgDark: '#0D1228',
        primary: {
          DEFAULT: '#6C63FF',
          dark: '#4B44CC',
          light: '#A89CFF',
        },
        accent: '#00D4AA',
        accent2: '#FF6B6B',
        accent3: '#FFB347',
        textMuted: '#8891B4',
        textDim: '#4A5180',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}