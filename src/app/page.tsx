'use client';

import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PageTitle from '@/components/Page/PageTitle';
import Alert from '@/components/UI/Alert/Alert';
import PostList from '@/features/posts/PostList';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useNewPostSimulate } from '@/hooks/useNewPostSimulate';
import { useTranslation } from '@/hooks/useTranslation';
import {
  selectPosts,
  selectLoading,
  selectError,
  selectCurrentPage,
  selectHasMore,
} from '@/redux/selectors/posts';
import { fetchPosts } from '@/redux/thunks/posts';
import { ALERT_VARIANTS } from '@/types/alert';

const FeedPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);
  const hasMore = useSelector(selectHasMore);

  useNewPostSimulate();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts(0));
    }
  }, [dispatch, posts.length]);

  const loadMorePosts = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchPosts(currentPage));
    }
  }, [loading, hasMore, currentPage, dispatch]);

  return (
    <div className="container mx-auto p-4">
      {error && (
        <Alert
          message={error}
          variant={ALERT_VARIANTS.ERROR}
          duration={5_000}
        />
      )}

      <PageTitle title={t('feed.title')} />

      <PostList
        posts={posts}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMorePosts}
      />
    </div>
  );
};

export default FeedPage;
