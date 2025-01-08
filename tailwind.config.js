/** @type {import('tailwindcss').Config} */

const { addDynamicIconSelectors } = require('@iconify/tailwind');

export default {
  content: ['./node_modules/flyonui/dist/js/*.js'],
  theme: {
    extend: {},
  },
  plugins: [addDynamicIconSelectors(), require('flyonui'), require('flyonui/plugin')],
  flyonui: {
    themes: ['corporate'],
  },
};
