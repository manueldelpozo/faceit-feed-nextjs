import Link from 'next/link';
import Avatar from '@/components/UI/Avatar/Avatar';
import { AVATAR_PLACEHOLDER } from '@/consts/placeholders';
import { HIGHLIGHT_CLASSES } from '@/consts/styles';
import { POST_BODY_MAX_LENGTH } from '@/consts/text';
import { truncateText } from '@/helpers/text';
import { useTranslation } from '@/hooks/useTranslation';
import type { TPost } from '@/types/posts';

interface IProps {
    post: TPost;
}

const PostItem = ({ post }: IProps) => {
    const { t } = useTranslation();
    const highlightClass = post.isNew ? HIGHLIGHT_CLASSES.NEW : HIGHLIGHT_CLASSES.NONE;

    return (
        <Link href={`/posts/${post.id}`} passHref>
            <div className={`border rounded-lg p-4 m-4 shadow-sm cursor-pointer transition-colors duration-500 ${highlightClass}`}>
                <div className="flex items-center mb-2">
                    <Avatar
                        src={post.author?.image || AVATAR_PLACEHOLDER}
                        alt={`${post.author?.name}'s avatar`}
                        size="md"
                        className="mr-3"
                    />
                    <span className="font-semibold">{post.author?.name || t('post.unknownAuthor')}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                <p className="text-gray-500">{truncateText(post.body, POST_BODY_MAX_LENGTH)}</p>
            </div>
        </Link>
    );
};

export default PostItem;
