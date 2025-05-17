import { createAsyncThunk } from '@reduxjs/toolkit';
import { PRAVATAR_BASE_URL, DUMMYJSON_POSTS_URL } from '@/consts/apiRoutes';
import { en } from '@/locales/en';
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
        const state = getState();
        const limit = state.posts.postsPerPage;
        const skip = page * limit;

        const postsResponse = await fetch(`${DUMMYJSON_POSTS_URL}?limit=${limit}&skip=${skip}`);
        const postsData = await postsResponse.json();

        const postsWithAuthors = postsData.posts.map((post: TPost) => ({
            ...post,
            author: {
                id: post.userId,
                name: en.post.authorNameFormat.replace('{id}', post.userId.toString()),
                image: `${PRAVATAR_BASE_URL}/${post.userId}`,
            },
        }));

        return {
            posts: postsWithAuthors,
            total: postsData.total,
        };
    }
);

export const fetchPostById = createAsyncThunk<TPost, string>(
    'posts/fetchPostById',
    async (id: string) => {
        const response = await fetch(`${DUMMYJSON_POSTS_URL}/${id}`);
        const post = await response.json();

        return {
            ...post,
            author: {
                id: post.userId,
                name: en.post.authorNameFormat.replace('{id}', post.userId.toString()),
                image: `${PRAVATAR_BASE_URL}/${post.userId}`,
            },
        };
    }
);
