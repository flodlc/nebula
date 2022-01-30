import { parseColor } from "src/utils/parseColor";
import { Star } from "src/astres/Star";

export const generateStars = ({
  stars,
  count,
  color,
  rotationSpeed,
  ctx,
}: {
  stars: Star[];
  count: number;
  color: string;
  rotationSpeed: number;
  ctx: CanvasRenderingContext2D;
}) => {
  const missingStars = count - stars.length;
  if (missingStars <= 0) {
    return stars.slice(0, count);
  }
  const newStars = new Array(missingStars).fill(0).map(
    () =>
      new Star({
        ctx,
        width: 0.1 * Math.random(),
        distance: 120 * Math.pow(Math.random() * Math.random(), 1 / 2),
        rotateSpeed:
          rotationSpeed * 0.01 + Math.random() * rotationSpeed * 0.01,
        rgb: parseColor(color),
      })
  );
  return stars.concat(newStars);
};
