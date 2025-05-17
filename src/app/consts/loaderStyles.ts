/**
 * Size variants for the Loader component.
 * Each size maps to specific Tailwind CSS classes for height and width.
 */
export const sizeStyles = {
    /** Small size: 16x16 pixels */
    sm: 'h-4 w-4',
    /** Medium size: 24x24 pixels */
    md: 'h-6 w-6',
    /** Large size: 32x32 pixels */
    lg: 'h-8 w-8'
} as const;

/**
 * Color variants for the Loader component.
 * Each color maps to specific Tailwind CSS classes for text color.
 */
export const colorStyles = {
    /** Primary color: Blue */
    primary: 'text-blue-600',
    /** Secondary color: Gray */
    secondary: 'text-gray-600',
    /** White color */
    white: 'text-white'
} as const; 