/** @type {import('tailwindcss').Config} */
const { hp, wp } = require("./helpers/common");
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#e47907",
        secondary: "#fff1d6",
        dark: "#3e3e3e",
        darkLight: "#e1e1e1",
        gray: "#e3e3e3",
        white: "#fff",
        text: "#494949",
        textLight: "#7c7c7c",
        textDark: "#1d1d1d",
      },
      spacing: {
        "1/2": `${hp(0.5)}px`, // 0.5% chiều cao màn hình
        "1/4": `${hp(1)}px`, // 1% chiều cao màn hình
        "1/3": `${hp(3)}px`, // 3% chiều cao màn hình
        "1/10": `${wp(10)}px`, // 10% chiều rộng màn hình
        "1/5": `${wp(20)}px`, // 20% chiều rộng màn hình
      },
    },
  },
  plugins: [],
};
