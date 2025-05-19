import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['posts/fetchPosts/fulfilled'],
                ignoredActionPaths: ['payload.timestamp'],
                ignoredPaths: ['posts.items.timestamp'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
