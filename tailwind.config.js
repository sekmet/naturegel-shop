// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: [
    './src/**/*.js', './src/**/*.jsx',
  ],
  theme: {},
  variants: {},
  // https://github.com/tailwindcss/custom-forms
  plugins: [require('@tailwindcss/ui'), require("@tailwindcss/custom-forms")],
};
