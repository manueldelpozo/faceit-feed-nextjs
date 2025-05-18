'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertIcon, CloseIcon } from '@/components/Icons';
import { ALERT_POSITIONS, ALERT_VARIANTS } from '@/consts/alert';
import { positionStyles, variantStyles } from '@/consts/alertStyles';
import { INTERVALS } from '@/consts/intervals';
import { type TAlertPosition, type TAlertVariant } from '@/types/alert';
import type { PropsWithClassName } from '@/types/utility';

interface IProps extends PropsWithClassName {
    message: string;
    variant?: TAlertVariant;
    duration?: number;
    onClick?: () => void;
    onClose?: () => void;
    isFloating?: boolean;
    showClose?: boolean;
    position?: TAlertPosition;
}

const Alert = ({
    message,
    variant = ALERT_VARIANTS.INFO,
    duration = INTERVALS.ALERT_DURATION,
    onClick,
    onClose,
    isFloating = true,
    showClose = false,
    position = ALERT_POSITIONS.TOP_RIGHT,
    className = '',
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

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    }

    if (!isVisible && duration > 0) return null;

    const alertContent = (
        <div
            className={`p-4 rounded-lg border ${variantStyles[variant]} shadow-lg ${onClick ? 'cursor-pointer' : ''} transition-opacity duration-300 ${isFloating ? `fixed z-50 ${positionStyles[position]}` : ''} ${className}`}
            role="alert"
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <AlertIcon variant={variant} />
                <p className="text-sm font-medium">{message}</p>
                {showClose && (
                    <button
                        onClick={handleClose}
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