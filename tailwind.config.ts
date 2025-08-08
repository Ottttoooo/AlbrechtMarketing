import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        gradient: "gradient 4s linear infinite",
        cloudFloat: "cloudFloat 180s linear infinite",
        waterBackFloat: "waterBackFloat 30s linear infinite",
        waterMidFloat: "waterMidFloat 15s linear infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        cloudFloat: {
          "0%": { "background-position-x": "0%" },
          "100%": { "background-position-x": "100%" },
        },
        waterBackFloat: {
          "0%": { "background-position": "0% 70%" },
          "25%": { "background-position": "5% 75%" },
          "50%": { "background-position": "0% 80%" },
          "75%": { "background-position": "5% 75%" },
          "100%": { "background-position": "0% 70%" },
        },
        waterMidFloat: {
          "0%": { "background-position": "0% 100%" },
          "25%": { "background-position": "5% 90%" },
          "50%": { "background-position": "0% 95%" },
          "75%": { "background-position": "5% 90%" },
          "100%": { "background-position": "0% 100%" },
        },
      },
      backgroundSize: {
        "300%": "500%",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4D91EF",
          foreground: "hsl(var(--primary-foreground))",
        },
        primaryHover: "#3B6FC2",
        secondary: {
          DEFAULT: "#046865",
          foreground: "hsl(var(--secondary-foreground))",
        },
        secondaryHover: "#9711FF",
        accent: {
          DEFAULT: "#F55D3E",
          foreground: "hsl(var(--accent-foreground))",
        },
        accentHover: "#D85039",
        darkNeutral: "#071A2B",
        lightNeutral: "#F0F7FF",
        accentLow: "#E7EBFD",
        subTextLight: "#BDCEF4",
        cardbg: "#FAFCFF",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        bebasNeue: ["var(--font-bebas_neue)", "sans-serif"],
        eras_itc_demi: ["eras-itc-demi", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
