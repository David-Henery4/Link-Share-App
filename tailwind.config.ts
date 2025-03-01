import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      smMob: "26.25em",
      lgMob: "29.6875em",
      smallTablet: "36.25em",
      mediumTablet: "42.1875em",
      tablet: "46.25em",
      laptop: "66.25em",
      lgLaptop: "78.75em",
    },
    fontFamily: {
      instrumentSans: ["var(--font-instrument-sans)", "sans-serif"],
    },
    gridTemplateColumns: {
      formColumns: "140px 1fr",
    },
    gridTemplateRows: {
      mobilePreviewRows: "min-content auto",
    },
    colors: {
      purple: "#633CFF",
      purpleLight: "#EFEBFF",
      purpleHover: "#BEADFF",
      darkGrey: "#333333",
      grey: "#737373",
      lightGrey: "#FAFAFA",
      offGrey: "#EEEEEE",
      border: "#D9D9D9",
      white: "#ffffff",
      black: "#000000",
      red: "#FF3939",
    },
    extend: {
      maxWidth: {
        maxBodyWidth: "1440px",
      },
      boxShadow: {
        basicPurple: "0 0 32px 0 rgb(99 60 255 / 0.25)",
        card: "0 0 32px 0 rgb(0 0 0 / 0.10)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
