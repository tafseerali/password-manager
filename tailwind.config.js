/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'eighty': '880px',             // ≥880px
        'max-eighty': { max: '879px' }, // <880px
        'six': '600px',
        'max-six': {max: '600px'}
      }
    },
  },
  plugins: [],
}