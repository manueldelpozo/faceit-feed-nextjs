import { useEffect, useRef } from 'react';

interface UseIntervalOptions {
    /**
     * Whether the interval should be running
     * @default true
     */
    enabled?: boolean;
    /**
     * Callback to be called when an error occurs
     */
    onError?: (error: Error) => void;
    /**
     * Whether to run the callback immediately before starting the interval
     * @default false
     */
    immediate?: boolean;
}

/**
 * A hook that creates an interval that can be paused and resumed.
 * 
 * @param callback - The function to call on each interval
 * @param delay - The delay in milliseconds between each interval
 * @param options - Additional options for the interval
 * 
 * @example
 * ```tsx
 * // Basic usage
 * useInterval(() => {
 *   console.log('Tick');
 * }, 1000);
 * 
 * // With options
 * useInterval(
 *   async () => {
 *     await fetchData();
 *   },
 *   5000,
 *   {
 *     enabled: isPolling,
 *     immediate: true,
 *     onError: (error) => console.error('Polling failed:', error)
 *   }
 * );
 * ```
 */
export const useInterval = (
    callback: () => void | Promise<void>,
    delay: number | null,
    options: UseIntervalOptions = {
        enabled: true,
        immediate: false,
    }
) => {
    const savedCallback = useRef(callback);
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null || !options.enabled) {
            return;
        }

        const tick = async () => {
            try {
                await savedCallback.current();
            } catch (error) {
                options.onError?.(error instanceof Error ? error : new Error('Unknown error occurred'));
            }
        };

        if (options.immediate) {
            tick();
        }

        intervalId.current = setInterval(tick, delay);

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
        };
    }, [delay, options]);
};
