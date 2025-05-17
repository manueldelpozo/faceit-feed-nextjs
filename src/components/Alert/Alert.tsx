import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ALERT_VARIANTS, ALERT_POSITIONS, type TAlertVariant, type TAlertPosition } from '@/types/alert';
import { variantStyles, positionStyles } from '../../consts/alertStyles';
import { variantIcons } from '../../consts/icons';

interface IProps {
    message: string;
    variant?: TAlertVariant;
    duration?: number;
    onClose?: () => void;
    isFloating?: boolean;
    position?: TAlertPosition;
}

const Alert = ({
    message,
    variant = ALERT_VARIANTS.INFO,
    duration = 5_000,
    onClose,
    isFloating = true,
    position = ALERT_POSITIONS.TOP_RIGHT,
}: IProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!isVisible) return null;

    const alertContent = (
        <div
            className={`p-4 rounded-lg border ${variantStyles[variant]} shadow-lg transition-opacity duration-300 ${isFloating ? `fixed z-50 ${positionStyles[position]}` : ''
                }`}
            role="alert"
        >
            <div className="flex items-center gap-2">
                {variantIcons[variant]}
                <p className="text-sm font-medium">{message}</p>
                {onClose && (
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            onClose();
                        }}
                        className="ml-auto text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );

    return isFloating ? createPortal(alertContent, document.body) : alertContent;
};

export default Alert; 