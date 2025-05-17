import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMockedNewPost } from '@/helpers/getMockedNewPost';
import { selectPosts } from '@/redux/selectors/posts';
import { addNewPost, markPostAsSeen } from '@/redux/slices/postsSlice';
import { useAppDispatch } from './useAppDispatch';
import { useInterval } from './useInterval';

interface UseNewPostSimulateProps {
    interval?: number;
    enabled?: boolean;
    markSeenDelay?: number;
}

export const useNewPostSimulate = ({
    interval = 15_000,
    enabled = true,
    markSeenDelay = 5_000,
}: UseNewPostSimulateProps = {}) => {
    const dispatch = useAppDispatch();
    const posts = useSelector(selectPosts);

    const simulateNewPost = useCallback(() => {
        const newPostMock = getMockedNewPost();
        dispatch(addNewPost(newPostMock));
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
                        dispatch(markPostAsSeen(post.id));
                    }, delay);
                    return () => clearTimeout(timer);
                }
            });
        };

        removeIsNew(markSeenDelay);
    }, [posts, dispatch, markSeenDelay]);
}; 