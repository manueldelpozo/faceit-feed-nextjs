import Link from 'next/link';
import PostAuthor from '@/components/Post/PostAuthor';
import PostBody from '@/components/Post/PostBody';
import PostTitle from '@/components/Post/PostTitle';
import { POST_BODY_MAX_LENGTH } from '@/consts/text';
import { useAppDispatch } from '@/redux/hooks/useAppDispatch';
import { visitPost } from '@/redux/slices/postsSlice';
import type { TPost } from '@/types/posts';
import type { TOptionalClassName } from '@/types/utility';

interface IProps extends TOptionalClassName {
    post: TPost;
}

const PostItem = ({ post, className = '' }: IProps) => {
    const dispatch = useAppDispatch();
    const highlightClass = post.isNew ? 'bg-green-900' : '';

    const handleClick = () => {
        dispatch(visitPost(post));
    }

    return (
        <Link
            href={`/posts/${post.id}`}
            passHref
            onClick={handleClick}
        >
            <div className={`border rounded-lg p-4 m-4 hover:bg-amber-900 cursor-pointer transition-colors duration-500 ${highlightClass} ${className}`}>
                <PostAuthor
                    name={post.author?.name}
                    imageSrc={post.author?.image}
                    className="mb-2"
                />
                <PostTitle title={post.title} size="sm" className="mb-1" />
                <PostBody body={post.body} maxLength={POST_BODY_MAX_LENGTH} />
            </div>
        </Link>
    );
};

export default PostItem;
