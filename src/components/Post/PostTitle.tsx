import { type TSizeKeys } from '@/types/sizes';

interface IProps {
    title: string;
    size?: TSizeKeys;
    className?: string;
}

const sizeStyles = {
    sm: 'text-lg font-semibold',
    md: 'text-xl font-semibold',
    lg: 'text-2xl font-bold',
};

const PostTitle = ({ title, size = 'md', className = '' }: IProps) => {
    return (
        <h2 className={`${sizeStyles[size]} ${className}`}>
            {title}
        </h2>
    );
};

export default PostTitle; 