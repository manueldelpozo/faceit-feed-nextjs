export const PLACEHOLDER_VARIANTS = {
    LIST: 'list',
    DETAIL: 'detail',
} as const;

export type TPlaceholderVariant = typeof PLACEHOLDER_VARIANTS[keyof typeof PLACEHOLDER_VARIANTS]; 