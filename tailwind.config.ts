import type { Config } from "tailwindcss";
import {heroui} from "@heroui/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        colorFirst: "#C091D4",
        colorSecond: "#7366FF",
        colorThird: "#FE6CAC",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#C091D4",
        secondary: "#7366FF",
      },
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
        
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [heroui()],

} satisfies Config;
