import { createSelector } from '@reduxjs/toolkit';
import type { TPost } from '@/types/posts';
import { RootState } from '../store';

export const selectPostsState = (state: RootState) => state.posts;

export const selectPosts = createSelector(
    selectPostsState,
    (postsState) => postsState.posts
);

export const selectLoading = createSelector(
    selectPostsState,
    (postsState) => postsState.loading
);

export const selectError = createSelector(
    selectPostsState,
    (postsState) => postsState.error
);

export const selectCurrentPage = createSelector(
    selectPostsState,
    (postsState) => postsState.currentPage
);

export const selectHasMore = createSelector(
    selectPostsState,
    (postsState) => postsState.hasMore
);

export const selectPostsPerPage = createSelector(
    selectPostsState,
    (postsState) => postsState.postsPerPage
);

// Complex selectors
export const selectNewPosts = createSelector(
    selectPosts,
    (posts) => posts.filter((post: TPost) => post.isNew)
);

export const selectSeenPosts = createSelector(
    selectPosts,
    (posts) => posts.filter((post: TPost) => !post.isNew)
);

export const selectPostById = (id: string) => createSelector(
    selectPosts,
    (posts) => posts.find(post => post.id === parseInt(id))
);

export const selectPostsByAuthor = (authorId: number) => createSelector(
    selectPosts,
    (posts) => posts.filter((post: TPost) => post.author?.id === authorId)
);

export const selectPostsByTag = (tag: string) => createSelector(
    selectPosts,
    (posts) => posts.filter((post: TPost) => post.tags.includes(tag))
);

// Memoized selectors for performance
export const selectPostsWithAuthors = createSelector(
    selectPosts,
    (posts) => posts.map((post: TPost) => ({
        ...post,
        author: post.author || {
            id: post.userId,
            name: `Author ${post.userId}`,
            image: `https://i.pravatar.cc/${post.userId}`,
        },
    }))
); 