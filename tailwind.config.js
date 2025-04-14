// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        darkBackground: '#171717',
        lightBackground: '#ffffff',
        darkText: '#f0f0f0',
        lightText: '#1a202c',
        defaultColorCode: '#e8f9fd'
      },
    },
  },
  plugins: [],
};
