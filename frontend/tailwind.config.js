/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Poppins"', "sans-serif"],
      },
      colors: {
        "topbar-black": "#161616",
        "icon-gray": "#374151",
        "title-gray": "1f2937",
        "content-gray": "1f2937",
      },
    },
  },
  plugins: [],
};
