export function graphemeLength(content: string) {
  if (!content || typeof content !== 'string') {
    return 0;
  }

  return [...content].length;
}