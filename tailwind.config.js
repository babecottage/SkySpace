/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      pageBackground: "var(--pageBackground)",
      background: "var(--background)",
      text: "var(--text)",
      border: "var(--border)",
    },
    extend: {},
  },
  plugins: [],
};
