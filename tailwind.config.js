/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0a0b0d',
        surface: '#101217',
        'surface-2': '#181b22',
        'surface-3': '#1f2330',
        border: {
          DEFAULT: '#1e2230',
          soft: '#161921',
          strong: '#2b3142',
        },
        ink: {
          DEFAULT: '#e8eaed',
          dim: '#8b8f98',
          faint: '#54585f',
        },
        phosphor: {
          DEFAULT: '#9fef00',
          dim: '#7ac800',
          glow: '#b8ff2e',
        },
        amber: {
          DEFAULT: '#ffb547',
          dim: '#cc8a2a',
        },
        signal: '#ff4d4d',
        wapp: '#25d366',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 7vw, 5.25rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.5rem, 2.8vw, 2.25rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
      },
      letterSpacing: {
        micro: '0.18em',
        mid: '0.08em',
      },
      animation: {
        'blink': 'blink 1.1s steps(2, end) infinite',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'flow': 'flow 3s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(159, 239, 0, 0.6)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 0 6px rgba(159, 239, 0, 0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flow: {
          '0%, 100%': { opacity: '0.2', transform: 'translateX(0)' },
          '50%': { opacity: '1', transform: 'translateX(6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'grid-lines': 'linear-gradient(to right, rgba(226,229,235,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,229,235,0.035) 1px, transparent 1px)',
        'grid-lines-strong': 'linear-gradient(to right, rgba(226,229,235,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,229,235,0.07) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
