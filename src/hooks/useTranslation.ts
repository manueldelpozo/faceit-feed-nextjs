import { en } from '@/locales/en';

type TranslationValue = string | { [key: string]: TranslationValue };

/**
 * A custom hook that provides translation functionality for the application.
 * It uses a simple dot notation to access nested translation keys.
 * 
 * @returns {Object} An object containing the translation function
 * @returns {Function} t - A function that takes a translation key and returns the translated string
 * 
 * @example
 * const { t } = useTranslation();
 * t('common.welcome') // Returns the translated string for the key 'common.welcome'
 * t('unknown.key') // Returns 'unknown.key' if translation is not found
 */
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