/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEEDFE",
          100: "#D9D6F2",
          200: "#CECBF6",
          300: "#AFA9EC",
          400: "#7F77DD",
          500: "#534AB7",
          600: "#453D9C",
          700: "#3C3489",
          800: "#26215C",
          900: "#1B1338",
        },
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};