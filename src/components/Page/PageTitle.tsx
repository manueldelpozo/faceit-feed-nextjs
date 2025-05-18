import type { PropsWithChildren, ReactNode } from 'react';

interface IProps {
    title: string;
    children?: ReactNode;
    className?: string;
}

const PageTitle = ({ title, children, className = '' }: PropsWithChildren<IProps>) => {
    return (
        <div className={`sticky top-0 left-0 py-4 w-full z-10 bg-[var(--background)] ${className}`}>
            <h1 className="text-2xl text-center font-bold">
                {title}
            </h1>
            {children && (
                <div className="mt-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export default PageTitle; 