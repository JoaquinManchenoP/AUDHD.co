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
        primary: "#fcc029",
        charcoal: "#36454F",
      },
      keyframes: {
        "fade-slide-in": {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        wave: {
          "0%, 100%": {
            transform: "translateX(0%) rotate(-1deg)",
          },
          "50%": {
            transform: "translateX(-2%) rotate(-2deg)",
          },
        },
      },
      animation: {
        "fade-slide-in": "fade-slide-in 0.6s ease-out forwards",
        "gradient-x": "gradient-x 4s ease-in-out infinite",
        wave: "wave 2s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#36454F",
            a: {
              color: "#fcc029",
              "&:hover": {
                color: "#36454F",
              },
            },
            h1: {
              color: "#36454F",
              fontFamily: "DM Sans, sans-serif",
            },
            h2: {
              color: "#36454F",
              fontFamily: "DM Sans, sans-serif",
            },
            h3: {
              color: "#36454F",
              fontFamily: "DM Sans, sans-serif",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
