/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop1700: '1700px',
      // => @media (min-width: 1700px) { ... }

      desktop1600: '1600px',
      // => @media (min-width: 1600px) { ... }
    },
    extend: {
      colors: {
        'primary-color-salgu': '#FDD7C0',
        'primary-color-orange': '#F45A00',
        'primary-color-red': '#AF4100',
        'secondary-color-salgu': '#FCDEC0',
        'secondary-color-light': '#F3EAE1',
        'kakao-color': '#FFB800',
        'error-color-red': '#E73F3F',
      },
    },
  },
  plugins: [],
};
