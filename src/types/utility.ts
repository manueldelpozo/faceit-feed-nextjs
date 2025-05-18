export type UnionTypeOfLiterals<T> = T[keyof T];

export type PropsWithClassName = Partial<{
    className: string;
}>;

export type GetSizeClasses<S extends string, C> = {
    [K in S]?: C;
};
