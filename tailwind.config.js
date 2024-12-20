/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/views/**/*.{html,js,ejs}"],
  theme: {
    fontFamily: {
      display: ["Lora", "monospace"],
      sans: ["Roboto", "sans-serif"],
    },
    fontSize: {
      xs: "0.64rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.25rem",
      xl: "1.563rem",
      "2xl": "1.953rem",
      "3xl": "2.441rem",
      "4xl": "3.052rem",
      "5xl": "3.815rem",
    },
    fontWeight: {
      thin: "300",
      normal: "500",
      bold: "700",
    },
    spacing: {
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      0.5: "4px",
      1: "8px",
      2: "12px",
      3: "16px",
      4: "24px",
      5: "32px",
      6: "40px",
      7: "48px",
      8: "56px",
    },
    colors: {
      white: "#eae6e3",
      gray: {
        200: "#a2a7b4",
        400: "#5b5a5c",
      },
      black: "#25211e",
      pink: "#d1a99a",
      errorBg: "#f7d7da",
      errorText: "#ff4f5f",
    },
    extend: {},
  },
  plugins: [],
};
