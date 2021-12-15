const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {screens: {
    sm: '480px',
    md: '768px',
    lg: '976px',
    xl: '1440px',
  },
  colors: {
    primary: colors.emerald,
    secondary: colors.blue,
    gray:colors.coolGray,
    white:	"#FFFFFF",
    transparent:"rgba(255,255,255,0)"
  },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
