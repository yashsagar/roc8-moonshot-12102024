/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      xs: "430px",
      sm: "640px",
      md: "768px",
      lg: "900px",
      xl: "1280px",
    },
    extend: {},
  },
  plugins: [],
};
