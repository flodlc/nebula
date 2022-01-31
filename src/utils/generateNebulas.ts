import { parseColor } from "src/utils/parseColor";
import { NebulaAstre } from "src/astres/NebulaAstre";

export const generateNebulas = ({
  ctx,
  nebulas,
  colors,
  intensity,
}: {
  ctx: CanvasRenderingContext2D;
  nebulas: NebulaAstre[];
  colors: string[];
  intensity: number;
}) => {
  if (nebulas.length) {
    return nebulas.map((nebula) => {
      nebula.intensity = intensity * 1.8;
      return nebula;
    });
  }
  return new Array(4).fill(0).flatMap(() => {
    return colors.map(
      (color) =>
        new NebulaAstre({
          ctx,
          width: 6 + Math.random() * 5,
          rgb: parseColor(color),
          intensity: intensity * 1.8,
        })
    );
  });
};
