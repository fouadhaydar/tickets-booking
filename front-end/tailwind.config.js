/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // extend: {
    //   backgroundColor: {
    //     color: this.darkMode ? "#000" : "#fff",
    //   },
    //   textColor: {
    //     color: this.darkMode ? "#fff" : "#000",
    //   },
    // },
  },
  plugins: [],
};
