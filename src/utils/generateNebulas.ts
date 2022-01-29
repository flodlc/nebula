import { parseColor } from "src/utils/parseColor";

export const generateNebulas = ({
  colors,
  intensity,
}: {
  colors: string[];
  intensity: number;
}) => {
  return new Array(10).fill(0).flatMap(() => {
    return colors.map((color) => ({
      name: `neb_${Math.random()}`,
      type: "nebula",
      width: 6 + Math.random() * 5,
      distance:
        10 +
        140 * Math.pow(Math.random() * Math.random() * Math.random(), 1 / 3),
      rotateSpeed: Math.random() * 0.3,
      rgb: parseColor(color),
      intensity,
    }));
  });
};
