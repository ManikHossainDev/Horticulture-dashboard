/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#42B244",
        secondary: "#a5062e",
        primaryBg: "#EBF6FE",
        hoverText: "#dcbb87",
      },
      animation: {
        "spin-reverse": "spin 1s linear reverse infinite",
      },
    },
  },
  plugins: [],
}