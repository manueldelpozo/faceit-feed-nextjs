import { describe, expect, it, beforeEach } from '@jest/globals';
import type { TPost } from '@/types/posts';
import { getMockedNewPost, resetCounter } from '../getMockedNewPost';

describe('getMockedNewPost', () => {
    beforeEach(() => {
        resetCounter();
    });

    describe('post structure', () => {
        it('should return a valid post object', () => {
            const post = getMockedNewPost();
            expect(post).toBeDefined();
            expect(typeof post).toBe('object');
        });

        it('should have all required post properties', () => {
            const post = getMockedNewPost();
            expect(post).toHaveProperty('id');
            expect(post).toHaveProperty('title');
            expect(post).toHaveProperty('body');
            expect(post).toHaveProperty('userId');
            expect(post).toHaveProperty('tags');
            expect(post).toHaveProperty('reactions');
            expect(post).toHaveProperty('author');
        });
    });

    describe('author data', () => {
        it('should have valid author properties', () => {
            const post = getMockedNewPost() as TPost & { author: NonNullable<TPost['author']> };
            expect(post.author).toHaveProperty('id');
            expect(post.author).toHaveProperty('name');
            expect(post.author).toHaveProperty('image');
        });

        it('should have matching author and user IDs', () => {
            const post = getMockedNewPost() as TPost & { author: NonNullable<TPost['author']> };
            expect(post.author.id).toBe(post.userId);
        });
    });

    describe('content validation', () => {
        it('should have correct tag values', () => {
            const post = getMockedNewPost();
            expect(Array.isArray(post.tags)).toBe(true);
            expect(post.tags).toContain('realtime');
            expect(post.tags).toContain('new');
        });

        it('should have valid numeric values', () => {
            const post = getMockedNewPost();
            expect(typeof post.id).toBe('number');
            expect(typeof post.userId).toBe('number');
            expect(typeof post.reactions).toBe('number');
            expect(post.id).toBeGreaterThanOrEqual(500);
        });

        it('should have valid string values', () => {
            const post = getMockedNewPost() as TPost & { author: NonNullable<TPost['author']> };
            expect(typeof post.title).toBe('string');
            expect(typeof post.body).toBe('string');
            expect(typeof post.author.name).toBe('string');
            expect(typeof post.author.image).toBe('string');
        });
    });

    describe('format validation', () => {
        it('should have correctly formatted title', () => {
            const post = getMockedNewPost();
            expect(post.title).toMatch(/^New Post Title \d+$/);
        });

        it('should have correctly formatted author name', () => {
            const post = getMockedNewPost() as TPost & { author: NonNullable<TPost['author']> };
            expect(post.author.name).toMatch(/^New Author \d+$/);
        });

        it('should have correctly formatted image URL', () => {
            const post = getMockedNewPost() as TPost & { author: NonNullable<TPost['author']> };
            expect(post.author.image).toMatch(/^https:\/\/i\.pravatar\.cc\/\d+$/);
        });
    });

    describe('incremental IDs', () => {
        it('should start from 500', () => {
            const post = getMockedNewPost();
            expect(post.id).toBe(500);
        });

        it('should increment IDs sequentially', () => {
            const post1 = getMockedNewPost();
            const post2 = getMockedNewPost();
            const post3 = getMockedNewPost();
            expect(post1.id).toBe(500);
            expect(post2.id).toBe(501);
            expect(post3.id).toBe(502);
        });

        it('should use same ID for all post properties', () => {
            const post = getMockedNewPost() as TPost & { author: NonNullable<TPost['author']> };
            expect(post.id).toBe(500);
            expect(post.userId).toBe(500);
            expect(post.author.id).toBe(500);
        });
    });
}); 