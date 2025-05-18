import { SIZE_VALUES } from '@/consts/sizes';
import { UnionTypeOfLiterals } from '@/types/utility';

export type TSizeKeys = keyof typeof SIZE_VALUES;
export type TSizeValues = UnionTypeOfLiterals<typeof SIZE_VALUES>; 