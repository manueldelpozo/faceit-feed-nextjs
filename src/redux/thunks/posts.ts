import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TPost } from '@/types/posts';
import type { PostsState } from '../types/posts';

interface PostsResponse {
    posts: TPost[];
    total: number;
}

export const fetchPosts = createAsyncThunk<
    PostsResponse,
    number,
    { state: { posts: PostsState } }
>(
    'posts/fetchPosts',
    async (page: number, { getState }) => {
        const state = getState() as { posts: PostsState };
        const limit = state.posts.postsPerPage;
        const skip = page * limit;

        const postsResponse = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
        const postsData = await postsResponse.json();

        const postsWithAuthors = postsData.posts.map((post: TPost) => ({
            ...post,
            author: {
                id: post.userId,
                name: `Author ${post.userId}`,
                image: `https://i.pravatar.cc/${post.userId}`,
            },
        }));

        return {
            posts: postsWithAuthors,
            total: postsData.total,
        };
    }
);
