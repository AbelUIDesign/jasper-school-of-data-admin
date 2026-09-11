/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          crimson: "#A70727",
          "crimson-hover": "#8E0621",
          "crimson-dark": "#700419",
          "crimson-light": "#FFF1F3",
          "crimson-border": "#FBCED6",
          gold: "#FEC00E",
          "gold-dark": "#D49C03",
          "gold-light": "#FFFBEB",
          bg: "#FAF8F5",
          surface: "#FFFFFF",
          "surface-muted": "#F5F3EF",
          text: "#1C1917",
          "text-secondary": "#57534E",
          muted: "#78716C",
          subtle: "#A8A29E",
          border: "#E7E5E4",
          "border-subtle": "#F0EEE9",
          sidebar: "#111111",
          "sidebar-hover": "#1C1C1C",
          "sidebar-border": "#222222",
        },
      },
      fontFamily: {
        heading: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        sans: ["var(--font-dmsans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        ctrl: "10px",
        card: "16px",
        media: "20px",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(28, 25, 23, 0.05), 0 1px 2px -1px rgba(28, 25, 23, 0.04), 0 2px 4px rgba(28, 25, 23, 0.02)",
        "card-hover": "0 0 0 1px rgba(28, 25, 23, 0.08), 0 4px 12px -2px rgba(28, 25, 23, 0.06), 0 2px 4px rgba(28, 25, 23, 0.03)",
        dropdown: "0 0 0 1px rgba(28, 25, 23, 0.08), 0 12px 28px -4px rgba(28, 25, 23, 0.12), 0 4px 8px -2px rgba(28, 25, 23, 0.06)",
        modal: "0 0 0 1px rgba(28, 25, 23, 0.1), 0 20px 40px -8px rgba(28, 25, 23, 0.2), 0 8px 16px -4px rgba(28, 25, 23, 0.08)",
      },
      transitionTimingFunction: {
        craft: "cubic-bezier(0.2, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
