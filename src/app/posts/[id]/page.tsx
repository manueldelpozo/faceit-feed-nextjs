'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import BackButton from '@/components/Page/BackButton';
import PostAuthor from '@/components/Post/PostAuthor';
import PostBody from '@/components/Post/PostBody';
import PostTitle from '@/components/Post/PostTitle';
import Alert from '@/components/UI/Alert/Alert';
import Loader from '@/components/UI/Loader/Loader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTranslation } from '@/hooks/useTranslation';
import { selectPostById, selectLoading } from '@/redux/selectors/posts';
import { fetchPostById } from '@/redux/thunks/posts';
import { ALERT_VARIANTS } from '@/types/alert';

const SinglePostPage = () => {
    const params = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const post = useSelector(selectPostById(params.id));
    const loading = useSelector(selectLoading);

    const isFetching = loading && !post;
    const hasError = !loading && !post;

    useEffect(() => {
        if (params.id && !post) {
            dispatch(fetchPostById(params.id));
        }
    }, [dispatch, params.id, post]);

    if (isFetching) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <BackButton />
                </div>
                <div className="max-w-2xl mx-auto flex justify-center items-center min-h-[400px]">
                    <Loader size="lg" />
                </div>
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <BackButton />
                </div>
                <div className="max-w-2xl mx-auto">
                    <Alert
                        message={t('post.notFound')}
                        variant={ALERT_VARIANTS.ERROR}
                        isFloating={false}
                    />
                </div>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <BackButton />
            </div>
            <article className="max-w-2xl mx-auto">
                <PostTitle title={post.title} size="lg" className="mb-4" />
                <PostAuthor
                    name={post.author?.name}
                    imageSrc={post.author?.image}
                    className="mb-6"
                />
                <PostBody body={post.body} />
            </article>
        </div>
    );
};

export default SinglePostPage;
