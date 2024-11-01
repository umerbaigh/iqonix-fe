/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8b572a",
        secondary: "#242424",
        third: "#333333",
        green1: "#0A4035",
        gray1: "#908AA0",
        black1: "#101010",
        bgColor: "#C2F1B2",
        borderColor: "#e5e5e5",
      },
      screens: {
        sm: "600px",
        md: "900px",
        xs: "400px",
        lg: "1024px",
        xl: "1150px",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        lato: ["var(--font-lato)"],
      },
      backgroundImage: {
        // banner: "url('/assets/banner.webp')",
      },
    },
  },
  plugins: [],
});
