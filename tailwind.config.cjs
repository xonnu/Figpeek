module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,svelte}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: "'Poppins', sans-serif"
      }, 
      colors: {
        primary: '#1B4332',
        secondary: '#D8F3DC',
        'primary-hover': '#0f3223',
        'secondary-hover': '#cce1cf',
      }
    },
  },
  plugins: [],
}