import { useRef } from 'react';
import useInfiniteScrolling from '@/hooks/useInfiniteScrolling';
import { useTranslation } from '@/hooks/useTranslation';
import { ALERT_POSITIONS, ALERT_VARIANTS } from '@/types/alert';
import type { TPost } from '@/types/posts';
import Alert from '../Alert/Alert';
import Loader from '../Loader/Loader';

interface IProps {
    posts: TPost[];
    loading?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
}

const PostList = ({
    posts,
    loading = false,
    hasMore = false,
    onLoadMore,
}: IProps) => {
    const { t } = useTranslation();
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useInfiniteScrolling(() => {
        if (!loading && hasMore) {
            onLoadMore?.();
        }
    }, loaderRef);

    if (posts.length === 0 && !loading) {
        return (
            <div className="text-center my-4">
                <p className="text-gray-500">{t('feed.noPosts')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <div key={post.id}>{post.title}</div>
            ))}

            <div ref={loaderRef} className="flex justify-center my-4">
                {loading && (
                    <Loader
                        size="md"
                        color="secondary"
                        content={t('feed.loadingMore')}
                    />
                )}
                {!hasMore && posts.length > 0 && (
                    <Alert
                        message={t('feed.endOfFeed')}
                        variant={ALERT_VARIANTS.INFO}
                        duration={0}
                        position={ALERT_POSITIONS.BOTTOM_CENTER}
                    />
                )}
            </div>
        </div>
    );
};

export default PostList; 