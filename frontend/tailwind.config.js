/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22331D",
          dark: "#22331D",
          light: "#6A6D69",
        },
        secondary: "#F65A11",
        background: "#EFEDE7",
      },
      fontFamily: {
        body: ["Switzer"],
        heading: ["SwitzerExtraBold"],
        subHeading: ["SwitzerBold"],
        subHeading2: ["SwitzerNormal"],
      },
    },
  },
  plugins: [],
};
