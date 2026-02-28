import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0f7ef",
          100: "#d9ebd6",
          200: "#b3d7ad",
          300: "#8cc384",
          400: "#5fa654",
          500: "#3a7d34",
          600: "#2d5a27",
          700: "#244a20",
          800: "#1c3a19",
          900: "#142a12",
        },
        gold: {
          50: "#fdf9ef",
          100: "#f9f0d4",
          200: "#f2dfa5",
          300: "#e8c96d",
          400: "#d4ae4e",
          500: "#c8a951",
          600: "#a68835",
          700: "#83692a",
          800: "#6b5525",
          900: "#594721",
        },
        dark: {
          50: "#f5f5f5",
          100: "#e0e0e0",
          200: "#b3b3b3",
          300: "#808080",
          400: "#4d4d4d",
          500: "#333333",
          600: "#2a2a2a",
          700: "#222222",
          800: "#1a1a1a",
          900: "#111111",
          950: "#0a0a0a",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      textShadow: {
        overlay: "0 2px 8px rgba(0,0,0,0.7)",
        "overlay-strong": "0 2px 12px rgba(0,0,0,0.9)",
      },
    },
  },
  plugins: [],
};

export default config;
