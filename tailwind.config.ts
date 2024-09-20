import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        rosinha: "#C70039"
      },
    },
  },
  plugins: [],
};
export default config;
