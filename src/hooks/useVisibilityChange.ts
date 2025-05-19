import { useEffect } from 'react';

/**
 * A hook that handles visibility changes of the document.
 * 
 * @param callback - The function to call when the document becomes visible
 * @param shouldTrigger - A boolean indicating whether the callback should be triggered
 * 
 * @example
 * ```tsx
 * useVisibilityChange(() => {
 *   // Handle visibility change
 * }, canLoadMore);
 * ```
 */
export const useVisibilityChange = (
    callback: () => void,
    shouldTrigger: boolean
) => {
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && shouldTrigger) {
                callback();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [callback, shouldTrigger]);
};
