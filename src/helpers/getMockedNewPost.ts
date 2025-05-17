import type { TPost } from "@/types/posts";

/**
 * Generates a mock post with random user data and current timestamp
 * 
 * @returns {TPost} A new post object with the following properties:
 * - id: Current timestamp
 * - title: "New Post Title" followed by timestamp
 * - body: A descriptive text with current time and lorem ipsum
 * - userId: Random number between 1 and 100
 * - tags: ['realtime', 'new']
 * - reactions: 0
 * - author: Object containing:
 *   - id: Same as userId
 *   - name: "New Author" followed by userId
 *   - image: Avatar URL from pravatar.cc
 * 
 * @example
 * const newPost = getMockedNewPost();
 * // Returns a new post with current timestamp and random user data
 */
export const getMockedNewPost = (): TPost => {
    const mockedUserId = Math.floor(Math.random() * 100) + 1;
    const timestamp = Date.now();

    return ({
        id: timestamp,
        title: `New Post Title ${timestamp}`,
        body: `This is a new post arriving in real-time at ${new Date().toLocaleTimeString()}. ` +
            `It should be prepended to the list and highlighted briefly. ` +
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        userId: mockedUserId,
        tags: ['realtime', 'new'],
        reactions: 0,
        author: {
            id: mockedUserId,
            name: `New Author ${mockedUserId}`,
            image: `https://i.pravatar.cc/${mockedUserId}`,
        },
    });
}