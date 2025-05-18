import type { TSizeClasses, TSizeObject } from '@/types/sizes';

export const generateSizeClasses = <T extends TSizeObject, C extends TSizeClasses>(factor: number, sizes: T): C => (
    Object.entries(sizes).reduce<C>((acc, [key, value]) => ({
        ...acc,
        [key]: `w-${value / factor} h-${value / factor}`
    }), {} as C)
);
