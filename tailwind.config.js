/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.ejs'],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
      display: ['Archivo Black', 'serif'],
    },
    colors: {
      gray: {
        100: '#f5f5f4',
        300: '#d6d3d1',
        400: '#a8a29e',
        600: '#57534e',
        800: '#27272a',
      },
      red: {
        500: '#f43f5e',
      },
      green: {
        300: '#86efac',
        500: '#22c55e',
      },
    },
    extend: {},
  },
  plugins: [],
};
