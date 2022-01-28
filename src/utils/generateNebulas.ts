import { NubulaDescription } from "src/astres/types";

export const generateNebulas = ({
  intensity,
  colors,
}: {
  intensity: number;
  colors: string[];
}) => {
  return new Array(10).fill(0).flatMap(() => {
    return colors.map(
      (color) =>
        ({
          name: `neb_${Math.random()}`,
          type: "nebula",
          width: 6 + Math.random() * 4,
          intensity: intensity,
          distance:
            10 +
            140 *
              Math.pow(Math.random() * Math.random() * Math.random(), 1 / 3),
          rotateSpeed: Math.random() * 0.6,
          color: color,
        } as NubulaDescription)
    );
  });
};
