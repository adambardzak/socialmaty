import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#ffffff",
        surface: "#f7faf7",
        ink: "#0a0a0a",
        muted: "#6b7280",
        line: "#e5e7eb",
        accent: {
          DEFAULT: "#00d141",
          50: "#e6fbed",
          100: "#c2f5d2",
          200: "#8aebab",
          300: "#4ce17e",
          400: "#1cd757",
          500: "#00d141",
          600: "#00b338",
          700: "#00922e",
          800: "#007225",
          900: "#005a1d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        none: "0",
        full: "9999px",
      },
      maxWidth: {
        page: "1100px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [typography],
};

export default config;
