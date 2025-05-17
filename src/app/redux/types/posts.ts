import type { Post } from '@/types/posts';

export interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    postsPerPage: number;
    hasMore: boolean;
};