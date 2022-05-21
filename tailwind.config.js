module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'className'
  theme: {
    fontFamilt: {
      serif: ['Montserrat'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
