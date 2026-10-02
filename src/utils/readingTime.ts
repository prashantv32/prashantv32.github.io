/**
 * Calculates estimated reading time in minutes based on word count.
 * Average reading speed: ~200 words per minute.
 */
export function calculateReadingTime(content: string): string {
  if (!content) return '1 min read';

  // Strip code blocks, HTML tags, and markdown syntax to count prose words
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[#*_~`>-]/g, '') // remove markdown symbols
    .trim();

  const words = cleanContent.split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return `${minutes} min read`;
}
