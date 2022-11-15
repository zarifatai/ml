/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.pug'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['serif', 'Times New Roman']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
