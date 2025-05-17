import { v4 as uuidv4 } from 'uuid';
import type { TPost } from "@/types/posts";

/**
 * Generates a mock post with unique ID and deterministic user data
 * 
 * @returns {TPost} A new post object with the following properties:
 * - id: Numeric ID derived from UUID
 * - title: "New Post Title" followed by a short version of the UUID
 * - body: A descriptive text with the post's unique ID
 * - userId: Deterministic number between 1 and 10 based on UUID
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
    const numericId = parseInt(uuid.replace(/-/g, '').slice(0, 8), 16); // Convert first 8 hex chars to number
    const userId = parseInt(uuid.slice(0, 2), 16) % 10 + 1; // Convert first 2 hex chars to number 1-10

    return ({
        id: numericId,
        title: `New Post Title ${shortId}`,
        body: `This is a new post with ID ${shortId}. ` +
            `It should be prepended to the list and highlighted briefly. ` +
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        userId,
        tags: ['realtime', 'new'],
        reactions: 0,
        author: {
            id: userId,
            name: `New Author ${userId}`,
            image: `https://i.pravatar.cc/${userId}`,
        },
    });
}