/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    fontFamily: {

      'lato': ["Lato", "sans-serif"],
      'mono': ["Open Sans", "sans-serif"],     
       'robo': ["Roboto", "sans-serif"],
    },
    extend: {},
    screens: {
      
      xs: { min: "400px" },
      sm: { min: "640px" },
      md: { min: "768px" },
      lg: { min: "1024px" },
      xl: { min: "1280px" },
      "2xl": { min: "1536px" },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("tailwindcss/plugin")(({ addVariant }) => {
      addVariant("search-cancel", "&::-webkit-search-cancel-button");
    }),
  ],
};
