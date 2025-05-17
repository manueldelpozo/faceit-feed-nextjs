import enTranslations from '@/locales/en.json';
import type { DotNotation } from '@/types/dotNotation';

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