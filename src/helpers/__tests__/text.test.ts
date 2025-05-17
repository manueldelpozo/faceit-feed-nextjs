import { describe, expect, it } from '@jest/globals';
import { truncateText } from '../text';

describe('truncateText', () => {
    describe('basic functionality', () => {
        it('should return the original text if it is shorter than maxLength', () => {
            const text = 'Hello World';
            const maxLength = 20;
            expect(truncateText(text, maxLength)).toBe(text);
        });

        it('should truncate text and add ellipsis if longer than maxLength', () => {
            const text = 'This is a very long text that needs to be truncated';
            const maxLength = 20;
            const expected = 'This is a very long...';
            expect(truncateText(text, maxLength)).toBe(expected);
        });
    });

    describe('edge cases', () => {
        it('should handle empty string', () => {
            const text = '';
            const maxLength = 10;
            expect(truncateText(text, maxLength)).toBe('');
        });

        it('should handle text exactly at maxLength', () => {
            const text = 'Exactly 10 chars';
            const maxLength = 10;
            expect(truncateText(text, maxLength)).toBe(text);
        });

        it('should handle zero maxLength', () => {
            const text = 'Any text';
            const maxLength = 0;
            expect(truncateText(text, maxLength)).toBe('...');
        });
    });

    describe('special cases', () => {
        it('should handle text with special characters', () => {
            const text = 'Hello! @#$%^&*() World';
            const maxLength = 10;
            const expected = 'Hello! @#$...';
            expect(truncateText(text, maxLength)).toBe(expected);
        });

        it('should handle text with emojis', () => {
            const text = 'Hello 👋 World 🌍';
            const maxLength = 10;
            const expected = 'Hello 👋...';
            expect(truncateText(text, maxLength)).toBe(expected);
        });

        it('should handle text with multiple spaces', () => {
            const text = 'Hello    World';
            const maxLength = 10;
            const expected = 'Hello    ...';
            expect(truncateText(text, maxLength)).toBe(expected);
        });
    });
}); 