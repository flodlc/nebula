import { RefObject, useLayoutEffect, useRef } from "react";
import { generateNebulas } from "src/utils/generateNebulas";
import { Nebula } from "src/astres/Nebula";
import { drawAstres } from "src/View/draw";
import { SystemConfig } from "src/types";
import { Drawable } from "src/astres/types";

export const useNebulas = ({
  canvasSize,
  canvasRef,
  config,
}: {
  canvasSize: { height: number; width: number };
  canvasRef: RefObject<HTMLCanvasElement>;
  config: Required<SystemConfig>;
}) => {
  const nebulas = useRef<Record<string, Drawable>>();
  useLayoutEffect(() => {
    if (!canvasSize.width) return () => undefined;
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (!nebulas.current) {
      nebulas.current = createNebulas({ ctx, config });
    }

    return drawAstres({
      astres: nebulas.current,
      canvas: canvasRef.current as HTMLCanvasElement,
      play: false,
      bgColor: "rgb(8, 8, 8)",
    });
  }, [canvasSize.width, canvasSize.height, config]);
};

const createNebulas = ({
  config,
  ctx,
}: {
  config: Required<SystemConfig>;
  ctx: CanvasRenderingContext2D;
}) => {
  return generateNebulas({
    intensity: config.nebulasIntensity,
    colors: config.nebulasColors,
  }).reduce(
    (comets, nebulaConfig) => ({
      ...comets,
      [nebulaConfig.name]: new Nebula({
        ...(nebulaConfig as any),
        ctx,
      }),
    }),
    {} as Record<string, Nebula>
  );
};
