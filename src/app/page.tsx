'use client';

import { useEffect, useCallback } from 'react';
import PageTitle from '@/components/Page/PageTitle';
import ScrollUpButton from '@/components/Page/ScrollUpButton';
import Alert from '@/components/UI/Alert/Alert';
import { INTERVALS } from '@/consts/intervals';
import PostList from '@/features/posts/PostList';
import { useNewPostSimulate } from '@/hooks/useNewPostSimulate';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppDispatch } from '@/redux/hooks/useAppDispatch';
import { useAppSelector } from '@/redux/hooks/useAppSelector';
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
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const currentPage = useAppSelector(selectCurrentPage);
  const hasMore = useAppSelector(selectHasMore);

  const shouldLoadFirst = posts.length === 0 && !error;
  const shouldLoadMore = !loading && hasMore;

  const [shouldNotifyNewPost] = useNewPostSimulate();

  useEffect(() => {
    if (shouldLoadFirst) {
      dispatch(fetchPosts(0));
    }
  }, [dispatch, shouldLoadFirst]);

  const loadMorePosts = useCallback(() => {
    if (shouldLoadMore) {
      dispatch(fetchPosts(currentPage));
    }
  }, [shouldLoadMore, currentPage, dispatch]);

  return (
    <div className="container mx-auto p-4">
      {error && (
        <Alert
          message={error}
          variant={ALERT_VARIANTS.ERROR}
          duration={INTERVALS.ALERT_DURATION}
          isFloating
        />
      )}

      {shouldNotifyNewPost && (
        <Alert
          message={`${t('feed.newPost')}: ${posts[0].title}`}
          variant={ALERT_VARIANTS.SUCCESS}
          duration={INTERVALS.ALERT_DURATION}
          isFloating
        />
      )}

      <PageTitle title={t('feed.title')} />

      <PostList
        posts={posts}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMorePosts}
      />

      <ScrollUpButton />
    </div>
  );
};

export default FeedPage;
