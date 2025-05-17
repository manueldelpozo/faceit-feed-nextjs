import { useEffect, useRef } from 'react';
import Alert from '@/components/UI/Alert/Alert';
import Loader from '@/components/UI/Loader/Loader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import useInfiniteScrolling from '@/hooks/useInfiniteScrolling';
import { useTranslation } from '@/hooks/useTranslation';
import { markPostAsSeen } from '@/redux/slices/postsSlice';
import { ALERT_POSITIONS, ALERT_VARIANTS } from '@/types/alert';
import type { TPost } from '@/types/posts';
import PostItem from './PostItem';

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
    const dispatch = useAppDispatch();
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useInfiniteScrolling(() => {
        if (!loading && hasMore) {
            onLoadMore?.();
        }
    }, loaderRef);

    useEffect(() => {
        const removeIsNew = (delay: number) => {
            posts.forEach(post => {
                if (post.isNew) {
                    const timer = setTimeout(() => {
                        dispatch(markPostAsSeen(post.id));
                    }, delay);
                    return () => clearTimeout(timer);
                }
            });
        };

        removeIsNew(5_000);
    }, [posts, dispatch]);

    if (posts.length === 0 && !loading) {
        return (
            <div className="text-center my-4">
                <Alert
                    variant={ALERT_VARIANTS.WARNING}
                    message={t('feed.noPosts')}
                    isFloating={false}
                    duration={0}
                />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
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
                        position={ALERT_POSITIONS.BOTTOM_CENTER}
                    />
                )}
            </div>
        </div>
    );
};

export default PostList;
