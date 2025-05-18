'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertIcon, CloseIcon } from '@/components/Icons';
import { ALERT_POSITIONS, ALERT_VARIANTS } from '@/consts/alert';
import { positionStyles, variantStyles } from '@/consts/alertStyles';
import { type TAlertPosition, type TAlertVariant } from '@/types/alert';

interface IProps {
    message: string;
    variant?: TAlertVariant;
    duration?: number;
    onClick?: () => void;
    onClose?: () => void;
    isFloating?: boolean;
    position?: TAlertPosition;
}

const Alert = ({
    message,
    variant = ALERT_VARIANTS.INFO,
    duration = 5_000,
    onClick,
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

    if (!isVisible && duration > 0) return null;

    const alertContent = (
        <div
            className={`p-4 rounded-lg border ${variantStyles[variant]} shadow-lg cursor-pointer transition-opacity duration-300 ${isFloating ? `fixed z-50 ${positionStyles[position]}` : ''
                }`}
            role="alert"
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <AlertIcon variant={variant} />
                <p className="text-sm font-medium">{message}</p>
                {onClose && (
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            onClose();
                        }}
                        className="ml-auto text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                        <CloseIcon />
                    </button>
                )}
            </div>
        </div>
    );

    return isFloating ? createPortal(alertContent, document.body) : alertContent;
};

export default Alert; 