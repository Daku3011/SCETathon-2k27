/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--ink-rgb) / <alpha-value>)",
          2: "rgb(var(--surface-rgb) / <alpha-value>)",
        },
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        surface2: "rgb(var(--surface-2, 36 39 31) / <alpha-value>)",
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        lime: {
          DEFAULT: "rgb(var(--lime-rgb) / <alpha-value>)",
          hover: "rgb(var(--lime-rgb) / <alpha-value>)",
        },
        coral: {
          DEFAULT: "rgb(var(--coral-rgb) / <alpha-value>)",
        },
        orange: "rgb(var(--coral-rgb) / <alpha-value>)",
        lilac: "rgb(var(--lilac-rgb) / <alpha-value>)",
        signal: "rgb(var(--lime-rgb) / <alpha-value>)",
        accent: "rgb(var(--lime-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-d)", "Impact", "sans-serif"],
        body: ["var(--font-b)", "Arial", "sans-serif"],
        mono: ["var(--font-m)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.09em",
      },
    },
  },
  plugins: [],
};
