import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1A6AE3",
        secondary: "#B14EFF",
        secondaryHover: "#9711FF",
        accent: "#E39629",
        darkNeutral: "#071A2B",
        lightNeutral: "#F0F7FF",
        accentLow: "#E7EBFD",
        subTextLight: "#BDCEF4",

        // primary: "hsl(215,84,62)",
        // secondary: "hsl(270,80,71)",
        // secondaryHover: "hsl(270,80,55)",
        // accent: "hsl(29,84,61)",
        // darkNeutral: "hsl(212,80,8)",
        // lightNeutral: "hsl(218,80,98)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        bebasNeue: ["var(--font-bebas_neue)", "sans-serif"],
        eras_itc_demi: ["eras-itc-demi", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
