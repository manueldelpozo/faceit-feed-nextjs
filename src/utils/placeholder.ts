import { INITIAL_POSTS_PER_PAGE } from '@/consts/pagination';
import { TPlaceholderVariant } from '@/types/placeholder';

export const createPlaceholders = (count = INITIAL_POSTS_PER_PAGE): Array<number> => {
    return Array.from({ length: count }, (_, index) => index);
};

export const getPlaceholderClasses = (variant: TPlaceholderVariant): { containerClasses: string, titleClasses: string } => {
    const isDetail = variant === 'detail';

    const containerClasses = [
        'rounded-lg',
        'p-4',
        'animate-pulse',
        isDetail ? 'max-w-2xl mx-auto' : 'border m-4'
    ].join(' ');

    const titleClasses = [
        'h-5',
        'bg-gray-700',
        'rounded',
        isDetail ? 'w-4/5 mb-4' : 'w-3/4 mb-1'
    ].join(' ');

    return { containerClasses, titleClasses };
}; 