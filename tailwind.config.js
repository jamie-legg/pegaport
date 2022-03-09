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
          '128': '32rem',
        }
      },
    },
    variants: {},
    plugins: [require('tailwindcss-neumorphism')],
  };