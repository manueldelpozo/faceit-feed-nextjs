import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Post | Faceit Feed',
    description: 'View post details',
};

export default function PostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 