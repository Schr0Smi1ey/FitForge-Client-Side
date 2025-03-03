/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#387478",
        // primary: "#66785F",
        // primary: "#3D8D7A",
        primary: "#198068",
      },
    },
  },
  plugins: [require("daisyui")],
};
