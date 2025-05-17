import { en } from '@/locales/en';

type TranslationValue = string | { [key: string]: TranslationValue };

export const useTranslation = () => {
    const t = (key: string): string => {
        const keys = key.split('.');
        let value: TranslationValue = en;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // Return the key if translation is not found
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return { t };
}; 