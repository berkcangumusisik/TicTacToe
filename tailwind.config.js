/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        game: {
          primary: 'rgb(var(--game-primary) / <alpha-value>)',
          secondary: 'rgb(var(--game-secondary) / <alpha-value>)',
          accent: 'rgb(var(--game-accent) / <alpha-value>)',
          light: 'rgb(var(--game-light) / <alpha-value>)',
          dark: 'rgb(var(--game-dark) / <alpha-value>)',
        },
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        glow: 'glow 1s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        glow: {
          '0%': { filter: 'brightness(100%)' },
          '100%': { filter: 'brightness(150%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'cyberpunk',
      'dracula',
      'synthwave',
      'valentine',
      'garden',
      'aqua',
      'luxury',
      'emerald',
      'night',
    ],
  },
};
