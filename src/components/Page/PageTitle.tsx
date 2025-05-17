import type { PropsWithChildren, ReactNode } from 'react';

interface IProps {
    title: string;
    children?: ReactNode;
    className?: string;
}

const PageTitle = ({ title, children, className = '' }: PropsWithChildren<IProps>) => {
    return (
        <div className="mb-4">
            <h1 className={`text-2xl font-bold ${className}`}>
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