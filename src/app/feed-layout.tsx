import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Feed | Faceit Feed',
    description: 'Browse the latest posts in your feed',
};

export default function FeedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 