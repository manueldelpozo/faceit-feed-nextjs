'use client';

import type { PropsWithChildren } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const Footer = ({ children }: PropsWithChildren) => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="fixed mt-16 bottom-0 w-full">
            <div className="bg-gradient-to-t from-background via-background/80 to-transparent h-32 -top-32 pointer-events-none">
                <div className="flex items-end justify-center h-full pt-8 pb-4 text-center text-sm text-foreground/60">
                    <p>© {currentYear} {t('footer.copyright')}</p>
                    {children}
                </div>
            </div>
        </footer>
    );
};

export default Footer; 