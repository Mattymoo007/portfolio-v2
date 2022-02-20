module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      lexend: ["Lexend Zetta", "sans-serif"],
      mulish: ["Mulish", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        light: "#eeeeee",
        black: "#000000",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
}
