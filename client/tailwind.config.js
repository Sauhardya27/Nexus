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
        customDarkBlue: '#11192880',
      },
      borderColor: {
        'custom-gray': '#dddddd35',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  }
}

