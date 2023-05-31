/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
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
