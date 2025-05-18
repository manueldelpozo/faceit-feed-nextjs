'use client';

import { useEffect } from 'react';
import Footer from '@/components/Page/Footer';
import Header from '@/components/Page/Header';
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
    <>
      <NewPostNotification />
      <Header>
        <PageTitle title={t('feed.title')} />
      </Header>
      <section className="container mx-auto p-4">
        <PostList />
        <ScrollUpButton />
      </section>
      <Footer />
    </>
  );
};

export default FeedPage;
