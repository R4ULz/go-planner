import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  plugins: [],
  theme: {
    extend: {
      scrollBehavior: ['responsive'],
      boxShadow:{
        'border-shadow': '3px 3px 5px 3px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage:{
        'hero-pattern': "url(/imgs/hero.png)",
        'hero-login': "url(/imgs/hero-login.png)"
      },
      fontFamily:{
        'inter': [ 'Inter', 'sans-serif'],
        'rubik': [ 'Rubik', 'sans-serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        rosinha: "#C70039",

        roxo: "#3F0098",
        laranja: "#FF5733",
        laranjinha: "#ff5833",
        RosinhaEscurinho: "#c70038",
  
      },
      blur:{
        xs: '1px',
      },
      screens:{
        'max-hd': {'max': '1366px'}
      },
    },
  },
};
export default config;
