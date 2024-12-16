/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      flex: {
        '1': '1 1 0%',
        '2': '2 2 0%',
      },
      borderColor: {
        'custom-gray': '#dddddd35',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

