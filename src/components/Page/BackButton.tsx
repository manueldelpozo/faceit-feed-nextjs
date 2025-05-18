'use client';

import { useRouter } from 'next/navigation';
import { BackArrowIcon } from '@/components/Icons';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppDispatch } from '@/redux/hooks/useAppDispatch';
import { visitPost } from '@/redux/slices/postsSlice';
import type { PropsWithClassName } from '@/types/utility';

const BackButton = ({ className = '' }: PropsWithClassName) => {
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const goBack = () => {
        dispatch(visitPost(null));
        router.back();
    }

    return (
        <button
            onClick={goBack}
            className={`flex items-center gap-2 text-gray-400 hover:text-gray-200 cursor-pointer transition-colors duration-200 ${className}`}
            aria-label={t('common.back')}
        >
            <BackArrowIcon />
            <span>{t('common.back')}</span>
        </button>
    );
};

export default BackButton; 