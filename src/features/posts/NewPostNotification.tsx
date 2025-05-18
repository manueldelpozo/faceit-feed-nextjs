'use client';

import Alert from '@/components/UI/Alert/Alert';
import { ALERT_VARIANTS } from '@/consts/alert';
import { INTERVALS } from '@/consts/intervals';
import { useNewPostSimulate } from '@/hooks/useNewPostSimulate';
import { useTranslation } from '@/hooks/useTranslation';
import { scrollToTop } from '@/utils/scrollToTop';

const NewPostNotification = () => {
    const { t } = useTranslation();
    const newPost = useNewPostSimulate();

    if (!newPost) return null;

    return (
        <Alert
            message={`${t('feed.newPost')}: ${newPost.title}`}
            variant={ALERT_VARIANTS.SUCCESS}
            duration={INTERVALS.ALERT_DURATION}
            onClick={scrollToTop}
            isFloating
        />
    );
};

export default NewPostNotification; 