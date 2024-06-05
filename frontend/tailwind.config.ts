import type { Config } from "tailwindcss";
const { addDynamicIconSelectors } = require("@iconify/tailwind");

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  variants: {
    extend: {
      backgroundSize: ["group-hover"],
    },
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        baskerville: ["var(--font-libre-baskerville)"],
        baskervilleItalic: ["var(--font-libre-baskerville-italic)"],
        alatsi: ["var(--font-alatsi)"],
        grotesk: ["var(--font-grotesk)"],
      },
      screens: {
        "1.5xl": "1350px",
        devOnlyDeleteAfterDone: "320px",
      },
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
        "accordion-down": "accordion-down 300ms ease-out forwards",
        "accordion-up": "accordion-up 300ms ease-out forwards",
      },
      colors: {
        oliveGreen: "#1e1111", //"#282917",
        rustyBrown: "#ac3d3d", //"#ac4f3d",
        terracottaOrange: "#bc3434", //"#BC5A34",
        winterHazel: "#db9494", //"#DBCA94",
        eggshell: "#efdbdb", //"#efe9db",
        metalicCopper: "#782222", //"#783022",
        dawn: "#e0ded7",
      },
      boxShadow: {
        "3xl": "0 35px 80px -7px rgba(0, 0, 0, .3)",
      },
      fontWeight: {
        gigabold: "800",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addDynamicIconSelectors()],
} satisfies Config;

export default config;
