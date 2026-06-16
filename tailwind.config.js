/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#0e1116',
        panel: '#161b22',
        edge: '#2a313c',
        mist: '#8b95a5',
        cloud: '#e6e9ef',
        signal: '#7c5cff',
        signaldim: '#5a45b8',
        warn: '#ff8a4c',
        ok: '#3fd68c'
      }
    }
  },
  plugins: []
}
