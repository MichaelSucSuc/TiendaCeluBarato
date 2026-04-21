/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A66C2',
        secondary: '#00E676',
        accent: '#FF6B00',
        darkbg: '#1E1E1E',
        lightgray: '#E0E0E0',
        textmain: '#333333',
        textsecondary: '#666666',
      },
    },
  },
  plugins: [],
};
