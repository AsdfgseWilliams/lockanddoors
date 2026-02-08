/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        primary: "#1b1b1b",
        secondary: "#FE7B02",
        accent: "#575ECF",
        background: "#ffffff",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "fade-in-delay": "fadeIn 1s ease-out 0.5s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
