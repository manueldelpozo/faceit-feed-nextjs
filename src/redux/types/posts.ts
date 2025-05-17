import type { TPost } from '@/types/posts';

export interface PostsState {
    posts: TPost[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    postsPerPage: number;
    hasMore: boolean;
};