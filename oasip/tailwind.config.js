module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'prompt': 'Prompt , sans-serif',
        'kanit': 'Kanit, sans-serif',
        'Alfa': 'Playfair Display, serif',
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
}