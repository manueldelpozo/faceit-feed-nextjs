export const SIZE_VALUES = {
    sm: 32,
    md: 40,
    lg: 48,
} as const;

export type TSizeKeys = keyof typeof SIZE_VALUES; 