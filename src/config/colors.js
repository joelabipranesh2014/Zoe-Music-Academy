/**
 * Application Color Theme Configuration
 * 
 * Centralized color definitions for the entire application.
 * Update these values to change the theme colors across the app.
 * 
 * This file is used by Tailwind CSS configuration.
 * For TypeScript usage, import from colors.ts instead.
 */

export const colors = {
  // Primary Colors
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',  // Main primary color
    700: '#7e22ce',  // Primary hover/dark variant
    800: '#6b21a8',
    900: '#581c87',
  },

  // Secondary Colors
  secondary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',  // Main secondary color (indigo-700)
    800: '#3730a3',
    900: '#312e81',
  },

  // Button Colors
  button: {
    primary: {
      bg: '#9333ea',        // Primary button background
      hover: '#7e22ce',     // Primary button hover
      text: '#ffffff',      // Primary button text
      border: '#9333ea',    // Primary button border
    },
    secondary: {
      bg: '#ffffff',        // Secondary button background
      hover: '#faf5ff',     // Secondary button hover (purple-50)
      text: '#9333ea',      // Secondary button text
      border: '#9333ea',    // Secondary button border
    },
    outline: {
      bg: 'transparent',    // Outline button background
      hover: '#ffffff',     // Outline button hover
      text: '#ffffff',      // Outline button text
      border: '#ffffff',    // Outline button border
      hoverText: '#9333ea', // Outline button hover text
    },
  },
};

