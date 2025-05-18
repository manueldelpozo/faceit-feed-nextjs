'use client';

import Avatar from '@/components/UI/Avatar/Avatar';
import { AVATAR_PLACEHOLDER } from '@/consts/avatarPlaceholder';
import { useTranslation } from '@/hooks/useTranslation';
import type { TSizeKeys } from '@/types/sizes';
import type { PropsWithClassName } from '@/types/utility';

interface IProps extends PropsWithClassName {
    name?: string;
    imageSrc?: string;
    size?: TSizeKeys;
}

const PostAuthor = ({
    name = '',
    imageSrc = AVATAR_PLACEHOLDER,
    size = 'md',
    className = ''
}: IProps) => {
    const { t } = useTranslation();

    return (
        <div className={`flex items-center ${className}`}>
            <Avatar
                src={imageSrc}
                alt={name ? `${name}'s avatar` : t('post.unknownAuthor')}
                size={size}
                className="mr-3"
            />
            <span className="font-semibold">{name || t('post.unknownAuthor')}</span>
        </div>
    );
};

export default PostAuthor;
