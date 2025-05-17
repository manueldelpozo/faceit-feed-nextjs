import { createSlice } from '@reduxjs/toolkit';
import type { TPost } from '@/types/posts';
import { fetchPosts, fetchPostById } from '../thunks/posts';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
    posts: TPost[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    hasMore: boolean;
    postsPerPage: number;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
    currentPage: 0,
    hasMore: true,
    postsPerPage: 10,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearPosts: (state) => {
            state.posts = [];
            state.currentPage = 0;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<{ posts: TPost[]; total: number }>) => {
                state.loading = false;
                state.posts = [...state.posts, ...action.payload.posts];
                state.currentPage += 1;
                state.hasMore = state.posts.length < action.payload.total;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts';
            })
            .addCase(fetchPostById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<TPost>) => {
                state.loading = false;
                const existingPostIndex = state.posts.findIndex((post) => post.id === action.payload.id);
                if (existingPostIndex >= 0) {
                    state.posts[existingPostIndex] = action.payload;
                } else {
                    state.posts.push(action.payload);
                }
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch post';
            });
    },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer; 