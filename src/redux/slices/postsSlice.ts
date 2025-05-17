import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { en } from '@/locales/en';
import type { TPost } from '@/types/posts';
import { fetchPostById, fetchPosts } from '../thunks/posts';
import type { PostsState } from '../types/posts';

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
    currentPage: 0,
    postsPerPage: 20,
    hasMore: true,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addNewPost: (state, action: PayloadAction<TPost>) => {
            state.posts.unshift({ ...action.payload, isNew: true });
        },
        markPostAsSeen: (state, action: PayloadAction<number>) => {
            const post = state.posts.find(p => p.id === action.payload);

            if (post) {
                post.isNew = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = [...state.posts, ...action.payload.posts];
                state.currentPage += 1;
                state.hasMore = state.posts.length < action.payload.total;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || en.common.fallbackError;
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
                state.error = action.error.message || en.common.fallbackError;
            });
    },
});

export const { addNewPost, markPostAsSeen } = postsSlice.actions;

export default postsSlice.reducer;
