module.exports = {
    content: ["./app/**/*.{ts,tsx,jsx,js}"],
    theme: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      extend: {
        backgroundImage: theme => ({
          'hero-pattern': "url('/hero-pattern.svg')",
         }),
         height: {
          '256': '44rem',
        },
        width: {
          '256': '44rem',
        },
      },
    },
    variants: {},
    plugins: [require('tailwindcss-neumorphism')],
  };