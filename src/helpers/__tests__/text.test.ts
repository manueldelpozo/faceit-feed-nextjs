import { describe, expect, it } from '@jest/globals';
import { truncateText } from '../text';

describe('truncateText', () => {
    describe('basic functionality', () => {
        it('should return the original text if it is shorter than maxLength', () => {
            const text = 'Hello World';
            const maxLength = 20;
            expect(truncateText(text, maxLength)).toBe(text);
        });

        it('should return the original text if it equals maxLength', () => {
            const text = 'Hello World';
            const maxLength = 11;
            expect(truncateText(text, maxLength)).toBe(text);
        });

        it('should truncate text and add ellipsis if longer than maxLength', () => {
            const text = 'This is a very long text that needs to be truncated';
            const maxLength = 20;
            const expected = 'This is a very long ...';
            expect(truncateText(text, maxLength)).toBe(expected);
        });
    });

    describe('edge cases', () => {
        it('should handle empty string', () => {
            const text = '';
            const maxLength = 10;
            expect(truncateText(text, maxLength)).toBe('');
        });

        it('should handle zero maxLength', () => {
            const text = 'Any text';
            const maxLength = 0;
            expect(truncateText(text, maxLength)).toBe('...');
        });

        it('should handle negative maxLength', () => {
            const text = 'Any text';
            const maxLength = -5;
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
            const expected = 'Hello 👋 W...';
            expect(truncateText(text, maxLength)).toBe(expected);
        });

        it('should handle text with multiple spaces', () => {
            const text = 'Hello    World';
            const maxLength = 10;
            const expected = 'Hello    W...';
            expect(truncateText(text, maxLength)).toBe(expected);
        });

        it('should handle text with newlines', () => {
            const text = 'Hello\nWorld';
            const maxLength = 10;
            const expected = 'Hello\nWorl...';
            expect(truncateText(text, maxLength)).toBe(expected);
        });

        it('should handle text with tabs', () => {
            const text = 'Hello\tWorld';
            const maxLength = 10;
            const expected = 'Hello\tWorl...';
            expect(truncateText(text, maxLength)).toBe(expected);
        });
    });

    describe('unicode handling', () => {
        it('should handle text with unicode characters', () => {
            const text = 'Hello 世界 World';
            const maxLength = 10;
            const expected = 'Hello 世界 W...';
            expect(truncateText(text, maxLength)).toBe(expected);
        });

        it('should handle text with combining characters', () => {
            const text = 'Hello é World';
            const maxLength = 10;
            const expected = 'Hello é W...';
            expect(truncateText(text, maxLength)).toBe(expected);
        });
    });
}); 