/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.ejs'],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
      display: ['Signika', 'serif'],
    },
    colors: {
      gray: {
        100: '#f5f5f4',
        400: '#a8a29e',
        600: '#57534e',
        800: '#27272a',
      },
      red: {
        500: '#f43f5e',
      },
      green: {
        500: '#22c55e',
      },
    },
    extend: {},
  },
  plugins: [],
};
