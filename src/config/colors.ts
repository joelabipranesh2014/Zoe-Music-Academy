/**
 * Application Color Theme Configuration
 * 
 * Centralized color definitions for the entire application.
 * Update these values to change the theme colors across the app.
 * 
 * NOTE: Keep colors.js in sync with this file as it's used by Tailwind CSS.
 * When updating colors, update both files to maintain consistency.
 */

export const colors = {
  // Primary Colors - Midnight Blue (#101828)
  primary: {
    50: '#e8eaf0',
    100: '#c5c9d9',
    200: '#9fa5bf',
    300: '#7881a5',
    400: '#5a658f',
    500: '#3c4979',
    600: '#101828',  // Main primary color
    700: '#0d1320',
    800: '#0a0e18',
    900: '#070910',
  },

  // Secondary Colors - Cool Gray (#667085)
  secondary: {
    50: '#f3f4f6',
    100: '#e5e7eb',
    200: '#d1d5db',
    300: '#b8bdc5',
    400: '#9ca3af',
    500: '#808999',
    600: '#667085',  // Main secondary color
    700: '#4d5566',
    800: '#3a404d',
    900: '#272b33',
  },

  // Accent Colors - Electric Purple (#7F56D9) for CTAs and highlights
  accent: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7F56D9',  // Main accent color
    700: '#6d3fc7',
    800: '#5b2fb5',
    900: '#4a1fa3',
  },

  // Background Colors
  background: {
    default: '#FFFFFF',  // Pure White
    white: '#ffffff',
    gray: '#f9fafb',
  },

  // Text Colors
  text: {
    primary: '#1D2939',   // Graphite
    secondary: '#667085',
    muted: '#98a2b3',
    light: '#d0d5dd',
  },

  // Button Colors
  button: {
    primary: {
      bg: '#101828',        // Primary button background (Midnight Blue)
      hover: '#0d1320',     // Primary button hover (darker blue)
      text: '#ffffff',      // Primary button text
      border: '#101828',    // Primary button border
    },
    secondary: {
      bg: '#ffffff',        // Secondary button background
      hover: '#f9fafb',     // Secondary button hover (light gray)
      text: '#101828',      // Secondary button text (midnight blue)
      border: '#667085',    // Secondary button border (cool gray)
    },
    accent: {
      bg: '#7F56D9',        // Accent button background (Electric Purple)
      hover: '#6d3fc7',     // Accent button hover (darker purple)
      text: '#ffffff',      // Accent button text
      border: '#7F56D9',    // Accent button border
    },
    outline: {
      bg: 'transparent',    // Outline button background
      hover: '#ffffff',     // Outline button hover
      text: '#ffffff',      // Outline button text
      border: '#7F56D9',    // Outline button border (purple)
      hoverText: '#101828', // Outline button hover text (midnight blue)
    },
  },
} as const;

// Export individual color values for easy access
export const primaryColor = colors.primary[600];
export const secondaryColor = colors.secondary[600];
export const accentColor = colors.accent[600];
export const backgroundColor = colors.background.default;
export const textColor = colors.text.primary;
export const buttonPrimaryBg = colors.button.primary.bg;
export const buttonPrimaryHover = colors.button.primary.hover;
export const buttonPrimaryText = colors.button.primary.text;
export const buttonPrimaryBorder = colors.button.primary.border;
export const buttonSecondaryBg = colors.button.secondary.bg;
export const buttonSecondaryHover = colors.button.secondary.hover;
export const buttonSecondaryText = colors.button.secondary.text;
export const buttonSecondaryBorder = colors.button.secondary.border;
export const buttonAccentBg = colors.button.accent.bg;
export const buttonAccentHover = colors.button.accent.hover;
export const buttonAccentText = colors.button.accent.text;
export const buttonAccentBorder = colors.button.accent.border;
export const buttonOutlineBg = colors.button.outline.bg;
export const buttonOutlineHover = colors.button.outline.hover;
export const buttonOutlineText = colors.button.outline.text;
export const buttonOutlineBorder = colors.button.outline.border;
export const buttonOutlineHoverText = colors.button.outline.hoverText;
