/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // Keep in sync with src/theme.js, which serves the same palette to
      // libraries that take a colour prop rather than a class name.
      colors: {
        primary: "#198068",
        accent: "#802819",
        success: "#32CD32",
        danger: "#FF4500",
        surface: "#f5f5f5",
      },
    },
  },
  plugins: [require("daisyui")],
};
