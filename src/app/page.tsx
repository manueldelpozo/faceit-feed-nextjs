'use client';

import { useEffect } from 'react';
import PageTitle from '@/components/Page/PageTitle';
import ScrollUpButton from '@/components/Page/ScrollUpButton';
import NewPostNotification from '@/features/posts/NewPostNotification';
import PostList from '@/features/posts/PostList';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppDispatch } from '@/redux/hooks/useAppDispatch';
import { fetchPosts } from '@/redux/thunks/posts';

const FeedPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts(0));
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <NewPostNotification />

      <PageTitle title={t('feed.title')} />

      <PostList />

      <ScrollUpButton />
    </div>
  );
};

export default FeedPage;
