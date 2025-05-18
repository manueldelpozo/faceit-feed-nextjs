import { sizeStyles, colorStyles } from '@/consts/loaderStyles';
import type { TSizeKeysStandard } from '@/types/sizes';
import type { PropsWithClassName } from '@/types/utility';

interface IProps extends PropsWithClassName {
    size?: TSizeKeysStandard;
    color?: keyof typeof colorStyles;
    content?: React.ReactNode;
}

const Loader = ({
    size = 'md',
    color = 'primary',
    content,
    className = '',
}: IProps) => (
    <div className={`flex items-center gap-2 ${className}`}>
        <svg
            className={`animate-spin ${sizeStyles[size]} ${colorStyles[color]}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
        {content && (
            <span className={`text-sm ${colorStyles[color]}`}>
                {content}
            </span>
        )}
    </div>
);

export default Loader; 