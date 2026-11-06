/** Triangle wave in [0, 1] that reverses smoothly at each cycle boundary. */
export function smoothOscillation(time: number, frequency: number): number {
  const t = (time * frequency) % 2;
  return t <= 1 ? t : 2 - t;
}
