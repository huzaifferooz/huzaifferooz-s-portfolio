import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05060b",
        neon: {
          violet: "#8b5cff",
          cyan: "#22e1ff",
          pink: "#ff3d9a",
          amber: "#ffb020",
        },
      },
      fontFamily: {
        display: ["Unbounded", "system-ui", "sans-serif"],
        sans: ["Figtree", "system-ui", "sans-serif"],
      },
      keyframes: {
        glow: {
          "0%,100%": {
            boxShadow:
              "0 0 24px -4px rgba(139,92,255,.7), 0 0 60px -12px rgba(34,225,255,.5)",
          },
          "50%": {
            boxShadow:
              "0 0 36px 0 rgba(139,92,255,.95), 0 0 90px -8px rgba(34,225,255,.7)",
          },
        },
        blink: { "50%": { opacity: "0" } },
      },
      animation: {
        glow: "glow 3.2s ease-in-out infinite",
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
