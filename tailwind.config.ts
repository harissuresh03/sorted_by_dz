import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B132B',
        teal: '#0F766E',
        mint: '#2DD4BF',
        paper: '#FAFAF7',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        serif: ['Iowan Old Style', 'Baskerville', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
