import { PLACEHOLDER_VARIANTS } from '@/consts/placeholder';
import { UnionTypeOfLiterals } from '@/types/utility';

export type TPlaceholderVariant = UnionTypeOfLiterals<typeof PLACEHOLDER_VARIANTS>; 