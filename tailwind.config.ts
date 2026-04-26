import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0A1931",
          800: "#1A1A2E",
          700: "#1B3A6B",
          500: "#2E5FA3",
        },
        gold: {
          900: "#C9A84C",
          500: "#E2B96F",
          300: "#F5D48B",
        },
        background: "#F8F7F4",
      },
      fontFamily: {
        serif: ["var(--font-playfair)"],
        sans: ["var(--font-inter)"],
        urdu: ["var(--font-urdu)"],
      },
    },
  },
  plugins: [],
};
export default config;
