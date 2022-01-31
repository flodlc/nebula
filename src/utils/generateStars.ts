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
  let totalStars;
  const missingStars = count - stars.length;
  if (missingStars <= 0) {
    totalStars = stars.slice(0, count);
  } else {
    const newStars = new Array(missingStars).fill(0).map(
      () =>
        new Star({
          ctx,
          width: 0.1 * Math.random(),
          distance: 120 * Math.pow(Math.random() * Math.random(), 1 / 2),
          speed: rotationSpeed * 0.01 + Math.random() * rotationSpeed * 0.01,
          rgb: parseColor(color),
        })
    );
    totalStars = stars.concat(newStars);
  }
  return totalStars.map((star) => {
    star.speed = rotationSpeed * 0.01 + Math.random() * rotationSpeed * 0.01;
    return star;
  });
};
