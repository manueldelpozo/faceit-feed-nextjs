import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import type { Post } from '@/types/posts';

// Base selectors
export const selectPostsState = (state: RootState) => state.posts;

// Derived selectors
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
    (posts) => posts.filter((post: Post) => post.isNew)
);

export const selectSeenPosts = createSelector(
    selectPosts,
    (posts) => posts.filter((post: Post) => !post.isNew)
);

export const selectPostsByAuthor = (authorId: number) => createSelector(
    selectPosts,
    (posts) => posts.filter((post: Post) => post.author?.id === authorId)
);

export const selectPostsByTag = (tag: string) => createSelector(
    selectPosts,
    (posts) => posts.filter((post: Post) => post.tags.includes(tag))
);

// Memoized selectors for performance
export const selectPostsWithAuthors = createSelector(
    selectPosts,
    (posts) => posts.map((post: Post) => ({
        ...post,
        author: post.author || {
            id: post.userId,
            name: `Author ${post.userId}`,
            image: `https://i.pravatar.cc/150?img=${post.userId}`,
        },
    }))
); 