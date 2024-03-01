/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   // Define your light and dark mode color palettes here
      //   light: {
      //     primary: "#f0f0f0",
      //     secondary: "#ff0000",
      //     // ... other light mode colors
      //   },
      //   dark: {
      //     primary: "#121212",
      //     secondary: "#ff8080",
      //     // ... other dark mode colors
      //   },
      // },
    },
  },
  plugins: [],
};
