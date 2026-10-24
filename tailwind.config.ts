import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F2942",
          navy: "#132E4F",
          accent: "#2563EB",
          accentHover: "#1D4ED8",
          subtle: "#EFF6FF",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
