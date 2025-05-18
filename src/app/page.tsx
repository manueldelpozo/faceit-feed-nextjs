'use client';

import { useEffect } from 'react';
import PageTitle from '@/components/Page/PageTitle';
import ScrollUpButton from '@/components/Page/ScrollUpButton';
import Alert from '@/components/UI/Alert/Alert';
import { ALERT_VARIANTS } from '@/consts/alert';
import { INTERVALS } from '@/consts/intervals';
import PostList from '@/features/posts/PostList';
import { useNewPostSimulate } from '@/hooks/useNewPostSimulate';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppDispatch } from '@/redux/hooks/useAppDispatch';
import { fetchPosts } from '@/redux/thunks/posts';
import { scrollToTop } from '@/utils/scrollToTop';

const FeedPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const newPost = useNewPostSimulate();

  useEffect(() => {
    // if (shouldLoadFirst) {
    dispatch(fetchPosts(0));
    // }
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      {newPost && (
        <Alert
          message={`${t('feed.newPost')}: ${newPost.title}`}
          variant={ALERT_VARIANTS.SUCCESS}
          duration={INTERVALS.ALERT_DURATION}
          onClick={scrollToTop}
          isFloating
        />
      )}

      <PageTitle title={t('feed.title')} />

      <PostList />

      <ScrollUpButton />
    </div>
  );
};

export default FeedPage;
