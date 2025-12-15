/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FACC15', // Yellow
        dark: '#1F2937',    // Gray-900 like
        light: '#F3F4F6',   // Gray-100 like
      }
    },
  },
  plugins: [],
}

