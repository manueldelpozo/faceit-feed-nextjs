import Link from 'next/link';
import PostAuthor from '@/components/Post/PostAuthor';
import PostBody from '@/components/Post/PostBody';
import PostTitle from '@/components/Post/PostTitle';
import { POST_BODY_MAX_LENGTH } from '@/consts/text';
import type { TPost } from '@/types/posts';

interface IProps {
    post: TPost;
}

const PostItem = ({ post }: IProps) => {
    const highlightClass = post.isNew ? 'bg-green-900' : '';

    return (
        <Link href={`/posts/${post.id}`} passHref>
            <div className={`border rounded-lg p-4 m-4 shadow-sm cursor-pointer transition-colors duration-500 ${highlightClass}`}>
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
