import { createSelector } from '@reduxjs/toolkit';
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

export const selectPostById = (id: string) => createSelector(
    selectPosts,
    (posts) => posts.find(post => post.id === parseInt(id))
);

export const selectVisitedPost = createSelector(
    selectPostsState,
    (postsState) => postsState.visitedPost
);

export const selectPostsPerPage = createSelector(
    selectPostsState,
    (postsState) => postsState.postsPerPage
);
