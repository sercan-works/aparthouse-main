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
      },
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
        
      },
    },
  },
  plugins: [heroui()],

} satisfies Config;
