/**
 * Type utility to create dot notation from nested objects
 */
export type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

export type DotNotation<T> = (
    T extends object ?
    { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNotation<T[K]>>}` }[Exclude<keyof T, symbol>]
    : ''
) extends infer D ? Extract<D, string> : never; 