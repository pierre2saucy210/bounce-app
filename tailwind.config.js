/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#08050F",
        surface: "#130D24",
        surface2: "#1C1535",
        primary: "#FF1E6C",
        accentPurple: "#9B3FFF",
        accentCyan: "#00F5D4",
        accentYellow: "#FFE500",
        accentOrange: "#FF6B00",
        text: "#FFFFFF",
        textMuted: "#8B7AAE",
        gold: "#C9A84C",
      },
    },
  },
  plugins: [],
};