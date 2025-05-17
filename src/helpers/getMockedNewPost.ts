import { PRAVATAR_BASE_URL } from '@/consts/apiRoutes';
import type { TPost } from "@/types/posts";

const INITIAL_MOCKED_POST_ID = 500;

let counter = INITIAL_MOCKED_POST_ID;

export const resetCounter = () => {
    counter = INITIAL_MOCKED_POST_ID;
};

/**
 * Generates a mock post with incremental ID starting from 500
 * 
 * @returns {TPost} A new post object with the following properties:
 * - id: Incremental number starting from 500
 * - title: "New Post Title" followed by the ID
 * - body: A descriptive text with the post's ID
 * - userId: Same as id
 * - tags: ['realtime', 'new']
 * - reactions: 0
 * - author: Object containing:
 *   - id: Same as userId
 *   - name: "New Author" followed by id
 *   - image: Avatar URL from pravatar.cc
 * 
 * @example
 * const newPost = getMockedNewPost();
 * // Returns a new post with incremental ID starting from 500
 */
export const getMockedNewPost = (): TPost => {
    const currentId = counter++;

    return {
        id: currentId,
        title: `New Post Title ${currentId}`,
        body: `This is a new post with ID ${currentId}. ` +
            `It should be prepended to the list and highlighted briefly. ` +
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        userId: currentId,
        tags: ['realtime', 'new'],
        reactions: 0,
        author: {
            id: currentId,
            name: `New Author ${currentId}`,
            image: `${PRAVATAR_BASE_URL}/${currentId}`,
        },
    };
}