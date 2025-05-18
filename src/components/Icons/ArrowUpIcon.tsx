import type { PropsWithClassName } from '@/types/utility';

export const ArrowUpIcon = ({ className = "w-6 h-6" }: PropsWithClassName) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
        />
    </svg>
); 