import { NebulaColoration } from "../astres/NebulaColoration";

export const generateNebulaColoration = ({
  ctx,
  coloration,
  intensity,
}: {
  ctx: CanvasRenderingContext2D;
  coloration?: NebulaColoration;
  intensity: number;
}) => {
  if (coloration) {
    coloration.setIntensity(intensity);
    return coloration;
  }
  return new NebulaColoration({
    ctx,
    intensity,
  });
};
