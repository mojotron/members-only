/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.ejs'],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
      display: ['Archivo Black', 'serif'],
      typewriter: ['Special Elite', 'monospace'],
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
    },
    colors: {
      gray: {
        100: '#f5f5f4',
        300: '#d6d3d1',
        400: '#a8a29e',
        600: '#57534e',
        800: '#27272a',
        900: '#2d2321',
      },
      red: {
        500: '#f43f5e',
      },
      green: {
        300: '#86efac',
        500: '#22c55e',
      },
      paper: {
        400: '#e4ddd7',
      },
    },
    extend: {},
  },
  plugins: [],
};
