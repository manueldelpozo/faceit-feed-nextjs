'use client';

import Avatar from '@/components/UI/Avatar/Avatar';
import { AVATAR_PLACEHOLDER } from '@/consts/placeholders';
import { useTranslation } from '@/hooks/useTranslation';
import type { TSizeKeys } from '@/types/sizes';

interface IProps {
    name?: string;
    imageSrc?: string;
    size?: TSizeKeys;
    className?: string;
}

const PostAuthor = ({ name, imageSrc, size = 'md', className = '' }: IProps) => {
    const { t } = useTranslation();

    return (
        <div className={`flex items-center ${className}`}>
            <Avatar
                src={imageSrc || AVATAR_PLACEHOLDER}
                alt={`${name}'s avatar`}
                size={size}
                className="mr-3"
            />
            <span className="font-semibold">{name || t('post.unknownAuthor')}</span>
        </div>
    );
};

export default PostAuthor; 