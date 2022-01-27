import { AstreDescription } from "src/astres/types";

export const generateStars = ({
  count,
  color,
  rotationSpeed,
}: {
  count: number;
  color: string;
  rotationSpeed: number;
}) => {
  return new Array(count).fill(0).map(
    () =>
      ({
        name: `star_${Math.random()}`,
        type: "star",
        width: 0.1 * Math.random(),
        distance: 120 * Math.pow(Math.random() * Math.random(), 1 / 2),
        rotateSpeed: (rotationSpeed / 20) * 0.03 + Math.random() * 0.03 * 2,
        color: color,
      } as AstreDescription)
  );
};
