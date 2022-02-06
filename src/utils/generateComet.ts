import { Comet } from "../astres/Comet";

export const generateComet = ({
  ctx,
  frequence,
}: {
  ctx: CanvasRenderingContext2D;
  frequence: number;
}) => {
  return new Array(1).fill(0).flatMap(() => {
    return [new Comet({ ctx, frequence })];
  });
};
