import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        DEFAULT: "16px",
        lg: "24px",
        xl: "32px",
      },
      colors: {
        glass: {
          white: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.12)",
          highlight: "rgba(255,255,255,0.18)",
        },
      },
    },
  },
};

export default config;
