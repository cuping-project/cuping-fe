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
        primaryColor: '#f56f20',
      },
    },
  },
  plugins: [],
};
