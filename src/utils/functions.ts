/**
 * Truncates a string to a specified maximum length, adding ellipsis if needed.
 *
 * @param {string} text - The input text.
 * @param {number} [max=40] - The maximum length. Defaults to 40 characters.
 * @returns {string} - Truncated text with ellipsis if necessary.
 */

export const sliceText = (text: string, max: number = 40) => {
  return text.length > max ? `${text.slice(0, max)}...` : text;
};
