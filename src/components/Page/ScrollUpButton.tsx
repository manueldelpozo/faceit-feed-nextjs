'use client';

import { useState, useEffect } from 'react';
import { ARROW_UP_ICON } from '@/consts/svgIcons';
import { useTranslation } from '@/hooks/useTranslation';
import { scrollToTop } from '@/utils/scrollToTop';

const ScrollUpButton = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 p-2 bg-primary text-white border-2 border-primary rounded-full shadow-lg hover:bg-primary-dark cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            aria-label={t('common.scrollToTop')}
        >
            {ARROW_UP_ICON}
        </button>
    );
};

export default ScrollUpButton; 