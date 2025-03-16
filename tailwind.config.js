// tailwind.config.js
module.exports = {
    darkMode: 'class', // Enable class-based dark mode
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
          colors: {
            primary: '#3490dc',  // Custom primary color
            secondary: '#ffed4a', // Custom secondary color
            darkBackground: '#171717', // Custom dark background color
            lightBackground: '#ffffff', // Custom light background color
            darkText: '#f0f0f0', // Custom dark text color
            lightText: '#1a202c', // Custom light text color
          },
        },
      },
    plugins: [],
  };
  