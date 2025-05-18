import { SIZE_VALUES } from '@/consts/sizes';
import { UnionTypeOfLiterals, GetSizeClasses } from '@/types/utility';

export type TSizeObject = typeof SIZE_VALUES;
export type TSizeKeys = keyof TSizeObject;
export type TSizeKeysStandard = Exclude<TSizeKeys, 'xl' | 'xs'>;
export type TSizeValues = UnionTypeOfLiterals<TSizeObject>;

export type TSizeClass = `h-${number} w-${number}`;
export type TFontClass = `text-${string} font-${string}`;

export type TSizeClasses = GetSizeClasses<TSizeKeys, TSizeClass>;
