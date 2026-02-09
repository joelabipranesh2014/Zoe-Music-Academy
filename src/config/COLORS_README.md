# Color Theme Configuration

This directory contains centralized color definitions for the entire application.

## Files

- **`colors.ts`** - TypeScript color definitions (for use in TypeScript/React components)
- **`colors.js`** - JavaScript color definitions (for use in Tailwind CSS config)

## How to Change Colors

To change the application's color theme, edit the color values in **both** `colors.ts` and `colors.js` files:

1. **Primary Color**: Change `primary.600` (main primary) and `primary.700` (hover state)
2. **Secondary Color**: Change `secondary.700` (main secondary)
3. **Button Colors**: Update the `button` object with your desired button colors

### Example: Changing Primary Color

```typescript
// In colors.ts and colors.js
primary: {
  600: '#your-new-color',  // Main primary color
  700: '#your-new-hover-color',  // Hover state
  // ... other shades
}
```

## Usage

### In Tailwind Classes

The colors are automatically available in Tailwind classes:
- `bg-purple-600` → Uses `primary.600`
- `text-purple-600` → Uses `primary.600`
- `bg-indigo-700` → Uses `secondary.700`
- `border-purple-600` → Uses `primary.600`

### In TypeScript/React Components

```typescript
import { primaryColor, buttonPrimaryBg } from '../config/colors';

// Use in inline styles or calculations
const style = { backgroundColor: buttonPrimaryBg };
```

### In CSS

CSS variables are available in `src/index.css`:
- `var(--color-primary)`
- `var(--color-button-primary-bg)`
- etc.

## Important Notes

- **Keep both files in sync**: When updating colors, make sure to update both `colors.ts` and `colors.js`
- **Restart dev server**: After changing colors, restart your development server for Tailwind to pick up the changes
- **Build required**: Run `npm run build` to verify changes work correctly

