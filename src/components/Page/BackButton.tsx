import { useRouter } from 'next/navigation';
import { BACK_ARROW_ICON } from '@/consts/svgIcons';
import { useTranslation } from '@/hooks/useTranslation';

interface BackButtonProps {
    className?: string;
}

const BackButton = ({ className = '' }: BackButtonProps) => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <button
            onClick={() => router.back()}
            className={`flex items-center gap-2 text-gray-400 hover:text-gray-200 hover:cursor-pointer transition-colors duration-200 ${className}`}
            aria-label={t('common.back')}
        >
            {BACK_ARROW_ICON}
            <span>{t('common.back')}</span>
        </button>
    );
};

export default BackButton; 