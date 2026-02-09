import { colors } from './src/config/colors.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors (mapped to purple for backward compatibility)
        purple: colors.primary,
        // Secondary colors (mapped to indigo for backward compatibility)
        indigo: colors.secondary,
        // Direct access to theme colors
        primary: colors.primary,
        secondary: colors.secondary,
        // Button colors
        button: {
          primary: colors.button.primary,
          secondary: colors.button.secondary,
          outline: colors.button.outline,
        },
      },
    },
  },
  plugins: [],
}

