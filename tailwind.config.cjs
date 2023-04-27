/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
