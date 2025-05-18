import Image, { type ImageProps } from 'next/image';
import { SIZE_VALUES } from '@/consts/sizes';
import type { TSizeKeys } from '@/types/sizes';

const generateSizeClasses = (factor: number, sizes: typeof SIZE_VALUES) =>
    Object.entries(sizes).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: `w-${value / factor} h-${value / factor}`
    }), {} as Record<TSizeKeys, `w-${number} h-${number}`>);

const sizeClasses = generateSizeClasses(4, SIZE_VALUES);

interface IProps extends ImageProps {
    size?: TSizeKeys;
    className?: string;
}

const Avatar = ({
    src,
    alt,
    size = 'md',
    className = ''
}: IProps) => (
    <Image
        width={SIZE_VALUES[size]}
        height={SIZE_VALUES[size]}
        src={src}
        alt={alt}
        className={`rounded-full ${sizeClasses[size]} ${className}`}
    />
);

export default Avatar; 