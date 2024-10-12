/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this is set to the correct path
  ],
  theme: {
    extend: {
      colors: {
        golden: '#FFD700', // Custom golden color
        black: '#000000',   // Standard black color
      },
    },
  },
  plugins: [],
}
