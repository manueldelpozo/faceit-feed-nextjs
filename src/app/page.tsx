'use client';

import { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import PageTitle from '@/components/Page/PageTitle';
import Alert from '@/components/UI/Alert/Alert';
import PostList from '@/features/posts/PostList';
import { getMockedNewPost } from '@/helpers/getMockedNewPost';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import useInterval from '@/hooks/useInterval';
import { useTranslation } from '@/hooks/useTranslation';
import {
  selectPosts,
  selectLoading,
  // selectPostsWithAuthors,
  selectError,
  selectCurrentPage,
  selectHasMore,
} from '@/redux/selectors/posts';
import { addNewPost } from '@/redux/slices/postsSlice';
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
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

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

  const simulateNewPost = useCallback(() => {
    const newPostMock = getMockedNewPost();

    dispatch(addNewPost(newPostMock));
  }, [dispatch]);

  useInterval(
    simulateNewPost,
    15_000,
    {
      enabled: true,
      onError: (error) => {
        console.error('Failed to simulate new post:', error);
        setShowError(true);
      }
    }
  );

  return (
    <div className="container mx-auto p-4">
      {error && showError && (
        <Alert
          message={error}
          variant={ALERT_VARIANTS.ERROR}
          duration={5_000}
          onClose={() => setShowError(false)}
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
