/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#111210",
          2: "#232422",
        },
        signal: "#D8FF50",
        lime: {
          DEFAULT: "#D8FF50",
          hover: "#f0ffad",
        },
        coral: {
          DEFAULT: "#FF7358",
        },
        orange: {
          DEFAULT: "#FF7358",
        },
        lilac: {
          DEFAULT: "#C9C5FD",
        },
        paper: {
          DEFAULT: "#F2F0E8",
        },
        muted: {
          DEFAULT: "#93958E",
        },
        accent: "#D8FF50",
      },
      fontFamily: {
        display: ["var(--font-d)", "Archivo Black", "Arial Black", "Impact", "sans-serif"],
        body: ["var(--font-b)", "DM Sans", "Arial", "sans-serif"],
        mono: ["var(--font-m)", "Space Mono", "monospace"],
      },
    },
  },
};
