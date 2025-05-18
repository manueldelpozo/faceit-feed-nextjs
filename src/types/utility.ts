export type UnionTypeOfLiterals<T> = T[keyof T];

export type TOptionalClassName = Partial<{
    className: string;
}>; 