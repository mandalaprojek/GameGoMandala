/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#0F1016',
          bg2: '#131520',
          card: '#161928',
          cardElevated: '#1D2237',
          border: '#232A44',
          blue: '#00D2FF',
          blueNeon: '#00F0FF',
          psBlue: '#0070D1',
          magenta: '#D900FF',
          magentaDark: '#B300D4',
          green: '#22C55E',
          yellow: '#FACC15',
          amber: '#F59E0B',
          red: '#EF4444',
        }
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(0, 210, 255, 0.35)',
        'neon-blue-intense': '0 0 25px rgba(0, 210, 255, 0.65), 0 0 5px rgba(0, 210, 255, 0.9)',
        'neon-magenta': '0 0 18px rgba(217, 0, 255, 0.55)',
        'neon-green': '0 0 15px rgba(34, 197, 94, 0.6)',
        'neon-yellow': '0 0 15px rgba(250, 204, 21, 0.45)',
        'glow-card': '0 4px 20px -2px rgba(0, 210, 255, 0.25)',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        display: ['Rajdhani', 'Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 10px rgba(0, 210, 255, 0.3)' },
          '100%': { boxShadow: '0 0 22px rgba(0, 210, 255, 0.65)' },
        }
      }
    },
  },
  plugins: [],
}
