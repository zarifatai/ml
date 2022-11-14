/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.pug'],
  theme: {
    extend: {
      fontFamily: {
        typewriter: ['Typewriter', 'Consolas']
      },
      colors: {
        'telegram-yellow': '#ffd88a'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
