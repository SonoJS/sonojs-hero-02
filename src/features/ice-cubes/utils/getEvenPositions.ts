/** `count` percentages spread evenly from 0 to 95. */
export function getEvenPositions(count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `${i * (95 / (count - 1 || 1))}%`
  );
}
