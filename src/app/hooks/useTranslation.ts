import enTranslations from '@/locales/en.json';

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

type DotNotation<T> = (
    T extends object ?
    { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNotation<T[K]>>}` }[Exclude<keyof T, symbol>]
    : ''
) extends infer D ? Extract<D, string> : never;

type TranslationKeys = DotNotation<typeof enTranslations>;
type TranslationValue = string | { [key: string]: TranslationValue };

export const useTranslation = () => {
    const t = (key: TranslationKeys): string => {
        const keys = key.split('.');
        let value: TranslationValue = enTranslations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key "${key}" not found`);
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return { t };
}; 