'use client';

import { useRef } from 'react';
import PlaceholderItem, { createPlaceholders } from '@/components/Post/PlaceholderItem';
import Alert from '@/components/UI/Alert/Alert';
import Loader from '@/components/UI/Loader/Loader';
import { ALERT_POSITIONS, ALERT_VARIANTS } from '@/consts/alert';
import useInfiniteScrolling from '@/hooks/useInfiniteScrolling';
import { useTranslation } from '@/hooks/useTranslation';
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
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const isInitializing = posts.length === 0;
    const isEmpty = posts.length === 0 && !loading;

    useInfiniteScrolling(() => {
        if (!loading && hasMore) {
            onLoadMore?.();
        }
    }, loaderRef);

    if (isInitializing) {
        return (
            <div className="space-y-4 max-w-3xl mx-auto">
                {createPlaceholders().map((placeholderId) => (
                    <PlaceholderItem key={placeholderId} />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {posts.map((post) => (
                <PostItem key={`${post.id}_${post.userId}`} post={post} />
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
                {isEmpty && (
                    <Alert
                        variant={ALERT_VARIANTS.WARNING}
                        message={t('feed.noPosts')}
                        isFloating={false}
                        duration={0}
                    />
                )}
            </div>
        </div>
    );
};

export default PostList;
