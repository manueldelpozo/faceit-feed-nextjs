import { useEffect, RefObject } from 'react'

/**
 * A hook that implements infinite scrolling using the Intersection Observer API.
 * 
 * @param onIntersect - The function to call when the loader element is intersected
 * @param ref - A ref to the loader element
 * @param options - Configuration options for the Intersection Observer and hook behavior
 * @returns A ref that should be attached to the loader element
 * 
 * @example
 * ```tsx
 * const loaderRef = useInfiniteScrolling(() => {
 *   // Load more items
 * }, { threshold: 0.5 });
 * 
 * return (
 *   <div>
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *     <div ref={loaderRef}>Loading...</div>
 *   </div>
 * );
 * ```
 */
export default function useInfiniteScrolling(
    onIntersect: () => void,
    ref: RefObject<HTMLElement | null>,
    options: IntersectionObserverInit = {
        threshold: 0,
        root: null,
        rootMargin: '0px',
    }
) {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    onIntersect();
                }
            },
            options,
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [ref, onIntersect, options]);
}