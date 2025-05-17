import { useCallback, useState, useEffect } from 'react';
import { INTERVALS } from '@/consts/intervals';
import { getMockedNewPost } from '@/helpers/getMockedNewPost';
import { useAppDispatch } from '@/redux/hooks/useAppDispatch';
import { useAppSelector } from '@/redux/hooks/useAppSelector';
import { selectPosts } from '@/redux/selectors/posts';
import { addNewPost, markPostAsSeen } from '@/redux/slices/postsSlice';
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
}: UseNewPostSimulateProps = {}) => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const [shouldNotifyNewPost, setShouldNotifyNewPost] = useState(false);

    const simulateNewPost = useCallback(() => {
        const newPostMock = getMockedNewPost();
        dispatch(addNewPost(newPostMock));
        setShouldNotifyNewPost(true);
    }, [dispatch]);

    useInterval(
        simulateNewPost,
        interval,
        {
            enabled,
        }
    );

    useEffect(() => {
        const removeIsNew = (delay: number) => {
            posts.forEach(post => {
                if (post.isNew) {
                    const timer = setTimeout(() => {
                        setShouldNotifyNewPost(false);
                        dispatch(markPostAsSeen(post.id));
                    }, delay);
                    return () => clearTimeout(timer);
                }
            });
        };

        removeIsNew(markSeenDelay);
    }, [posts, dispatch, markSeenDelay]);

    return [shouldNotifyNewPost];
}; 