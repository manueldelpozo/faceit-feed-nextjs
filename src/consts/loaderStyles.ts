import type { TSizeClasses } from '@/types/sizes';

/**
 * Size variants for the Loader component.
 * Each size maps to specific Tailwind CSS classes for height and width.
 */
export const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
} satisfies TSizeClasses;

/**
 * Color variants for the Loader component.
 * Each color maps to specific Tailwind CSS classes for text color.
 */
export const colorStyles = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white'
} as const; 