export const ALERT_VARIANTS = {
    ERROR: 'error',
    SUCCESS: 'success',
    WARNING: 'warning',
    INFO: 'info',
} as const;

export type TAlertVariant = typeof ALERT_VARIANTS[keyof typeof ALERT_VARIANTS];

export const ALERT_POSITIONS = {
    TOP_RIGHT: 'top-right',
    TOP_CENTER: 'top-center',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_CENTER: 'bottom-center',
    BOTTOM_LEFT: 'bottom-left',
} as const;

export type TAlertPosition = typeof ALERT_POSITIONS[keyof typeof ALERT_POSITIONS]; 