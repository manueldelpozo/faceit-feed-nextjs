import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '@/types/utility';

interface IProps extends PropsWithClassName {
    title: string;
}

const PageTitle = ({ title, children, className = '' }: PropsWithChildren<IProps>) => {
    return (
        <div className={className}>
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