import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_POSTS_PER_PAGE } from '@/consts/pagination';
import { en } from '@/locales/en';
import type { TPost } from '@/types/posts';
import { fetchPostById, fetchPosts } from '../thunks/posts';
import type { TPostsState } from '../types/posts';

const initialState: TPostsState = {
    posts: [],
    visitedPost: null,
    loading: false,
    error: null,
    currentPage: 0,
    postsPerPage: INITIAL_POSTS_PER_PAGE,
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
        visitPost: (state, action: PayloadAction<TPostsState['visitedPost']>) => {
            state.visitedPost = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.visitedPost = null;
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
                state.visitedPost = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || en.common.fallbackError;
            });
    },
});

export const { addNewPost, markPostAsSeen, visitPost } = postsSlice.actions;

export default postsSlice.reducer;
