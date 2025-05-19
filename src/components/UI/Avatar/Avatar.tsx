import Image, { type ImageProps } from 'next/image';
import { SIZE_VALUES } from '@/consts/sizes';
import { generateSizeClasses } from '@/helpers/size';
import type { TSizeKeys } from '@/types/sizes';

const sizeClasses = generateSizeClasses(4, SIZE_VALUES);

interface IProps extends ImageProps {
    size?: TSizeKeys;
    className?: string;
    priority?: boolean;
}

const Avatar = ({
    src,
    alt,
    size = 'md',
    className = '',
    priority = false
}: IProps) => (
    <Image
        width={SIZE_VALUES[size]}
        height={SIZE_VALUES[size]}
        src={src}
        alt={alt}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={`rounded-full ${sizeClasses[size]} ${className}`}
    />
);

export default Avatar; 