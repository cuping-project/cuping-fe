/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: '320px',
      // => @media (min-width: 320px) { ... }

      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      d1024: '1024px',
      // => @media (min-width: 1024px) { ... }

      d1440: '1440px',
      // => @media (min-width: 1440px) { ... }

      d1920: '1920px',
      // => @media (min-width: 1920px) { ... }
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
