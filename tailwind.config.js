/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      foreground: 'rgb(var(--foreground-rgb))',
      background: 'rgb(var(--background-rgb))'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': 'rgb(var(--foreground-rgb))',
      },
      fontSize: {
        xxs: ['0.6rem', '1rem']
      }
    },
  },
  plugins: [],
};
