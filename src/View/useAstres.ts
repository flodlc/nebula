import { RefObject, useLayoutEffect, useRef } from "react";
import { SystemConfig } from "src/types";
import { generateStars } from "src/utils/generateStars";
import { Star } from "src/astres/Star";
import { generateComet } from "src/utils/generateComet";
import { Planet } from "src/astres/Planet";
import { Sun } from "src/astres/Sun";
import { drawAstres } from "src/View/draw";
import { generateSolarSytem } from "src/utils/generateSolarSytem";
import { Comet } from "src/astres/Comet";
import { FPS } from "src/config";
import { Drawable } from "src/astres/types";

export const useAstres = ({
  canvasSize,
  canvasRef,
  config,
}: {
  canvasSize: { height: number; width: number };
  canvasRef: RefObject<HTMLCanvasElement>;
  config: Required<SystemConfig>;
}) => {
  const astres = useRef<Record<string, Drawable>>();
  useLayoutEffect(() => {
    if (!canvasSize.width) return () => undefined;
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (!astres.current) {
      astres.current = createAstres({ config, ctx });
    }

    return drawAstres({
      astres: astres.current,
      canvas: canvasRef.current as HTMLCanvasElement,
      play: true,
      fps: FPS,
    });
  }, [canvasSize.width, canvasSize.height, config]);
};

const createAstres = ({
  config,
  ctx,
}: {
  config: Required<SystemConfig>;
  ctx: CanvasRenderingContext2D;
}) => {
  const stars = generateStars({
    rotationSpeed: config.starsRotationSpeed,
    count: config.starsCount,
    color: config.starsColor,
  }).reduce(
    (stars, starConfig) => ({
      ...stars,
      [starConfig.name]: new Star({
        ...(starConfig as any),
        ctx,
      }),
    }),
    {} as Record<string, Drawable>
  );

  const planets = generateSolarSytem({
    scale: config.solarSystemScale,
    distance: config.solarSystemDistance,
    rotationSpeed: config.solarSystemRotationSpeed,
  }).reduce((planets, planetConfig) => {
    const Type = {
      planet: Planet,
      sun: Sun,
    }[planetConfig.type as "sun" | "planet"];
    return {
      ...planets,
      [planetConfig.name]: new Type({
        ctx,
        ...(planetConfig as any),
        origin: planetConfig.origin ? planets[planetConfig.origin] : undefined,
      }),
    };
  }, {} as Record<string, Drawable>);

  const comets = generateComet({ frequence: config.cometFrequence }).reduce(
    (stars, cometConfig) => ({
      ...stars,
      [cometConfig.name]: new Comet({
        ...cometConfig,
        ctx,
      }),
    }),
    {} as Record<string, Drawable>
  );

  return { ...stars, ...comets, ...planets };
};
