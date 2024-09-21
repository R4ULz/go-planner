import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'border-shadow': '3px 3px 5px 3px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage:{
        'bg-home': "url(/components/icons/bgImage)"
      },
      fontFamily:{
        'inter': [ 'Inter', 'sans-serif'],
        'rubik': [ 'Rubik', 'sans-serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        rosinha: "#C70039",
        laranjinha: "#ff5833",
        meugrad: 'linear-gradient(to right, #8f0b3e, #ff5833)', //N sei pq nao esta funcionando.
      },
    },
  },
  plugins: [],
};
export default config;
