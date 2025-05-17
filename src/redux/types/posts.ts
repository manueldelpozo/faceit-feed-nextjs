import type { TPost } from '@/types/posts';

export interface TPostsState {
    posts: TPost[];
    visitedPost: TPost | null;
    loading: boolean;
    error: string | null;
    currentPage: number;
    postsPerPage: number;
    hasMore: boolean;
};