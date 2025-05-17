/**
 * Truncates a text string to a specified maximum length and adds an ellipsis if truncated.
 * @param text - The text to truncate
 * @param maxLength - The maximum length of the text before truncation
 * @returns The truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}; 