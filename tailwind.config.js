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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif']
      },
      colors: {
        ink: '#0A0D10',
        panel: '#11151A',
        panel2: '#171C22',
        edge: '#242B33',
        mist: '#7A8099',
        cloud: '#E8EAF0',
        signal: '#5DCAA5',
        signaldim: '#1D9E75',
        signaldeep: '#0F6E56',
        warn: '#FF8A4C',
        ok: '#5DCAA5'
      }
    }
  },
  plugins: []
}
