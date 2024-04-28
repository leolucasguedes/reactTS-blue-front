import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

const tailwindConfig = {
  content: [
    "./src/**/*.tsx",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '10px': '10px',
        '12px': '12px',
        '14px': '14px',
        '16px': '16px',
        '18px': '18px',
        '20px': '20px',
        '22px': '22px',
        '28px': '28px',
      },
      lineHeight: {
        '30px': '30px',
      },
      colors: {
        "custom-gray": "#404040",
        "icon-gray": "#555555",
        "list-gray": "#F8F8F8",
        "custom-blue": "#177DFF",
        "custom-cblue": "#05B4D8",
        "custom-green": "#35CD3A",
        "custom-purple": "#716ACA",
        "white": "#ffffff",
        "custom-gray2": "#575962",
      },
    },
  },

  plugins: [
    forms,
  ],
};

export default tailwindConfig;
