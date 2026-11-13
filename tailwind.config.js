/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: '#090a0f',
          deep: '#06070a',
          card: '#111625',
          cardHover: '#161e33',
          cardSubtle: '#0d121f',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(59, 130, 246, 0.4)',
          blue: '#3b82f6',
          blueHover: '#2563eb',
          cyan: '#38bdf8',
          teal: '#10b981',
          gold: '#f59e0b',
        },
        brand: {
          navy: '#0f172a',
          deep: '#0a1120',
          primary: '#2563eb',
          primaryHover: '#1d4ed8',
          accent: '#10b981',
          accentHover: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'luxury-glow': '0 0 35px -5px rgba(59, 130, 246, 0.25)',
      }
    },
  },
  plugins: [],
}
