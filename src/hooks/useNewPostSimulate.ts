import { useCallback, useState, useEffect } from 'react';
import { INTERVALS } from '@/consts/intervals';
import { getMockedNewPost } from '@/helpers/getMockedNewPost';
import { useAppDispatch } from '@/redux/hooks/useAppDispatch';
import { useAppSelector } from '@/redux/hooks/useAppSelector';
import { selectNewestPost } from '@/redux/selectors/posts';
import { addNewPost, markPostAsSeen } from '@/redux/slices/postsSlice';
import type { TPost } from '@/types/posts';
import { useInterval } from './useInterval';

interface UseNewPostSimulateProps {
    interval?: number;
    enabled?: boolean;
    markSeenDelay?: number;
}

export const useNewPostSimulate = ({
    interval = INTERVALS.NEW_POST_SIMULATION,
    enabled = true,
    markSeenDelay = INTERVALS.POST_MARK_SEEN
}: UseNewPostSimulateProps = {}): TPost | null => {
    const dispatch = useAppDispatch();
    const newestPost = useAppSelector(selectNewestPost);
    const [shouldNotifyNewPost, setShouldNotifyNewPost] = useState(false);

    const simulateNewPost = useCallback(() => {
        const newPostMock = getMockedNewPost();

        dispatch(addNewPost(newPostMock));
        setShouldNotifyNewPost(true);
    }, [dispatch]);

    useInterval(
        simulateNewPost,
        interval,
        { enabled }
    );

    useEffect(() => {
        if (!newestPost) return;

        const removeIsNew = (delay: number) => {
            if (newestPost.isNew) {
                const timer = setTimeout(() => {
                    setShouldNotifyNewPost(false);
                    dispatch(markPostAsSeen(newestPost.id));
                }, delay);

                return () => clearTimeout(timer);
            }
        };

        removeIsNew(markSeenDelay);
    }, [newestPost, dispatch, markSeenDelay]);

    if (!shouldNotifyNewPost || !newestPost?.isNew) return null;

    return newestPost;
}; 