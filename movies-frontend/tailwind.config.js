export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'mine-shaft-950': '#212121',
        'shark-950':'#2a2a2a'
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}