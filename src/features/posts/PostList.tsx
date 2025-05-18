'use client';

import { useRef } from 'react';
import PlaceholderItem, { createPlaceholders } from '@/components/Post/PlaceholderItem';
import Alert from '@/components/UI/Alert/Alert';
import Loader from '@/components/UI/Loader/Loader';
import { ALERT_POSITIONS, ALERT_VARIANTS } from '@/consts/alert';
import useInfiniteScrolling from '@/hooks/useInfiniteScrolling';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppDispatch } from '@/redux/hooks/useAppDispatch';
import { useAppSelector } from '@/redux/hooks/useAppSelector';
import { selectCurrentPage, selectError, selectHasMore, selectLoading, selectPosts } from '@/redux/selectors/posts';
import { fetchPosts } from '@/redux/thunks/posts';
import PostItem from './PostItem';

const PostList = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const currentPage = useAppSelector(selectCurrentPage);
    const hasMore = useAppSelector(selectHasMore);
    const bottomListRef = useRef<HTMLDivElement | null>(null);

    const isInitializing = posts.length === 0 && !error;
    const isEmpty = posts.length === 0 && !loading;
    const isEnded = !hasMore && posts.length > 0;
    const canLoadMore = !loading && hasMore;

    useInfiniteScrolling(() => {
        const loadMorePosts = () => {
            if (canLoadMore) {
                dispatch(fetchPosts(currentPage));
            }
        };

        if (!loading && hasMore) {
            loadMorePosts();
        }
    }, bottomListRef);

    if (isInitializing) {
        return (
            <div className="space-y-4 max-w-3xl mx-auto">
                {createPlaceholders().map((placeholderId) => (
                    <PlaceholderItem key={placeholderId} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-4 max-w-3xl mx-auto">
                <Alert
                    message={error}
                    variant={ALERT_VARIANTS.ERROR}
                    duration={0}
                    isFloating={false}
                />
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="space-y-4 max-w-3xl mx-auto">
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
        <div className="space-y-4 max-w-3xl mx-auto mb-64 post-list">
            {posts.map((post) => (
                <PostItem
                    key={`${post.id}_${post.userId}`}
                    post={post}
                    className="post-item scroll-animate"
                />
            ))}

            <div ref={bottomListRef} className="flex justify-center my-4">
                {loading && (
                    <Loader
                        size="md"
                        color="secondary"
                        content={t('feed.loadingMore')}
                    />
                )}
                {isEnded && (
                    <Alert
                        message={t('feed.endOfFeed')}
                        position={ALERT_POSITIONS.BOTTOM_CENTER}
                    />
                )}
            </div>
        </div>
    );
};

export default PostList;
