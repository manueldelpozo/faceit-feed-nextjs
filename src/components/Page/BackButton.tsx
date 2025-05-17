import { useRouter } from 'next/navigation';
import { BACK_ARROW_ICON } from '@/consts/svgIcons';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppDispatch } from '@/redux/hooks/useAppDispatch';
import { visitPost } from '@/redux/slices/postsSlice';

interface BackButtonProps {
    className?: string;
}

const BackButton = ({ className = '' }: BackButtonProps) => {
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
            className={`flex items-center gap-2 text-gray-400 hover:text-gray-200 hover:cursor-pointer transition-colors duration-200 ${className}`}
            aria-label={t('common.back')}
        >
            {BACK_ARROW_ICON}
            <span>{t('common.back')}</span>
        </button>
    );
};

export default BackButton; 