/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        border: "var(--glass-border)",
        primary: {
          DEFAULT: "var(--text-primary)",
          foreground: "var(--bg-primary)"
        },
        accent: {
          DEFAULT: "var(--glass-bg)",
          foreground: "var(--accent-color)"
        }
      },
    },
  },
  plugins: [],
}
