'use client';

import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from './redux/store';
import { addNewPost, markPostAsSeen } from './redux/slices/postsSlice';
import { fetchPosts } from './redux/thunks/posts';
import {
  selectPostsWithAuthors,
  selectLoading,
  selectError,
  selectCurrentPage,
  selectHasMore,
} from './redux/selectors/posts';
import PostList from './components/Post/PostList';
import Alert from './components/Alert/Alert';
import PageTitle from './components/Page/PageTitle';
import useInterval from './hooks/useInterval';
import { useTranslation } from './hooks/useTranslation';
import { newPostMock } from './mocks/newPostWithAuthor';
import { ALERT_VARIANTS } from '@/types/alert';

const FeedPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectPostsWithAuthors);
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
