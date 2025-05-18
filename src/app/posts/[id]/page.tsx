'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import BackButton from '@/components/Page/BackButton';
import PlaceholderItem from '@/components/Post/PlaceholderItem';
import PostAuthor from '@/components/Post/PostAuthor';
import PostBody from '@/components/Post/PostBody';
import PostTitle from '@/components/Post/PostTitle';
import Alert from '@/components/UI/Alert/Alert';
import Loader from '@/components/UI/Loader/Loader';
import { ALERT_VARIANTS } from '@/consts/alert';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppDispatch } from '@/redux/hooks/useAppDispatch';
import { useAppSelector } from '@/redux/hooks/useAppSelector';
import { selectPostById, selectLoading, selectVisitedPost, selectError } from '@/redux/selectors/posts';
import { fetchPostById } from '@/redux/thunks/posts';

const SinglePostPage = () => {
    const params = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const postById = useAppSelector(selectPostById(params.id));
    const visitedPost = useAppSelector(selectVisitedPost);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    const post = postById || visitedPost;
    const hasAlreadyPost = !!post;
    const isInitializing = loading || !hasAlreadyPost;

    useEffect(() => {
        if (params.id && !hasAlreadyPost) {
            dispatch(fetchPostById(params.id));
        }
    }, [dispatch, params.id, hasAlreadyPost]);

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <BackButton />
                </div>

                <Alert
                    message={t('post.notFound')}
                    variant={ALERT_VARIANTS.ERROR}
                    position="top-center"
                    duration={0}
                    isFloating={false}
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <BackButton />
            </div>

            {isInitializing && (
                <>
                    <PlaceholderItem variant="detail" />
                    <div className="max-w-2xl mx-auto flex justify-center items-center min-h-[400px]">
                        <Loader size="lg" />
                    </div>
                </>
            )}

            {hasAlreadyPost && (
                <article className="max-w-2xl mx-auto">
                    <PostTitle title={post.title} size="lg" className="mb-4" />
                    <PostAuthor
                        name={post.author?.name}
                        imageSrc={post.author?.image}
                        className="mb-6"
                    />
                    <PostBody body={post.body} />
                </article>
            )}
        </div>
    );
};

export default SinglePostPage;
