/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      width: {
        '70px': '70px',
        '275px': '275px',
      },
      colors: {
        primary: '#1CAF57',
        danger: '#f56c6c',
        gray: '#a3a8ad',
        'gray-text': '#A3A8AD',
        'stone-cs': '#fafaf5',
        'stone-bold-cs': '#f5f5eb',
        'gray-cs': '#eaeae6',
        'green-cs': '#d4f36a',
        'regal-blue': '#243c5a',
      },
    },
  },
  plugins: [require('tailwindcss/nesting')],
};
