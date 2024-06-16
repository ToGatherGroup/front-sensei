import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      colors: {
        defaultGray: '#D9D9D9',
        winePattern: '#410606',
        winePatternLight: '#7b1818',
        winePatternDark: '#340505',
        copperMedal: '#B87333',
        inputColor: '#EEEEEE',
      },
      backgroundImage: {
        'bg-default': "url('/background_1920_1080.jpg')",
      },
    }
  },
  plugins: [require('tailwindcss-animated')],
};
  
export default config;