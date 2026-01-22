/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FF6F61",
        secondary: "#4A90E2",
        accent: "#50E3C2",
        light: {
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
        },
        dark: {
          100: "#1a202c",
          200: "#2d3748",
          300: "#4a5568",
          400: "#718096",
          500: "#a0aec0",
        },
      },
    },
  },
  plugins: [],
};
