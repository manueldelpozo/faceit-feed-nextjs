import { ALERT_VARIANTS, ALERT_POSITIONS } from '@/types/alert';

export const variantStyles = {
    [ALERT_VARIANTS.ERROR]: 'bg-red-50 text-red-800 border-red-200',
    [ALERT_VARIANTS.SUCCESS]: 'bg-green-50 text-green-800 border-green-200',
    [ALERT_VARIANTS.WARNING]: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    [ALERT_VARIANTS.INFO]: 'bg-blue-50 text-blue-800 border-blue-200',
} as const;

export const positionStyles = {
    [ALERT_POSITIONS.TOP_RIGHT]: 'top-4 right-4',
    [ALERT_POSITIONS.TOP_CENTER]: 'top-4 left-1/2 -translate-x-1/2',
    [ALERT_POSITIONS.TOP_LEFT]: 'top-4 left-4',
    [ALERT_POSITIONS.BOTTOM_RIGHT]: 'bottom-4 right-4',
    [ALERT_POSITIONS.BOTTOM_CENTER]: 'bottom-4 left-1/2 -translate-x-1/2',
    [ALERT_POSITIONS.BOTTOM_LEFT]: 'bottom-4 left-4',
} as const;
