const RED = [229, 52, 42];
const BLUE = [30, 79, 163];

export function screenAccent(screenIndex) {
  const t = screenIndex / 9;
  const r = Math.round(RED[0] + (BLUE[0] - RED[0]) * t);
  const g = Math.round(RED[1] + (BLUE[1] - RED[1]) * t);
  const b = Math.round(RED[2] + (BLUE[2] - RED[2]) * t);
  return { rgb: `rgb(${r},${g},${b})`, r, g, b };
}

export function buildDots(currentIndex, total = 10) {
  return Array.from({ length: total }, (_, i) => {
    const t = i / (total - 1);
    const r = Math.round(RED[0] + (BLUE[0] - RED[0]) * t);
    const g = Math.round(RED[1] + (BLUE[1] - RED[1]) * t);
    const b = Math.round(RED[2] + (BLUE[2] - RED[2]) * t);
    const isCurrent = i === currentIndex;
    return {
      color: `rgb(${r},${g},${b})`,
      opacity: isCurrent ? 1 : 0.75,
      glow: isCurrent ? `0 0 12px rgba(${r},${g},${b},0.8)` : 'none',
    };
  });
}
