import { describe, expect, it } from '@jest/globals';
import type { TPost } from '@/types/posts';
import { getMockedNewPost } from '../getMockedNewPost';

describe('getMockedNewPost', () => {
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
            expect(post.userId).toBeGreaterThanOrEqual(1);
            expect(post.userId).toBeLessThanOrEqual(10);
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
            expect(post.title).toMatch(/^New Post Title [a-f0-9]{8}$/);
        });

        it('should have correctly formatted author name', () => {
            const post = getMockedNewPost() as TPost & { author: NonNullable<TPost['author']> };
            expect(post.author.name).toMatch(/^New Author [1-9]|10$/);
        });

        it('should have correctly formatted image URL', () => {
            const post = getMockedNewPost() as TPost & { author: NonNullable<TPost['author']> };
            expect(post.author.image).toMatch(/^https:\/\/i\.pravatar\.cc\/[1-9]|10$/);
        });
    });

    describe('uniqueness', () => {
        it('should generate different posts on each call', () => {
            const post1 = getMockedNewPost();
            const post2 = getMockedNewPost();
            expect(post1.id).not.toBe(post2.id);
            expect(post1.title).not.toBe(post2.title);
        });
    });
}); 