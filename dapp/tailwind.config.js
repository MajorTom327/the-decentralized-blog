/** @type {import('tailwindcss').Config} */

import chroma from "chroma-js";
import { keys, flatten, prop } from "ramda";

const base = "#fbfbf2";

const baseColors = {
  primary: "#570DF8",
  secondary: "#F000B8",
  accent: "#37CDBE",
  neutral: "#3D4451",
  "base-100": "#FFFFFF",
  "base-200": chroma(base).darken(0.2).hex(),
  "base-300": chroma(base).darken(0.3).hex(),
  info: "#3ABFF8",
  success: "#36D399",
  warning: "#FBBD23",
  error: "#F87272",
};

const colors = {
  ...baseColors,
  ...keys(baseColors).reduce((red, key) => {
    const currentColor = prop(key, baseColors);

    const contentColor =
      chroma.contrast(currentColor, prop("neutral", baseColors)) > 2
        ? prop("neutral", baseColors)
        : prop("base-100", baseColors);

    return {
      ...red,
      [`${key}-light`]: chroma(currentColor).brighten(0.5).hex(),
      [`${key}-dark`]: chroma(currentColor).darken(0.5).hex(),

      [`${key}-content`]: contentColor,
    };
  }, {}),
};

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: colors,
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
