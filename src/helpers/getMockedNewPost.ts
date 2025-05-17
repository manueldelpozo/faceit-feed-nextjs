import { en } from '@/locales/en';
import type { TPost } from "@/types/posts";

let lastGeneratedId = 1000;

/**
 * Generates a mock post with deterministic user data
 * 
 * @returns {TPost} A new post object with the following properties:
 * - id: Incremental counter starting from 1000
 * - title: "New Post Title" followed by id
 * - body: A descriptive text with post id
 * - userId: Deterministic number between 1 and 10 based on id
 * - tags: ['realtime', 'new']
 * - reactions: 0
 * - author: Object containing:
 *   - id: Same as userId
 *   - name: Author name from translations with userId
 *   - image: Avatar URL from pravatar.cc
 * 
 * @example
 * const newPost = getMockedNewPost();
 * // Returns a new post with incremental id and deterministic user data
 */
export const getMockedNewPost = (): TPost => {
    const id = ++lastGeneratedId;
    const userId = Math.floor(id % 10) + 1;

    return ({
        id,
        title: `New Post Title ${id}`,
        body: `This is a new post with ID ${id}. ` +
            `It should be prepended to the list and highlighted briefly. ` +
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        userId,
        tags: ['realtime', 'new'],
        reactions: 0,
        author: {
            id: userId,
            name: en.post.authorNameFormat.replace('{id}', userId.toString()),
            image: `https://i.pravatar.cc/${userId}`,
        },
    });
}