/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      flex: {
        '1': '1 1 0%',
        '2': '2 2 0%',
      },
      colors: {
        customPink: 'rgba(230, 74, 105, 0.553)',
        hoverRed: 'rgba(220, 20, 60, 0.796)',
        customGray: '#dddddd35',
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

