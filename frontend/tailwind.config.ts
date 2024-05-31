import type { Config } from "tailwindcss";
const { addDynamicIconSelectors } = require("@iconify/tailwind");

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        oliveGreen: "#282917",
        rustyBrown: "#ac4f3d",
        terracottaOrange: "#cb6942",
        winterHazel: "#DBCA94",
        eggshell: "#efe9db",
        metalicCopper: "#783022",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addDynamicIconSelectors()],
} satisfies Config;

export default config;
