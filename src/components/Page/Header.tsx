'use client';

import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '@/types/utility';

const Header = ({ children, className = '' }: PropsWithChildren<PropsWithClassName>) => {
    return (
        <header className={`sticky top-0 left-0 py-4 w-full z-10 bg-[var(--background)] ${className}`}>
            {children}
        </header>
    );
};

export default Header; 