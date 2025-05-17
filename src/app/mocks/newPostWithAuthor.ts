import type { Post } from '@/types/posts';

export const newPostMock: Post = {
    id: Date.now(),
    title: `New Post Title ${Date.now()}`,
    body: `This is a new post arriving in real-time at ${new Date().toLocaleTimeString()}. ` +
        `It should be prepended to the list and highlighted briefly. ` +
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    userId: Math.floor(Math.random() * 10) + 1,
    tags: ['realtime', 'new'],
    reactions: 0,
    author: {
        id: Math.floor(Math.random() * 10) + 1,
        name: `New Author ${Math.floor(Math.random() * 10) + 1}`,
        image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10) + 1}`,
    },
}; 