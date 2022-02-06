import { parseColor } from "../utils/parseColor";
import { Star } from "../astres/Star";
import { Random } from "../utils/random";

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
          width: Random.between(0.03, 0.1),
          distance: 120 * Math.pow(Math.random() * Math.random(), 1 / 2),
          speed: Random.around(rotationSpeed * 0.015, 0.005),
          rgb: parseColor(color),
        })
    );
    totalStars = stars.concat(newStars);
  }
  return totalStars.map((star) => {
    star.speed = Random.around(rotationSpeed * 0.015, 0.005);
    return star;
  });
};
