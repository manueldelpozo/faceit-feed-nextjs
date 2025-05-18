import type { TFontClass, TSizeKeysStandard } from '@/types/sizes';
import type { PropsWithClassName, GetSizeClasses } from '@/types/utility';

interface IProps extends PropsWithClassName {
    title: string;
    size?: TSizeKeysStandard;
}

const sizeStyles = {
    sm: 'text-lg font-semibold',
    md: 'text-xl font-semibold',
    lg: 'text-2xl font-bold',
} satisfies GetSizeClasses<TSizeKeysStandard, TFontClass>;

const PostTitle = ({ title, size = 'md', className = '' }: IProps) => {
    return (
        <h2 className={`${sizeStyles[size]} ${className}`}>
            {title}
        </h2>
    );
};

export default PostTitle;
