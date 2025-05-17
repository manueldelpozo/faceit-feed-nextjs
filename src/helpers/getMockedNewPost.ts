import { v4 as uuidv4 } from 'uuid';
import type { TPost } from "@/types/posts";

/**
 * Generates a mock post with unique ID and deterministic user data
 * 
 * @returns {TPost} A new post object with the following properties:
 * - id: Numeric ID derived from UUID
 * - title: "New Post Title" followed by a short version of the UUID
 * - body: A descriptive text with the post's unique ID
 * - userId: Deterministic number between 1 and 1000 based on UUID
 * - tags: ['realtime', 'new']
 * - reactions: 0
 * - author: Object containing:
 *   - id: Same as userId
 *   - name: "New Author" followed by userId
 *   - image: Avatar URL from pravatar.cc
 * 
 * @example
 * const newPost = getMockedNewPost();
 * // Returns a new post with UUID and deterministic user data
 */
export const getMockedNewPost = (): TPost => {
    const uuid = uuidv4();
    const shortId = uuid.slice(0, 8); // Use first 8 characters for display
    const numberId = 1000 + (parseInt(uuid.slice(0, 4), 16) % 9000); // Convert first 4 hex chars to number 1000-9999

    return ({
        id: numberId,
        title: `New Post Title ${shortId}`,
        body: `This is a new post with ID ${shortId}. ` +
            `It should be prepended to the list and highlighted briefly. ` +
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        userId: numberId,
        tags: ['realtime', 'new'],
        reactions: 0,
        author: {
            id: numberId,
            name: `New Author ${numberId}`,
            image: `https://i.pravatar.cc/${numberId}`,
        },
    });
}