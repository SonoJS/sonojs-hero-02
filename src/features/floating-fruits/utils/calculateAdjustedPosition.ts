/** Nudges a slot offset inwards; percentages by 5 or 10 points, pixels by 50 or 100. */
export function calculateAdjustedPosition(
  position: string,
  isMobile?: boolean
): string {
  const value = parseFloat(position);

  if (position.endsWith("%")) {
    return `${value + (isMobile ? 5 : 10)}%`;
  }

  const unit = position.replace(/[0-9.-]/g, "") || "px";
  return `${value + (isMobile ? 50 : 100)}${unit}`;
}
