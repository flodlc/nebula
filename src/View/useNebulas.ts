import { RefObject, useLayoutEffect } from "react";
import { generateNebulas } from "src/utils/generateNebulas";
import { Nebula } from "src/astres/Nebula";
import { drawAstres } from "src/View/draw";
import { SystemConfig } from "src/types";

export const useNebulas = ({
  canvasSize,
  canvasRef,
  config,
}: {
  canvasSize: { height: number; width: number };
  canvasRef: RefObject<HTMLCanvasElement>;
  config: Required<SystemConfig>;
}) => {
  useLayoutEffect(() => {
    if (!canvasSize.width) return () => undefined;
    const ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d");
    const nebulas = generateNebulas({
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

    return drawAstres({
      astres: nebulas,
      canvas: canvasRef.current as HTMLCanvasElement,
      play: false,
      bgColor: "rgb(8, 8, 8)",
    });
  }, [canvasSize.width, canvasSize.height, config]);
};
