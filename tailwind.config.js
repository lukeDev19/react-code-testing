module.exports = {
  mode: "jit",
  purge: ["./**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: "#e4e8ee",
      gray: "#888888",
      white: "#ffffff",
      black: "#000000",
      darkGray: "#4D5564",
      blue: "#5582C3"
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
