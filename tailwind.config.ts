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
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'marquee': 'marquee 10s linear infinite',
        'slideUp': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(10%)' },
          '50%': { transform: 'translateX(-25%)' },
          '100%': { transform: 'translateX(10%)' },
        },
      },
    },
  },
  plugins: [heroui()],

} satisfies Config;
